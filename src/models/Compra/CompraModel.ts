import { query } from "../../services/db";
import MovimentoCaixa from "../MovimentoCaixa/MovimentoCaixaModel";
class Compra {
    private id_compra: number;
    private id_fornecedor: number;
    private id_local_estoque: number;
    private dt_compra: string;
    private vr_total_compra: number;
    private vr_compra: number;
    private vr_frete: number;
    private tx_status: string;
    private dt_previsao_entrega_inicial: string;
    private dt_previsao_entrega_final: string;
    private dt_entrega: string;

    constructor(
        id_compra: number,
        id_fornecedor: number,
        id_local_estoque: number,
        dt_compra?: string,
        tx_status?: string,
        dt_previsao_entrega_inicial?: string,
        dt_previsao_entrega_final?: string,
        vr_total_compra?: number,
        vr_compra?: number,
        vr_frete?: number,
        dt_entrega?: string
    ) {
        this.id_compra = id_compra;
        this.id_fornecedor = id_fornecedor;
        this.id_local_estoque = id_local_estoque;
        this.dt_compra = dt_compra ?? "";
        this.vr_total_compra = vr_total_compra ?? 0;
        this.vr_compra = vr_compra ?? 0;
        this.vr_frete = vr_frete ?? 0;
        this.tx_status = tx_status ?? "PENDENTE";
        this.dt_previsao_entrega_inicial = dt_previsao_entrega_inicial ?? "";
        this.dt_previsao_entrega_final = dt_previsao_entrega_final ?? "";
        this.dt_entrega = dt_entrega ?? "";
    }

    public getIdCompra(): number {
        return this.id_compra;
    }

    public getIdFornecedor(): number {
        return this.id_fornecedor;
    }

    public getIdLocalEstoque(): number {
        return this.id_local_estoque;
    }

    public getDtCompra(): string {
        return this.dt_compra;
    }

    public getVrTotalCompra(): number {
        return this.vr_total_compra;
    }

    public getVrCompra(): number {
        return this.vr_compra;
    }

    public getVrFrete(): number {
        return this.vr_frete;
    }

    public getTxStatus(): string {
        return this.tx_status;
    }

    public getDtPrevisaoEntregaInicial(): string {
        return this.dt_previsao_entrega_inicial;
    }

    public getDtPrevisaoEntregaFinal(): string {
        return this.dt_previsao_entrega_final;
    }

    public getDtEntrega(): string {
        return this.dt_entrega;
    }

