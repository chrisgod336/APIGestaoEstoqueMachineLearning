import { db } from "../../../app";

class Estoque {
    private id_estoque: number;
    private id_produto: number;
    private nu_quantidade: number;

    constructor(
        id_estoque: number,
        id_produto?: number,
        nu_quantidade?: number
    ) {
        this.id_estoque = id_estoque;
        this.id_produto = id_produto??0;
        this.nu_quantidade = nu_quantidade ?? 0;
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

    public static async criarEstoque(id_produto:number, nu_quantidade:number): Promise<object> {
        try {
            const sql_insert = `
                INSERT INTO tb_estoque(id_produto, nu_quantidade)
                VALUES (?, ?)
            `;

            const result = await db.run(sql_insert, [id_produto, nu_quantidade]);

            if (result.lastID) {
                return {
                    result: 'success',
                    message: 'Estoque criado com sucesso',
                    data: new Estoque(result.lastID, id_produto, nu_quantidade)
                };
            }
            throw new Error('Falha ao criar estoque');
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar criar estoque.'
            };
        }
    }

    public static async buscarEstoque(id_estoque?: number): Promise<object> {
        try {
            let sql: string;
            let params: any[] = [];

            if (id_estoque) {
                sql = `SELECT * FROM tb_estoque WHERE id_estoque = ?`;
                params.push(id_estoque);
            } else {
                sql = `SELECT tb_estoque.*, tb_produto.id_produto||' - '||tb_produto.tx_nome AS produto 
                       FROM tb_estoque
                       INNER JOIN tb_produto 
                       ON tb_estoque.id_produto = tb_produto.id_produto
                       ORDER BY id_estoque`;
            }

            const response = await db.all(sql, params);

            return {
                result: 'success',
                message: response.length > 0 
                    ? 'Estoque(s) encontrado(s) com sucesso' 
                    : id_estoque ? 'Estoque não encontrado' : 'Nenhum estoque cadastrado',
                data: response.length > 0 ? response : null
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar buscar estoque(s).'
            };
        }
    }

    public async atualizarEstoque(id_produto:number, nu_quantidade:number): Promise<object> {
        try {
            const sql_update = `
                UPDATE tb_estoque
                SET id_produto = ?,
                    nu_quantidade = ?
                WHERE id_estoque = ?
            `;

            const result = await db.run(sql_update, [id_produto, nu_quantidade, this.id_estoque]);

            if (result) {
                this.id_produto = id_produto;
                this.nu_quantidade = nu_quantidade;
                
                return {
                    result: 'success',
                    message: 'Estoque atualizado com sucesso'
                };
            }
            throw new Error('Nenhum estoque foi atualizado');
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar atualizar estoque.'
            };
        }
    }

    public async deletarEstoque(): Promise<object> {
        try {
            const result = await db.run(
                'DELETE FROM tb_estoque WHERE id_estoque = ?', 
                [this.id_estoque]
            );

            return {
                result: result ? 'success' : 'error',
                message: result 
                    ? 'Estoque deletado com sucesso' 
                    : 'Nenhum estoque foi deletado'
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar deletar estoque.'
            };
        }
    }

    public static async countProduto(id_produto: number): Promise<object> {
        try {
            let sql: string;
            let params: any[] = [id_produto];

            sql = `SELECT COUNT(*) AS count FROM tb_estoque WHERE id_produto = ?`;

            const response = await db.all(sql, params);

            return {
                result: 'success',
                message: response.length > 0 
                    ? 'Produto encontrado com sucesso' 
                    : 'Produto não encontrado',
                data: response||0
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar buscar produtos(s).'
            };
        }
    }

}

export default Estoque;