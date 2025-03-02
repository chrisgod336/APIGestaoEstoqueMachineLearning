import { query } from "../../services/db";

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

    public static async criarFornecedor(tx_razao_social: string, tx_cpf_cnpj: string, tx_email: string, tx_telefone:string, vr_frete:number, nu_dias_previsao_inicial_entrega:number, nu_dias_previsao_final_entrega: number, tx_pais:string, tx_uf:string, tx_cidade:string, tx_endereco:string): Promise<object> {
        try {
            const sql_insert = `
                INSERT INTO tb_fornecedor(tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, tx_pais, tx_uf, tx_cidade, tx_endereco)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id_fornecedor
            `;

            const response:any = await query(sql_insert, [tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, tx_pais, tx_uf, tx_cidade, tx_endereco]);

            if (response?.length > 0) {

                return {
                    result: 'success',
                    message: 'Fornecedor criado com sucesso',
                    data: new Fornecedor(response[0].id_fornecedor, tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, tx_pais, tx_uf, tx_cidade, tx_endereco)
                };
            } else {
                throw new Error('Erro ao tentar inserir fornecedor');
            }
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar criar fornecedor.'
            };
        }
    }

    public static async buscarFornecedor(id_fornecedor?: number): Promise<object> {
        try {
            const sql_search = id_fornecedor
                ? `SELECT * FROM tb_fornecedor WHERE id_fornecedor = $1`
                : `SELECT * FROM tb_fornecedor ORDER BY id_fornecedor`;
            const response:any = await query(sql_search, id_fornecedor ? [id_fornecedor] : []);

            if(response?.length > 0){
                return {
                    result: 'success',
                    message: 'Fornecedor(es) encontrado(s) com sucesso',
                    data: response
                };
            }else{
                throw new Error('Erro ao tentar buscar fornecedor(es).');
            }
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar buscar fornecedor(es).'
            };
        }
    }

    public async atualizarFornecedor(tx_razao_social: string, tx_cpf_cnpj: string, tx_email: string, tx_telefone:string, vr_frete:number, nu_dias_previsao_inicial_entrega:number, nu_dias_previsao_final_entrega: number, tx_pais:string, tx_uf:string, tx_cidade:string, tx_endereco:string): Promise<object> {
        try {
            const sql_update = `
                UPDATE tb_fornecedor
                    SET tx_razao_social = $1,
                        tx_cpf_cnpj = $2,
                        tx_email = $3,
                        tx_telefone = $4,
                        vr_frete = $5,
                        nu_dias_previsao_inicial_entrega = $6,
                        nu_dias_previsao_final_entrega = $7,
                        tx_pais = $8,
                        tx_uf = $9,
                        tx_cidade = $10,
                        tx_endereco = $11
                    WHERE id_fornecedor = $12;
            `;

            const response:any = await query(sql_update, [tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, tx_pais, tx_uf, tx_cidade, tx_endereco, this.id_fornecedor]);

            if(response){
                this.tx_razao_social = tx_razao_social;
                this.tx_cpf_cnpj = tx_cpf_cnpj;
                this.tx_email = tx_email;
                this.tx_telefone = tx_telefone;
                this.vr_frete = vr_frete;
                this.nu_dias_previsao_inicial_entrega = nu_dias_previsao_inicial_entrega;
                this.nu_dias_previsao_final_entrega = nu_dias_previsao_final_entrega;
                this.tx_pais = tx_pais;
                this.tx_uf = tx_uf;
                this.tx_cidade = tx_cidade;
                this.tx_endereco = tx_endereco;
    
                return {
                    result: 'success',
                    message: 'Fornecedor atualizado com sucesso'
                };
            }else{
                throw new Error('Erro ao tentar atualizar fornecedor.');
            }

        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar atualizar fornecedor.'
            };
        }
    }

    public async deletarFornecedor(): Promise<object> {
        try {
            const sql_delete = `DELETE FROM tb_fornecedor WHERE id_fornecedor = $1`;
            const response:any = await query(sql_delete, [this.id_fornecedor]);

            if(response){
                return {
                    result: 'success',
                    message: 'Fornecedor deletado com sucesso'
                };
            }else{
                throw new Error('Erro ao tentar deletar fornecedor.');
            }
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
            const response = await Promise.all(
                fornecedores.map(fornecedor => 
                    this.criarFornecedor(
                        fornecedor.tx_razao_social, 
                        fornecedor.tx_cpf_cnpj, 
                        fornecedor.tx_email, 
                        fornecedor.tx_telefone, 
                        fornecedor.vr_frete, 
                        fornecedor.nu_dias_previsao_inicial_entrega, 
                        fornecedor.nu_dias_previsao_final_entrega, 
                        fornecedor.tx_pais, 
                        fornecedor.tx_uf, 
                        fornecedor.tx_cidade, 
                        fornecedor.tx_endereco
                    )
                )
            );
    
            return {
                result: 'success',
                message: `${response.length} fornecedores criados com sucesso.`,
                data: response
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao criar fornecedores em lote.'
            };
        }
    }
    
}

export default Fornecedor;