import pool from "../../services/db";
import Venda from "./VendaModel";
class VendaProduto {
    private id_venda_produto: number;
    private id_venda: number;
    private id_local_estoque: number;
    private id_estoque: number;
    private id_produto: number;
    private nu_quantidade: number;
    private vr_total: number;

    constructor(
        id_venda_produto: number,
        id_venda: number,
        id_local_estoque: number,
        id_estoque: number,
        id_produto: number,
        nu_quantidade?: number,
        vr_total?: number
    ) {
        this.id_venda_produto = id_venda_produto;
        this.id_venda = id_venda;
        this.id_local_estoque = id_local_estoque;
        this.id_estoque = id_estoque;
        this.id_produto = id_produto;
        this.nu_quantidade = nu_quantidade ?? 0;
        this.vr_total = vr_total ?? 0;
    }

    public getIdVendaProduto(): number {
        return this.id_venda_produto;
    }

    public getIdVenda(): number {
        return this.id_venda;
    }

    public getIdLocalEstoque(): number {
        return this.id_local_estoque;
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

    public getVrTotal(): number {
        return this.vr_total;
    }

    public static async recalcularVenda(id_venda:number):Promise<object>{

        try{

        const sql_sum = `SELECT COALESCE(SUM(vr_total),0) AS sum FROM tb_venda_produto WHERE id_venda = ?`;
        const values = [id_venda];

        const response:any = await pool.query(sql_sum, values);

        if(response.length === 0){
            return {
                result: 'error',
                message: 'Erro ao tentar somar os valores dos produtos da venda.'
            } 
        }

        const sum = response[0].sum;

        const sql_update = `UPDATE tb_venda SET vr_venda = ? WHERE id_venda = ?`;
        const values2 = [sum, id_venda];

        const response2:any = await pool.query(sql_update, values2);

        if(response2){
            return {
                result: 'success',
                message: 'Valor da venda recalculado com sucesso.'
            }
        }else{
            return {
                result: 'error',
                message: 'Erro ao tentar recalcular o valor da venda.'
            }
        }

        }catch(error:any){
            return {
                result: 'error',
                message: error?.message??'Erro ao tentar recalcular o valor da venda.'
            }
        }
    }

    public static async calculaValorTotal(id_produto:number, nu_quantidade:number){
        try{

        const sql_search = `SELECT vr_preco_venda FROM tb_produto WHERE id_produto = ?`;
        const values = [id_produto];

        const response:any = await pool.query(sql_search, values);

        if(response.length === 0){
            return {
                result: 'error',
                message: 'Erro ao tentar calcular o valor total do item.'
            } 
        }

        const vr_preco_venda = response[0].vr_preco_venda;

        return {
            result: 'success',
            message: 'Valor total calculado com sucesso.',
            data: vr_preco_venda*nu_quantidade
        }

        }catch(error:any){
            return {
                result: 'error',
                message: error?.message??'Erro ao tentar calcular o valor total do item.'
            }
        }
    }

    public static async criarVendaProduto( id_venda: number, id_local_estoque: number, id_estoque: number, id_produto: number, nu_quantidade: number): 
        Promise<object> {
        try {

            const calcula_vr_total = await this.calculaValorTotal(id_produto, nu_quantidade);

            if(calcula_vr_total.result === 'error'){
                return {
                    result: 'error',
                    message: calcula_vr_total?.message ?? 'Erro ao tentar adicionar item a venda.'
                };
            }

            const vr_total = calcula_vr_total.data; 

            const sql_insert = `
                INSERT INTO tb_venda_produto(id_venda, id_local_estoque, id_estoque, id_produto, nu_quantidade, vr_total)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_venda¨_produto
            `;

            const response:any = await pool.query(sql_insert, [id_venda, id_local_estoque, id_estoque, id_produto, nu_quantidade, vr_total]);

            if (response?.length > 0) {

                const recalcular:any = await this.recalcularVenda(id_venda);

                if(recalcular?.result !== 'success'){
                    return {
                        result: 'error',
                        message: recalcular?.message ?? 'Erro ao tentar recalcular valor da venda.'
                    };
                }

                return {
                    result: 'success',
                    message: 'Item adicionado a venda com sucesso',
                    data: new VendaProduto(response[0].id_venda_produto, id_venda, id_local_estoque, id_estoque, id_produto, nu_quantidade, vr_total)
                };
            } else {
                throw new Error('Erro ao tentar adicionar item a venda.');
            }
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar adicionar item a venda.'
            };
        }
    }

