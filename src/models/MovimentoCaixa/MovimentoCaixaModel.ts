import { query } from "../../services/db";
class MovimentoCaixa {
    private id_movimento_caixa: number;
    private id_venda: number;
    private id_compra: number;
    private tx_descricao: string;
    private vr_movimento: number;
    private dt_movimento: string;
    private tx_tipo_movimento: string;

    constructor(
        id_movimento_caixa: number,
        id_venda: number,
        id_compra: number,
        tx_descricao?: string,
        vr_movimento?: number,
        dt_movimento?: string,
        tx_tipo_movimento?: string
    ) {
        this.id_movimento_caixa = id_movimento_caixa;
        this.id_venda = id_venda;
        this.id_compra = id_compra;
        this.tx_descricao = tx_descricao ?? "";
        this.vr_movimento = vr_movimento ?? 0;
        this.dt_movimento = dt_movimento ?? "";
        this.tx_tipo_movimento = tx_tipo_movimento ?? "";
    }

    public getIdMovimentoCaixa(): number {
        return this.id_movimento_caixa;
    }

    public getIdVenda(): number {
        return this.id_venda;
    }

    public getIdCompra(): number {
        return this.id_compra;
    }

    public getTxDescricao(): string {
        return this.tx_descricao;
    }

    public getVrMovimento(): number {
        return this.vr_movimento;
    }

    public getDtMovimento(): string {
        return this.dt_movimento;
    }

    public getTxTipoMovimento(): string {
        return this.tx_tipo_movimento;
    }

    public static async buscaMovimentoCaixa(){

        try{

        const sql_search = `
        SELECT *
            FROM tb_movimento_caixa
            ORDER BY id_movimento_caixa DESC`;

        const response:any = await query(sql_search);

        if (response?.length > 0) {

            return {
                result: 'success',
                message: 'Movimentações encontradas com sucesso', 
                data: response
            };
        } else {
            throw new Error('Erro ao tentar buscar movimentações.');
        }

        }catch(error:any){
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar buscar movimentações.'
            };
        }

    }

    public static async criarMovimentoCaixa(tx_descricao:string, vr_movimento:number, tx_tipo_movimento:string, id_venda?:number, id_compra?:number, dt_movimento?:string): Promise<object> {
        try {

            dt_movimento = dt_movimento?dt_movimento:'NOW()';
            id_venda = id_venda?id_venda:0;
            id_compra = id_compra?id_compra:0;

            const sql_insert = `
                INSERT INTO tb_movimento_caixa(tx_descricao, vr_movimento, tx_tipo_movimento, dt_movimento, id_venda, id_compra)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_movimento_caixa
            `;

            const response:any = await query(sql_insert, [tx_descricao, vr_movimento, tx_tipo_movimento, dt_movimento, id_venda, id_compra]);

            if (response?.length > 0) {

                return {
                    result: 'success',
                    message: 'Movimentação de caixa realizada com sucesso',
                    data: new MovimentoCaixa(response[0].id_movimento_caixa, response[0].tx_descricao, response[0].vr_movimento, response[0].tx_tipo_movimento, response[0].dt_movimento, response[0].id_venda, response[0].id_compra)
                };
            } else {
                throw new Error('Erro ao tentar inserir movimentação.');
            }
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar criar movimentação.'
            };
        }
    }

    public static async deletarMovimentoCaixa(id_venda?:number, id_compra?:number): Promise<object> {
        try {
            const sql_delete = id_venda? 
            `DELETE FROM tb_movimento_caixa WHERE id_venda = $1`: 
            `DELETE FROM tb_movimento_caixa WHERE id_compra = $1`;
            const response:any = await query(sql_delete, [id_venda?id_venda:id_compra]);

            if(response){
                return {
                    result: 'success',
                    message: 'Movimentação deletada com sucesso'
                };
            }else{
                throw new Error('Erro ao tentar deletar movimentação.');
            }
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar deletar movimentação.'
            };
        }
    }
}

export default MovimentoCaixa;