    public static async calcularPeriodoEntrega(id_fornecedor: number, dt_compra: string): Promise<object> {
        try {
            const sql_search = `SELECT nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega FROM tb_fornecedores WHERE id_fornecedor = $1`;
            const values = [id_fornecedor];
            const response: any = await query(sql_search, values);
    
            if (response?.length > 0) {
                const dias_inc = response[0].nu_dias_previsao_inicial_entrega;
                const dias_fim = response[0].nu_dias_previsao_final_entrega;
    
                const dataCompra = new Date(dt_compra);
                if (isNaN(dataCompra.getTime())) {
                    return {
                        result: 'error',
                        message: 'Data de compra inválida.'
                    };
                }
    
                const previsaoInicial = new Date(dataCompra);
                previsaoInicial.setDate(previsaoInicial.getDate() + dias_inc);
    
                const previsaoFinal = new Date(dataCompra);
                previsaoFinal.setDate(previsaoFinal.getDate() + dias_fim);
    
                return {
                    result: 'success',
                    previsao_inicial: previsaoInicial.toISOString().split('T')[0],
                    previsao_final: previsaoFinal.toISOString().split('T')[0]
                };
            } else {
                return {
                    result: 'error',
                    message: 'Não foi possível encontrar o período de entrega do fornecedor.'
                };
            }
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Não foi possível encontrar o período de entrega do fornecedor.'
            };
        }
    }
    
    public static async criarCompra(id_fornecedor: number,id_local_estoque: number,dt_compra?: string): Promise<object> {
        try {

            dt_compra = dt_compra?dt_compra:'NOW()';

            const periodo_entrega:any = await this.calcularPeriodoEntrega(id_fornecedor, dt_compra);

            if(!periodo_entrega || periodo_entrega?.result !== 'success'){
                throw new Error(periodo_entrega?.message??'Erro ao tentar calcular o período de entrega.');
            }

            const {previsao_inicial, previsao_final} = periodo_entrega;

            const sql_insert = `
                INSERT INTO tb_compra(id_fornecedor, id_local_estoque, dt_compra, tx_status, dt_previsao_entrega_inicial, dt_previsao_entrega_final)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_compra
            `;

            const response:any = await query(sql_insert, [id_fornecedor, id_local_estoque, dt_compra, 'PENDENTE', previsao_inicial, previsao_final]);

            if (response?.length > 0) {

                return {
                    result: 'success',
                    message: 'Compra criada com sucesso',
                    data: new Compra(response[0].id_compra, id_fornecedor, id_local_estoque, dt_compra, 'PENDENTE', previsao_inicial, previsao_final, 0, 0, 0)
                };
            } else {
                throw new Error('Erro ao tentar inserir compra.');
            }
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar criar compra.'
            };
        }
    }

    public static async buscarCompra(id_compra?: number): Promise<object> {
        try {
            const sql_search = id_compra
                ? `SELECT * FROM tb_compra WHERE id_compra = $1`
                : `SELECT * FROM tb_compra ORDER BY id_compra`;
            const response:any = await query(sql_search, id_compra ? [id_compra] : []);

            if(response?.length > 0){
                return {
                    result: 'success',
                    message: 'Compra(s) encontrada(s) com sucesso',
                    data: response
                };
            }else{
                throw new Error('Erro ao tentar buscar compra(s).');
            }
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar buscar compra(s).'
            };
        }
    }

    public async atualizarCompra(id_fornecedor:number, id_local_estoque:number, dt_compra:string, vr_frete:number): Promise<object> {
        try {

            const periodo_entrega:any = await Compra.calcularPeriodoEntrega(id_fornecedor, dt_compra);
            const vr_total_compra = this.vr_compra - vr_frete;

            if(!periodo_entrega || periodo_entrega?.result !== 'success'){
                throw new Error(periodo_entrega?.message??'Erro ao tentar calcular o período de entrega.');
            }

            const {previsao_inicial, previsao_final} = periodo_entrega;

            const sql_update = `
                UPDATE tb_compra
                    SET id_fornecedor = $1,
                    id_local_estoque = $2,
                    dt_compra = $3,
                    vr_total_compra = $4,
                    vr_frete = $5,
                    dt_previsao_entrega_inicial = $6
                    dt_previsao_entrega_final = $7
                    WHERE id_compra = $8;
            `;

            const response:any = await query(sql_update, [id_fornecedor, id_local_estoque, dt_compra, vr_total_compra, vr_frete, previsao_inicial, previsao_final, this.id_compra]);

            if(response){

                this.id_fornecedor = id_fornecedor; 
                this.id_local_estoque = id_local_estoque;
                this.dt_compra = dt_compra;
                this.vr_total_compra = vr_total_compra;
                this.vr_frete = vr_frete;
                this.dt_previsao_entrega_inicial = previsao_inicial;
                this.dt_previsao_entrega_final = previsao_final;
    
                return {
                    result: 'success',
                    message: 'Compra atualizada com sucesso'
                };
            }else{
                throw new Error('Erro ao tentar atualizar compra.');
            }

        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar atualizar compra.'
            };
        }
    }

    public async deletarCompra(): Promise<object> {
        try {
            const sql_delete = `DELETE FROM tb_compra WHERE id_compra = $1`;
            const response:any = await query(sql_delete, [this.id_compra]);

            if(response){
                return {
                    result: 'success',
                    message: 'Compra deletada com sucesso'
                };
            }else{
                throw new Error('Erro ao tentar deletar compra.');
            }
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar deletar compra.'
            };
        }
    }

    public async baixarCompra(dt_entrega:string) {
        try {

            const sql_update = `UPDATE tb_compra SET dt_entrega = $1, tx_status  = 'BAIXADA' WHERE id_compra = $2`;
            const response:any = await query(sql_update, [dt_entrega, this.id_compra]);

            if(response){

                const movimentacao:any = await MovimentoCaixa.criarMovimentoCaixa(
                    `Movimentação referente a compra: ${this.id_compra}`, 
                    this.vr_total_compra, 
                    'COMPRA', 
                    0,
                    this.id_compra
                );

                if(movimentacao?.result === 'success'){

                    this.dt_entrega = dt_entrega;
                    this.tx_status = 'BAIXADA';

                    return {
                        result: 'success',
                        message: `Compra baixada com sucesso.`
                    };
                }else{
                    throw new Error(movimentacao?.message??'Erro ao tentar baixar compra.');
                }
                
            }else{
                throw new Error('Erro ao tentar baixar compra.');
            }

        }catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao baixar a compras.'
            };
        }
    }

    public async extornarCompra() {
        try {

            const sql_update = `UPDATE tb_compra SET dt_entrega = NULL, tx_status  = 'ABERTA' WHERE id_compra = $1`;
            const response:any = await query(sql_update, [this.id_compra]);

            if(response){

                const movimentacao:any = await MovimentoCaixa.deletarMovimentoCaixa(0, this.id_compra);

                if(movimentacao?.result === 'success'){

                    this.dt_entrega = '';
                    this.tx_status = 'ABERTA';

                    return {
                        result: 'success',
                        message: `Compra extornada com sucesso.`
                    };
                }else{
                    throw new Error(movimentacao?.message??'Erro ao tentar extornar compra.');
                }
                
            }else{
                throw new Error('Erro ao tentar extornar compra.');
            }

        }catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao extornar a compra.'
            };
        }
    }
}

export default Compra;
