import { db } from "../../../app"; 

class Fornecedor {
    private id_fornecedor: number;
    private tx_razao_social: string;
    private tx_cpf_cnpj: string;
    private tx_email: string;
    private tx_telefone: string;
    private vr_frete: number;
    constructor(
        id_fornecedor: number,
        tx_razao_social?: string,
        tx_cpf_cnpj?: string,
        tx_email?: string,
        tx_telefone?: string,
        vr_frete?: number,
    ) {
        this.id_fornecedor = id_fornecedor;
        this.tx_razao_social = tx_razao_social ?? "";
        this.tx_cpf_cnpj = tx_cpf_cnpj ?? "";
        this.tx_email = tx_email ?? "";
        this.tx_telefone = tx_telefone ?? "";
        this.vr_frete = vr_frete ?? 0;
    }
    public getIdFornecedor(): number {
        return this.id_fornecedor;
    }

    public getTxRazaoSocial(): string {
        return this.tx_razao_social;
    }

    public getTxCnpjCpf(): string {
        return this.tx_cpf_cnpj;
    }

    public getTxEmail(): string {
        return this.tx_email;
    }

    public getTxTelefone(): string {
        return this.tx_telefone;
    }

    public getVrFrete(): number {
        return this.vr_frete;
    }

    public static async criarFornecedor(
        tx_razao_social: string, 
        tx_cpf_cnpj: string, 
        tx_email: string, 
        tx_telefone: string
    ): Promise<object> {
        try {
            const sql_insert = `
                INSERT INTO tb_fornecedor(
                    tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone
                ) VALUES (?, ?, ?, ?)
            `;

            const result = await db.run(sql_insert, [tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone]);

            if (result.lastID) {
                return {
                    result: 'success',
                    message: 'Fornecedor criado com sucesso',
                    data: new Fornecedor(
                        result.lastID, 
                        tx_razao_social, 
                        tx_cpf_cnpj, 
                        tx_email, 
                        tx_telefone
                    )
                };
            }
            throw new Error('Falha ao criar fornecedor');
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar criar fornecedor.'
            };
        }
    }

    public static async buscarFornecedor(id_fornecedor?: number): Promise<object> {
        try {
            let sql: string;
            let params: any[] = [];

            if (id_fornecedor) {
                sql = `SELECT * FROM tb_fornecedor WHERE id_fornecedor = ?`;
                params = [id_fornecedor];
            } else {
                sql = `SELECT * FROM tb_fornecedor ORDER BY id_fornecedor`;
            }

            const response = await db.all(sql, params);

            return {
                result: 'success',
                message: response.length > 0 
                    ? 'Fornecedor(es) encontrado(s) com sucesso' 
                    : id_fornecedor ? 'Fornecedor não encontrado' : 'Nenhum fornecedor cadastrado',
                data: response.length > 0 ? response : null
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar buscar fornecedor(es).'
            };
        }
    }

    public async atualizarFornecedor(
        tx_razao_social: string, 
        tx_cpf_cnpj: string, 
        tx_email: string, 
        tx_telefone: string, 
    ): Promise<object> {
        try {
            const sql_update = `
                UPDATE tb_fornecedor
                SET tx_razao_social = ?,
                    tx_cpf_cnpj = ?,
                    tx_email = ?,
                    tx_telefone = ?
                WHERE id_fornecedor = ?
            `;

            const result = await db.run(sql_update, [tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, this.id_fornecedor]);

            if (result) {
                Object.assign(this, {tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone});
                
                return {
                    result: 'success',
                    message: 'Fornecedor atualizado com sucesso'
                };
            }
            throw new Error('Nenhum fornecedor foi atualizado');
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar atualizar fornecedor.'
            };
        }
    }

    public async deletarFornecedor(): Promise<object> {
        try {
            const result = await db.run(
                'DELETE FROM tb_fornecedor WHERE id_fornecedor = ?', 
                [this.id_fornecedor]
            );

            return {
                result: result ? 'success' : 'error',
                message: result 
                    ? 'Fornecedor deletado com sucesso' 
                    : 'Nenhum fornecedor foi deletado'
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar deletar fornecedor.'
            };
        }
    }
    
}

export default Fornecedor;