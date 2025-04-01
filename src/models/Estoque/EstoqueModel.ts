import { db } from "../../../app";

class Estoque {
    private id_estoque: number;
    private id_local_estoque: number;
    private id_produto: number;
    private nu_quantidade: number;
    private nu_quantidade_minima: number;
    private nu_quantidade_maxima: number;
    private lo_reposicao_automatica: boolean;

    constructor(
        id_estoque: number,
        id_local_estoque?: number,
        id_produto?: number,
        nu_quantidade?: number,
        nu_quantidade_minima?: number,
        nu_quantidade_maxima?: number,
        lo_reposicao_automatica?: boolean
    ) {
        this.id_estoque = id_estoque;
        this.id_local_estoque = id_local_estoque??0;
        this.id_produto = id_produto??0;
        this.nu_quantidade = nu_quantidade ?? 0;
        this.nu_quantidade_minima = nu_quantidade_minima ?? 0;
        this.nu_quantidade_maxima = nu_quantidade_maxima ?? 0;
        this.lo_reposicao_automatica = lo_reposicao_automatica ?? false;
    }

    public getIdEstoque(): number {
        return this.id_estoque;
    }

    public getIdLocalEstoque(): number {
        return this.id_local_estoque;
    }

    public getIdProduto(): number {
        return this.id_produto;
    }

    public getNuQuantidade(): number {
        return this.nu_quantidade;
    }

    public getNuQuantidadeMinima(): number {
        return this.nu_quantidade_minima;
    }

    public getNuQuantidadeMaxima(): number {
        return this.nu_quantidade_maxima;
    }

    public getLoReposicaoAutomatica(): boolean {
        return this.lo_reposicao_automatica;
    }

