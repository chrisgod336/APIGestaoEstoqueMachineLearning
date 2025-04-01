import { db } from "../../../app"; 

class Fornecedor {
    private id_fornecedor: number;
    private tx_razao_social: string;
    private tx_cpf_cnpj: string;
    private tx_email: string;
    private tx_telefone: string;
    private vr_frete: number;
    private nu_dias_previsao_inicial_entrega: number;
    private nu_dias_previsao_final_entrega: number;
    private tx_pais: string;
    private tx_uf: string;
    private tx_cidade: string;
    private tx_endereco: string;

    constructor(
        id_fornecedor: number,
        tx_razao_social?: string,
        tx_cpf_cnpj?: string,
        tx_email?: string,
        tx_telefone?: string,
        vr_frete?: number,
        nu_dias_previsao_inicial_entrega?: number,
        nu_dias_previsao_final_entrega?: number,
        tx_pais?: string,
        tx_uf?: string,
        tx_cidade?: string,
        tx_endereco?: string
    ) {
        this.id_fornecedor = id_fornecedor;
        this.tx_razao_social = tx_razao_social ?? "";
        this.tx_cpf_cnpj = tx_cpf_cnpj ?? "";
        this.tx_email = tx_email ?? "";
        this.tx_telefone = tx_telefone ?? "";
        this.vr_frete = vr_frete ?? 0;
        this.nu_dias_previsao_inicial_entrega = nu_dias_previsao_inicial_entrega ?? 0;
        this.nu_dias_previsao_final_entrega = nu_dias_previsao_final_entrega ?? 0;
        this.tx_pais = tx_pais ?? "";
        this.tx_uf = tx_uf ?? "";
        this.tx_cidade = tx_cidade ?? "";
        this.tx_endereco = tx_endereco ?? "";
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

    public getNuDiasPrevisaoInicialEntrega(): number {
        return this.nu_dias_previsao_inicial_entrega;
    }

    public getNuDiasPrevisaoFinalEntrega(): number {
        return this.nu_dias_previsao_final_entrega;
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

    public static async criarFornecedor(
        tx_razao_social: string, 
        tx_cpf_cnpj: string, 
        tx_email: string, 
        tx_telefone: string, 
        vr_frete: number, 
        nu_dias_previsao_inicial_entrega: number, 
        nu_dias_previsao_final_entrega: number, 
        tx_pais: string, 
        tx_uf: string, 
        tx_cidade: string, 
        tx_endereco: string
    ): Promise<object> {
        try {
            const sql_insert = `
                INSERT INTO tb_fornecedor(
                    tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, 
                    vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, 
                    tx_pais, tx_uf, tx_cidade, tx_endereco
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const result = await db.run(sql_insert, [
                tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, 
                vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, 
                tx_pais, tx_uf, tx_cidade, tx_endereco
            ]);

            if (result.lastID) {
                return {
                    result: 'success',
                    message: 'Fornecedor criado com sucesso',
                    data: new Fornecedor(
                        result.lastID, 
                        tx_razao_social, 
                        tx_cpf_cnpj, 
                        tx_email, 
                        tx_telefone, 
                        vr_frete, 
                        nu_dias_previsao_inicial_entrega, 
                        nu_dias_previsao_final_entrega, 
                        tx_pais, 
                        tx_uf, 
                        tx_cidade, 
                        tx_endereco
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
        vr_frete: number, 
        nu_dias_previsao_inicial_entrega: number, 
        nu_dias_previsao_final_entrega: number, 
        tx_pais: string, 
        tx_uf: string, 
        tx_cidade: string, 
        tx_endereco: string
    ): Promise<object> {
        try {
            const sql_update = `
                UPDATE tb_fornecedor
                SET tx_razao_social = ?,
                    tx_cpf_cnpj = ?,
                    tx_email = ?,
                    tx_telefone = ?,
                    vr_frete = ?,
                    nu_dias_previsao_inicial_entrega = ?,
                    nu_dias_previsao_final_entrega = ?,
                    tx_pais = ?,
                    tx_uf = ?,
                    tx_cidade = ?,
                    tx_endereco = ?
                WHERE id_fornecedor = ?
            `;

            const result = await db.run(sql_update, [
                tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, 
                vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, 
                tx_pais, tx_uf, tx_cidade, tx_endereco, 
                this.id_fornecedor
            ]);

            if (result) {
                Object.assign(this, {
                    tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, 
                    vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, 
                    tx_pais, tx_uf, tx_cidade, tx_endereco
                });
                
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

    public static async criarFornecedoresLote(fornecedores: Array<{ 
        tx_razao_social: string, 
        tx_cpf_cnpj: string, 
        tx_email: string, 
        tx_telefone: string, 
        vr_frete: number, 
        nu_dias_previsao_inicial_entrega: number, 
        nu_dias_previsao_final_entrega: number, 
        tx_pais: string, 
        tx_uf: string, 
        tx_cidade: string, 
        tx_endereco: string 
    }>): Promise<object> {
        try {
            // Inicia uma transação para melhor performance
            await db.run('BEGIN TRANSACTION');
            
            const results = [];
            for (const fornecedor of fornecedores) {
                const result = await db.run(
                    `INSERT INTO tb_fornecedor(
                        tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, 
                        vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, 
                        tx_pais, tx_uf, tx_cidade, tx_endereco
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        fornecedor.tx_razao_social, fornecedor.tx_cpf_cnpj, fornecedor.tx_email, fornecedor.tx_telefone,
                        fornecedor.vr_frete, fornecedor.nu_dias_previsao_inicial_entrega, fornecedor.nu_dias_previsao_final_entrega,
                        fornecedor.tx_pais, fornecedor.tx_uf, fornecedor.tx_cidade, fornecedor.tx_endereco
                    ]
                );
                results.push(result.lastID);
            }
            
            await db.run('COMMIT');
            
            return {
                result: 'success',
                message: `${fornecedores.length} fornecedores criados com sucesso.`,
                data: results
            };
        } catch (error: any) {
            await db.run('ROLLBACK');
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao criar fornecedores em lote.'
            };
        }
    }
}

export default Fornecedor;