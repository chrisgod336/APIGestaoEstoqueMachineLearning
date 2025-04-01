import { db } from "../../../app";

class LocalEstoque {
    private id_local_estoque: number;
    private tx_nome: string;
    private tx_pais: string;
    private tx_uf: string;
    private tx_cidade: string;
    private tx_endereco: string;

    constructor(
        id_local_estoque: number,
        tx_nome?: string,
        tx_pais?: string,
        tx_uf?: string,
        tx_cidade?: string,
        tx_endereco?: string
    ) {
        this.id_local_estoque = id_local_estoque;
        this.tx_nome = tx_nome ?? "";
        this.tx_pais = tx_pais ?? "";
        this.tx_uf = tx_uf ?? "";
        this.tx_cidade = tx_cidade ?? "";
        this.tx_endereco = tx_endereco ?? "";
    }

    public getIdLocalEstoque(): number {
        return this.id_local_estoque;
    }

    public getTxNome(): string {
        return this.tx_nome;
    }

    public getTxPais(): string {
        return this.tx_pais;
    }

    public getTxUf(): string {
        return this.tx_uf;
    }

    public getTxCidade(): string {
        return this.tx_cidade;
    }

    public getTxEndereco(): string {
        return this.tx_endereco;
    }

    public static async criarLocalEstoque(tx_nome: string, tx_pais: string, tx_uf: string, tx_cidade: string, tx_endereco: string): Promise<object> {
        try {
            const sql_insert = `
                INSERT INTO tb_local_estoque(tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco)
                VALUES (?, ?, ?, ?, ?)
            `;

            const result = await db.run(sql_insert, [tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco]);

            if (result.lastID) {
                return {
                    result: 'success',
                    message: 'Local de estoque criado com sucesso',
                    data: new LocalEstoque(result.lastID, tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco)
                };
            }
            throw new Error('Falha ao criar local de estoque');
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar criar local de estoque.'
            };
        }
    }

    public static async buscarLocalEstoque(id_local_estoque?: number): Promise<object> {
        try {
            let sql: string;
            let params: any[] = [];

            if (id_local_estoque) {
                sql = `SELECT * FROM tb_local_estoque WHERE id_local_estoque = ?`;
                params = [id_local_estoque];
            } else {
                sql = `SELECT * FROM tb_local_estoque ORDER BY id_local_estoque`;
            }

            const response = await db.all(sql, params);

            return {
                result: 'success',
                message: response.length > 0 
                    ? 'Local(ais) encontrado(s) com sucesso' 
                    : id_local_estoque ? 'Local não encontrado' : 'Nenhum local cadastrado',
                data: response.length > 0 ? response : null
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar buscar local(ais).'
            };
        }
    }

    public async atualizarLocalEstoque(tx_nome: string, tx_pais: string, tx_uf: string, tx_cidade: string, tx_endereco: string): Promise<object> {
        try {
            const sql_update = `
                UPDATE tb_local_estoque
                SET tx_nome = ?,
                    tx_pais = ?,
                    tx_uf = ?,
                    tx_cidade = ?,
                    tx_endereco = ?
                WHERE id_local_estoque = ?
            `;

            const result = await db.run(sql_update, [
                tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco,
                this.id_local_estoque
            ]);

            if (result) {
                this.tx_nome = tx_nome;
                this.tx_pais = tx_pais;
                this.tx_uf = tx_uf;
                this.tx_cidade = tx_cidade;
                this.tx_endereco = tx_endereco;
                
                return {
                    result: 'success',
                    message: 'Local atualizado com sucesso'
                };
            }
            throw new Error('Nenhum local foi atualizado');
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar atualizar local.'
            };
        }
    }

    public async deletarLocalEstoque(): Promise<object> {
        try {
            const result = await db.run(
                'DELETE FROM tb_local_estoque WHERE id_local_estoque = ?', 
                [this.id_local_estoque]
            );

            return {
                result: result ? 'success' : 'error',
                message: result 
                    ? 'Local deletado com sucesso' 
                    : 'Nenhum local foi deletado'
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar deletar local.'
            };
        }
    }

    public static async criarLocaisEstoqueLote(locais_estoque: Array<{
        tx_nome: string, 
        tx_pais: string, 
        tx_uf: string, 
        tx_cidade: string, 
        tx_endereco: string
    }>): Promise<object> {
        try {
            await db.run('BEGIN TRANSACTION');
            
            const results = [];
            for (const local of locais_estoque) {
                const result = await db.run(
                    `INSERT INTO tb_local_estoque(
                        tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco
                    ) VALUES (?, ?, ?, ?, ?)`,
                    [
                        local.tx_nome, local.tx_pais, local.tx_uf,
                        local.tx_cidade, local.tx_endereco
                    ]
                );
                results.push(result.lastID);
            }
            
            await db.run('COMMIT');
            
            return {
                result: 'success',
                message: `${locais_estoque.length} locais criados com sucesso.`,
                data: results
            };
        } catch (error: any) {
            await db.run('ROLLBACK');
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao criar locais em lote.'
            };
        }
    }
}

export default LocalEstoque;