    public static async criarEstoque(id_local_estoque:number, id_produto:number, nu_quantidade:number, nu_quantidade_minima:number, nu_quantidade_maxima:number, lo_reposicao_automatica:boolean): Promise<object> {
        try {
            const sql_insert = `
                INSERT INTO tb_estoque(id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            const result = await db.run(sql_insert, [id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica]);

            if (result.lastID) {
                return {
                    result: 'success',
                    message: 'Estoque criado com sucesso',
                    data: new Estoque(result.lastID, id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica)
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

    public static async buscarEstoque(id_local_estoque: number, id_estoque?: number): Promise<object> {
        try {
            let sql: string;
            let params: any[] = [id_local_estoque];

            if (id_estoque) {
                sql = `SELECT * FROM tb_estoque WHERE id_local_estoque = ? AND id_estoque = ?`;
                params.push(id_estoque);
            } else {
                sql = `SELECT * FROM tb_estoque WHERE id_local_estoque = ? ORDER BY id_estoque`;
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

    public async atualizarEstoque(id_local_estoque:number, id_produto:number, nu_quantidade:number, nu_quantidade_minima:number, nu_quantidade_maxima:number, lo_reposicao_automatica:boolean): Promise<object> {
        try {
            const sql_update = `
                UPDATE tb_estoque
                SET id_local_estoque = ?,
                    id_produto = ?,
                    nu_quantidade = ?,
                    nu_quantidade_minima = ?,
                    nu_quantidade_maxima = ?,
                    lo_reposicao_automatica = ?
                WHERE id_estoque = ?
            `;

            const result = await db.run(sql_update, [
                id_local_estoque, id_produto, nu_quantidade, 
                nu_quantidade_minima, nu_quantidade_maxima, 
                lo_reposicao_automatica, this.id_estoque
            ]);

            if (result) {
                this.id_local_estoque = id_local_estoque;
                this.id_produto = id_produto;
                this.nu_quantidade = nu_quantidade;
                this.nu_quantidade_minima = nu_quantidade_minima;
                this.nu_quantidade_maxima = nu_quantidade_maxima;
                this.lo_reposicao_automatica = lo_reposicao_automatica;
                
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

    public static async atualizarEstoquesLote(estoques: Array<{id_local_estoque:number, id_produto:number, nu_quantidade:number, nu_quantidade_minima:number, nu_quantidade_maxima:number, lo_reposicao_automatica:boolean}>): Promise<object> {
        try {
            await db.run('BEGIN TRANSACTION');
            
            const results = [];
            for (const estoque of estoques) {
                const response_search = await db.all(
                    'SELECT id_estoque FROM tb_estoque WHERE id_local_estoque = ? AND id_produto = ?',
                    [estoque.id_local_estoque, estoque.id_produto]
                );

                let result;
                if (response_search.length > 0 && response_search[0]?.id_estoque > 0) {
                    const stq = new Estoque(response_search[0].id_estoque);
                    result = await stq.atualizarEstoque(
                        estoque.id_local_estoque,
                        estoque.id_produto,
                        estoque.nu_quantidade,
                        estoque.nu_quantidade_minima,
                        estoque.nu_quantidade_maxima,
                        estoque.lo_reposicao_automatica
                    );
                } else {
                    result = await Estoque.criarEstoque(
                        estoque.id_local_estoque,
                        estoque.id_produto,
                        estoque.nu_quantidade,
                        estoque.nu_quantidade_minima,
                        estoque.nu_quantidade_maxima,
                        estoque.lo_reposicao_automatica
                    );
                }
                results.push(result);
            }
            
            await db.run('COMMIT');
            
            return {
                result: 'success',
                message: `${estoques.length} estoques atualizados com sucesso.`,
                data: results
            };
        } catch (error: any) {
            await db.run('ROLLBACK');
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao atualizar estoque em lote.'
            };
        }
    }

    public static async movimentarEstoque(id_local_estoque_ori:number, id_local_estoque_dest:number, id_produto:number, nu_quantidade_mov:number): Promise<object> {
        try {
            await db.run('BEGIN TRANSACTION');

            const res = await db.all(
                `SELECT id_estoque, id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica 
                FROM tb_estoque WHERE id_local_estoque = ? AND id_produto = ?`,
                [id_local_estoque_ori, id_produto]
            );

            if(res.length == 0 || res[0]?.id_estoque <= 0){
                throw new Error('Estoque de origem não encontrado.');
            }

            const EstoqueOri = new Estoque(res[0].id_estoque);
            const res1 = await EstoqueOri.atualizarEstoque(
                res[0].id_local_estoque,
                res[0].id_produto,
                (res[0].nu_quantidade - nu_quantidade_mov),
                res[0].nu_quantidade_minima,
                res[0].nu_quantidade_maxima,
                res[0].lo_reposicao_automatica
            );

            if(!res1){
                throw new Error('Erro ao atualizar estoque de origem.');
            }

            const res2 = await db.all(
                `SELECT id_estoque, id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica
                FROM tb_estoque WHERE id_local_estoque = ? AND id_produto = ?`,
                [id_local_estoque_dest, id_produto]
            );

            if(res2.length > 0 && res2[0].id_estoque > 0){
                const estoqueDest = new Estoque(res2[0].id_estoque);
                const res3 = await estoqueDest.atualizarEstoque(
                    res2[0].id_local_estoque,
                    res2[0].id_produto,
                    (res2[0].nu_quantidade + nu_quantidade_mov),
                    res2[0].nu_quantidade_minima,
                    res2[0].nu_quantidade_maxima,
                    res2[0].lo_reposicao_automatica
                );

                if(!res3){
                    throw new Error('Erro ao tentar ralizar operação');
                }
            } else {
                const res3 = await Estoque.criarEstoque(
                    id_local_estoque_dest,
                    id_produto,
                    nu_quantidade_mov,
                    0,
                    0,
                    true
                );

                if(!res3){
                    throw new Error('Erro ao tentar ralizar operação');
                }
            }

            await db.run('COMMIT');
            return {
                result: 'success',
                message: `Estoque movimentado com sucesso.`,
            };
        } catch (error: any) {
            await db.run('ROLLBACK');
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao movimentar estoque.'
            };
        }
    }
}

export default Estoque;