    public static async buscarVendaProduto(id_venda: number, id_venda_produto?: number): Promise<object> {
        try {
            const sql_search = id_venda_produto
                ? `SELECT * FROM tb_venda_produto WHERE id_venda = $1 AND id_venda_produto = $2`
                : `SELECT * FROM tb_venda_produto WHERE id_venda = $1 ORDER BY id_venda`;

            const response:any = await pool.query(sql_search, id_venda_produto ? [id_venda, id_venda_produto] : [id_venda]);

            if(response?.length > 0){
                return {
                    result: 'success',
                    message: 'Item(ns) da venda encontrado(s) com sucesso',
                    data: response
                };
            }else{
                throw new Error('Erro ao tentar buscar item(ns) da venda(s).');
            }
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar buscar item(ns) da venda(s).'
            };
        }
    }

    public async atualizarVendaProduto(id_local_estoque: number, id_estoque: number, id_produto: number, nu_quantidade: number): Promise<object> {

        const calcula_vr_total = await VendaProduto.calculaValorTotal(id_produto, nu_quantidade);

        if(calcula_vr_total.result === 'error'){
            return {
                result: 'error',
                message: calcula_vr_total?.message ?? 'Erro ao tentar adicionar item a venda.'
            };
        }

        const vr_total:any = calcula_vr_total.data; 

        try {
            const sql_update = `
                UPDATE tb_venda_produto
                    SET id_local_estoque = $1,
                    id_estoque = $2,
                    id_produto = $3,
                    nu_quantidade = $4,
                    vr_total = $5
                    WHERE id_venda = $6
                    AND id_venda_produto = $7;
            `;

            const response:any = await pool.query(sql_update, [id_local_estoque, id_estoque, id_produto, nu_quantidade, vr_total, this.id_venda, this.id_venda_produto]);

            if(response){
                this.id_local_estoque =id_local_estoque;
                this.id_estoque = id_estoque;
                this.id_produto = id_produto;
                this.nu_quantidade = nu_quantidade;
                this.vr_total = vr_total;

                const recalcular:any = await VendaProduto.recalcularVenda(this.id_venda);

                if(recalcular?.result !== 'success'){
                    return {
                        result: 'error',
                        message: recalcular?.message ?? 'Erro ao tentar recalcular valor da venda.'
                    };
                }
    
                return {
                    result: 'success',
                    message: 'Item da venda atualizados com sucesso'
                };
            }else{
                throw new Error('Erro ao tentar atualizar item da venda.');
            }

        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar atualizar item da venda.'
            };
        }
    }

    public async deletarVendaProduto(): Promise<object> {
        try {
            const sql_delete = `DELETE FROM tb_venda_produto WHERE id_venda = $1 AND id_venda_produto = $2;`;
            const response:any = await pool.query(sql_delete, [this.id_venda, this.id_venda_produto]);

            if(response){

                const recalcular:any = await VendaProduto.recalcularVenda(this.id_venda);

                if(recalcular?.result !== 'success'){
                    return {
                        result: 'error',
                        message: recalcular?.message ?? 'Erro ao tentar recalcular valor da venda.'
                    };
                }

                return {
                    result: 'success',
                    message: 'Item da venda deletado com sucesso'
                };
            }else{
                throw new Error('Erro ao tentar deletar item da venda.');
            }
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar deletar venda.'
            };
        }
    }
}

export default VendaProduto;
