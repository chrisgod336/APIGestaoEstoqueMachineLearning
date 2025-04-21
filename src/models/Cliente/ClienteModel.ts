import { db } from "../../../app";

class Cliente {
    private id_cliente: number;
    private tx_nome: string;
    private tx_cpf_cnpj: string;
    private tx_email: string;
    private tx_telefone: string;

    constructor(
        id_cliente: number,
        tx_nome?: string,
        tx_cpf_cnpj?: string,
        tx_email?: string,
        tx_telefone?: string
    ) {
        this.id_cliente = id_cliente;
        this.tx_nome = tx_nome ?? "";
        this.tx_cpf_cnpj = tx_cpf_cnpj ?? "";
        this.tx_email = tx_email ?? "";
        this.tx_telefone = tx_telefone ?? "";
    }

    public getIdCliente(): number {
        return this.id_cliente;
    }

    public getTxNome(): string {
        return this.tx_nome;
    }

    public getTxCpfCnpj(): string {
        return this.tx_cpf_cnpj;
    }

    public getTxEmail(): string {
        return this.tx_email;
    }

    public getTxTelefone(): string {
        return this.tx_telefone;
    }

    public static async criarCliente(
        tx_nome: string, 
        tx_cpf_cnpj: string, 
        tx_email: string, 
        tx_telefone: string
    ): Promise<object> {
        try {
            const sql_insert = `
                INSERT INTO tb_cliente(tx_nome, tx_cpf_cnpj, tx_email, tx_telefone)
                VALUES (?, ?, ?, ?)
            `;

            const result = await db.run(sql_insert, [
                tx_nome, tx_cpf_cnpj, tx_email, tx_telefone
            ]);

            if (result.lastID) {
                return {
                    result: 'success',
                    message: 'Cliente criado com sucesso',
                    data: new Cliente(
                        result.lastID, 
                        tx_nome, 
                        tx_cpf_cnpj, 
                        tx_email, 
                        tx_telefone
                    )
                };
            }
            throw new Error('Falha ao criar cliente');
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar criar cliente.'
            };
        }
    }

    public static async buscarCliente(id_cliente?: number): Promise<object> {
        try {
            let sql: string;
            let params: any[] = [];

            if (id_cliente) {
                sql = `SELECT * FROM tb_cliente WHERE id_cliente = ?`;
                params = [id_cliente];
            } else {
                sql = `SELECT * FROM tb_cliente ORDER BY id_cliente`;
            }

            const response = await db.all(sql, params);

            return {
                result: 'success',
                message: response.length > 0 
                    ? 'Cliente(s) encontrado(s) com sucesso' 
                    : id_cliente ? 'Cliente não encontrado' : 'Nenhum cliente cadastrado',
                data: response.length > 0 ? response : null
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar buscar cliente(s).'
            };
        }
    }

    public async atualizarCliente(
        tx_nome: string, 
        tx_cpf_cnpj: string, 
        tx_email: string, 
        tx_telefone: string
    ): Promise<object> {
        try {
            const sql_update = `
                UPDATE tb_cliente
                SET tx_nome = ?,
                    tx_cpf_cnpj = ?,
                    tx_email = ?,
                    tx_telefone = ?
                WHERE id_cliente = ?
            `;

            const result = await db.run(sql_update, [
                tx_nome, tx_cpf_cnpj, tx_email, tx_telefone, 
                this.id_cliente
            ]);

            if (result) {
                this.tx_nome = tx_nome;
                this.tx_cpf_cnpj = tx_cpf_cnpj;
                this.tx_email = tx_email;
                this.tx_telefone = tx_telefone;
                
                return {
                    result: 'success',
                    message: 'Cliente atualizado com sucesso'
                };
            }
            throw new Error('Nenhum cliente foi atualizado');
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar atualizar cliente.'
            };
        }
    }

    public async deletarCliente(): Promise<object> {
        try {
            const result = await db.run(
                'DELETE FROM tb_cliente WHERE id_cliente = ?', 
                [this.id_cliente]
            );

            return {
                result: result? 'success' : 'error',
                message: result 
                    ? 'Cliente deletado com sucesso' 
                    : 'Nenhum cliente foi deletado'
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar deletar cliente.'
            };
        }
    }
}

export default Cliente;