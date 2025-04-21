import { db } from "../../../app";

class VendaProduto {
    private id_venda_produto: number;
    private id_venda: number;
    private id_estoque: number;
    private id_produto: number;
    private nu_quantidade: number;
    private vr_total: number;

    constructor(
        id_venda_produto: number,
        id_venda: number,
        id_estoque: number,
        id_produto: number,
        nu_quantidade?: number,
        vr_total?: number
    ) {
        this.id_venda_produto = id_venda_produto;
        this.id_venda = id_venda;
        this.id_estoque = id_estoque;
        this.id_produto = id_produto;
        this.nu_quantidade = nu_quantidade ?? 0;
        this.vr_total = vr_total ?? 0;
    }

    public getIdVendaProduto(): number {
        return this.id_venda_produto;
    }

    public getIdVenda(): number {
        return this.id_venda;
    }

    public getIdEstoque(): number {
        return this.id_estoque;
    }

    public getIdProduto(): number {
        return this.id_produto;
    }

    public getNuQuantidade(): number {
        return this.nu_quantidade;
    }

    public getVrTotal(): number {
        return this.vr_total;
    }

    public static async recalcularVenda(id_venda: number): Promise<object> {
        try {
            const sql_sum = `SELECT COALESCE(SUM(vr_total),0) AS sum FROM tb_venda_produto WHERE id_venda = ?`;
            const response = await db.get(sql_sum, [id_venda]);

            const sum = response?.sum ?? 0;

            await db.run(
                'UPDATE tb_venda SET vr_venda = ? WHERE id_venda = ?',
                [sum, id_venda]
            );

            return {
                result: 'success',
                message: 'Valor da venda recalculado com sucesso.'
            };
        } catch(error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar recalcular o valor da venda.'
            };
        }
    }

    public static async calculaValorTotal(id_produto: number, nu_quantidade: number): Promise<object> {
        try {
            const response = await db.get(
                'SELECT vr_preco_venda FROM tb_produto WHERE id_produto = ?',
                [id_produto]
            );

            if (!response) {
                return {
                    result: 'error',
                    message: 'Produto não encontrado'
                };
            }

            const vr_preco_venda = response.vr_preco_venda;
            const total = vr_preco_venda * nu_quantidade;

            return {
                result: 'success',
                message: 'Valor total calculado com sucesso.',
                data: total
            };
        } catch(error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar calcular o valor total do item.'
            };
        }
    }

    public static async criarVendaProduto(
        id_venda: number,
        id_estoque: number,
        id_produto: number,
        nu_quantidade: number
    ): Promise<object> {
        try {
            const calcula_vr_total:any = await this.calculaValorTotal(id_produto, nu_quantidade);

            if (!calcula_vr_total) {
                return calcula_vr_total;
            }

            const vr_total = calcula_vr_total?.data;

            const result = await db.run(
                `INSERT INTO tb_venda_produto(
                    id_venda, id_estoque, 
                    id_produto, nu_quantidade, vr_total
                ) VALUES (?, ?, ?, ?, ?)`,
                [id_venda, id_estoque, id_produto, nu_quantidade, vr_total]
            );

            if (result.lastID) {
                const recalcular = await this.recalcularVenda(id_venda);
                if (recalcular) {
                    return recalcular;
                }

                return {
                    result: 'success',
                    message: 'Item adicionado a venda com sucesso',
                    data: new VendaProduto(
                        result.lastID,
                        id_venda,
                        id_estoque,
                        id_produto,
                        nu_quantidade,
                        vr_total
                    )
                };
            }
            throw new Error('Falha ao adicionar item à venda');
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar adicionar item a venda.'
            };
        }
    }

    public static async buscarVendaProduto(id_venda: number, id_venda_produto?: number): Promise<object> {
        try {
            let sql: string;
            let params: any[];

            if (id_venda_produto) {
                sql = `SELECT * FROM tb_venda_produto WHERE id_venda = ? AND id_venda_produto = ?`;
                params = [id_venda, id_venda_produto];
            } else {
                sql = `SELECT * FROM tb_venda_produto WHERE id_venda = ? ORDER BY id_venda_produto`;
                params = [id_venda];
            }

            const response = await db.all(sql, params);

            return {
                result: 'success',
                message: response.length > 0
                    ? 'Item(ns) da venda encontrado(s) com sucesso'
                    : id_venda_produto ? 'Item não encontrado' : 'Nenhum item encontrado',
                data: response.length > 0 ? response : null
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar buscar item(ns) da venda.'
            };
        }
    }

    public async atualizarVendaProduto(
        id_estoque: number,
        id_produto: number,
        nu_quantidade: number
    ): Promise<object> {
        try {
            const calcula_vr_total:any = await VendaProduto.calculaValorTotal(id_produto, nu_quantidade);
            if (!calcula_vr_total) {
                return calcula_vr_total;
            }

            const vr_total = calcula_vr_total?.data;

            const result = await db.run(
                `UPDATE tb_venda_produto
                SET id_estoque = ?,
                    id_produto = ?,
                    nu_quantidade = ?,
                    vr_total = ?
                WHERE id_venda = ?
                AND id_venda_produto = ?`,
                [id_estoque, id_produto, nu_quantidade, vr_total, this.id_venda, this.id_venda_produto]
            );

            if (result) {
                this.id_estoque = id_estoque;
                this.id_produto = id_produto;
                this.nu_quantidade = nu_quantidade;
                this.vr_total = vr_total;

                const recalcular = await VendaProduto.recalcularVenda(this.id_venda);
                if (recalcular) {
                    return recalcular;
                }

                return {
                    result: 'success',
                    message: 'Item da venda atualizado com sucesso'
                };
            }
            throw new Error('Nenhum item foi atualizado');
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar atualizar item da venda.'
            };
        }
    }

    public async deletarVendaProduto(): Promise<object> {
        try {
            const result = await db.run(
                'DELETE FROM tb_venda_produto WHERE id_venda = ? AND id_venda_produto = ?',
                [this.id_venda, this.id_venda_produto]
            );

            if (result) {
                const recalcular = await VendaProduto.recalcularVenda(this.id_venda);
                if (recalcular) {
                    return recalcular;
                }

                return {
                    result: 'success',
                    message: 'Item da venda deletado com sucesso'
                };
            }
            throw new Error('Nenhum item foi deletado');
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar deletar item da venda.'
            };
        }
    }
}

export default VendaProduto;