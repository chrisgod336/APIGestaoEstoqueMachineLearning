import { db } from "../../../app";

class CompraProduto {
    private id_compra_produto: number;
    private id_compra: number;
    private id_local_estoque: number;
    private id_estoque: number;
    private id_produto: number;
    private nu_quantidade: number;
    private vr_total: number;

    constructor(
        id_compra_produto: number,
        id_compra: number,
        id_local_estoque: number,
        id_estoque: number,
        id_produto: number,
        nu_quantidade?: number,
        vr_total?: number
    ) {
        this.id_compra_produto = id_compra_produto;
        this.id_compra = id_compra;
        this.id_local_estoque = id_local_estoque;
        this.id_estoque = id_estoque;
        this.id_produto = id_produto;
        this.nu_quantidade = nu_quantidade ?? 0;
        this.vr_total = vr_total ?? 0;
    }

    public getIdCompraProduto(): number {
        return this.id_compra_produto;
    }

    public getIdCompra(): number {
        return this.id_compra;
    }

    public getIdProduto(): number {
        return this.id_produto;
    }

    public getIdLocalEstoque(): number {
        return this.id_local_estoque;
    }

    public getIdEstoque(): number {
        return this.id_estoque;
    }

    public getNuQuantidade(): number {
        return this.nu_quantidade;
    }

    public getVrTotal(): number {
        return this.vr_total;
    }

    public static async recalcularCompra(id_compra: number): Promise<object> {
        try {
            const response = await db.get(
                'SELECT COALESCE(SUM(vr_total), 0) AS sum FROM tb_compra_produto WHERE id_compra = ?',
                [id_compra]
            );

            const sum = response?.sum ?? 0;

            await db.run(
                'UPDATE tb_compra SET vr_compra = (? - vr_frete), vr_compra = ? WHERE id_compra = ?',
                [sum, sum, id_compra]
            );

            return {
                result: 'success',
                message: 'Valor da compra recalculado com sucesso.'
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao recalcular valor da compra.'
            };
        }
    }

    public static async calculaValorTotal(id_produto: number, nu_quantidade: number): Promise<object> {
        try {
            const response = await db.get(
                'SELECT vr_preco_compra FROM tb_produto WHERE id_produto = ?',
                [id_produto]
            );

            if (!response) {
                return {
                    result: 'error',
                    message: 'Produto não encontrado'
                };
            }

            const vr_preco_compra = response.vr_preco_compra;
            const total = vr_preco_compra * nu_quantidade;

            return {
                result: 'success',
                message: 'Valor total calculado com sucesso.',
                data: total
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao calcular valor total do item.'
            };
        }
    }

    public static async criarCompraProduto(
        id_compra: number,
        id_local_estoque: number,
        id_estoque: number,
        id_produto: number,
        nu_quantidade: number
    ): Promise<object> {
        try {
            const calcula_vr_total:any = await this.calculaValorTotal(id_produto, nu_quantidade);
            if (!calcula_vr_total) {
                return calcula_vr_total;
            }

            const vr_total = calcula_vr_total.data;

            const result = await db.run(
                `INSERT INTO tb_compra_produto(
                    id_compra, id_local_estoque, id_estoque, id_produto, nu_quantidade, vr_total
                ) VALUES (?, ?, ?, ?, ?, ?)`,
                [id_compra, id_local_estoque, id_estoque, id_produto, nu_quantidade, vr_total]
            );

            if (result.lastID) {
                const recalcular:any = await this.recalcularCompra(id_compra);
                if (recalcular.result !== 'success') {
                    return recalcular;
                }

                return {
                    result: 'success',
                    message: 'Item adicionado à compra com sucesso',
                    data: new CompraProduto(
                        result.lastID,
                        id_compra,
                        id_local_estoque,
                        id_estoque,
                        id_produto,
                        nu_quantidade,
                        vr_total
                    )
                };
            }
            throw new Error('Falha ao adicionar item à compra');
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao adicionar item à compra.'
            };
        }
    }

    public static async buscarCompraProduto(id_compra: number, id_compra_produto?: number): Promise<object> {
        try {
            let sql: string;
            let params: any[];

            if (id_compra_produto) {
                sql = `SELECT * FROM tb_compra_produto WHERE id_compra = ? AND id_compra_produto = ?`;
                params = [id_compra, id_compra_produto];
            } else {
                sql = `SELECT * FROM tb_compra_produto WHERE id_compra = ? ORDER BY id_compra_produto`;
                params = [id_compra];
            }

            const response = await db.all(sql, params);

            return {
                result: 'success',
                message: response.length > 0
                    ? 'Item(ns) da compra encontrado(s) com sucesso'
                    : id_compra_produto ? 'Item não encontrado' : 'Nenhum item encontrado',
                data: response.length > 0 ? response : null
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao buscar item(ns) da compra.'
            };
        }
    }

    public async atualizarCompraProduto(
        id_local_estoque:number,
        id_estoque: number,
        id_produto: number,
        nu_quantidade: number
    ): Promise<object> {
        try {
            const calcula_vr_total:any = await CompraProduto.calculaValorTotal(id_produto, nu_quantidade);
            if (calcula_vr_total.result === 'error') {
                return calcula_vr_total;
            }

            const vr_total = calcula_vr_total.data;

            const result:any = await db.run(
                `UPDATE tb_compra_produto
                SET id_local_estoque = ?,
                    id_estoque = ?,
                    id_produto = ?,
                    nu_quantidade = ?,
                    vr_total = ?
                WHERE id_compra = ?
                AND id_compra_produto = ?`,
                [id_local_estoque, id_estoque, id_produto, nu_quantidade, vr_total, this.id_compra, this.id_compra_produto]
            );

            if (result.changes > 0) {
                this.id_local_estoque = id_local_estoque;
                this.id_estoque = id_estoque;
                this.id_produto = id_produto;
                this.nu_quantidade = nu_quantidade;
                this.vr_total = vr_total;

                const recalcular:any = await CompraProduto.recalcularCompra(this.id_compra);
                if (recalcular.result !== 'success') {
                    return recalcular;
                }

                return {
                    result: 'success',
                    message: 'Item da compra atualizado com sucesso'
                };
            }
            throw new Error('Nenhum item foi atualizado');
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao atualizar item da compra.'
            };
        }
    }

    public async deletarCompraProduto(): Promise<object> {
        try {
            const result:any = await db.run(
                'DELETE FROM tb_compra_produto WHERE id_compra = ? AND id_compra_produto = ?',
                [this.id_compra, this.id_compra_produto]
            );

            if (result.changes > 0) {
                const recalcular:any = await CompraProduto.recalcularCompra(this.id_compra);
                if (recalcular.result !== 'success') {
                    return recalcular;
                }

                return {
                    result: 'success',
                    message: 'Item da compra deletado com sucesso'
                };
            }
            throw new Error('Nenhum item foi deletado');
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao deletar item da compra.'
            };
        }
    }
}

export default CompraProduto;