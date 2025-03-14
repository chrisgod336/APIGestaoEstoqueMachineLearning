import pool from "../../services/db";
class CompraProduto {
    private id_compra_produto: number;
    private id_compra: number;
    private id_estoque: number;
    private id_produto: number;
    private nu_quantidade: number;
    private vr_total: number;

    constructor(
        id_compra_produto: number,
        id_compra: number,
        id_estoque: number,
        id_produto: number,
        nu_quantidade?: number,
        vr_total?: number
    ) {
        this.id_compra_produto = id_compra_produto;
        this.id_compra = id_compra;
        this.id_estoque = id_estoque;
        this.id_produto = id_produto;
        this.nu_quantidade = nu_quantidade ?? 0;
        this.vr_total = vr_total ?? 0;
    }

    public getIdCompraProduto(): number {
        return this.id_compra_produto;
    }

    public getIdCompra(): number {
        return this.id_compra;
    }

    public getIdProduto(): number {
        return this.id_produto;
    }

    public getIdEstoque(): number {
        return this.id_estoque;
    }

    public getNuQuantidade(): number {
        return this.nu_quantidade;
    }

    public getVrTotal(): number {
        return this.vr_total;
    }

    public static async recalcularCompra(id_compra:number):Promise<object>{

        try{

        const sql_sum = `SELECT COALESCE(SUM(vr_total),0) AS sum FROM tb_compra_produto WHERE id_compra = ?`;
        const values = [id_compra];

        const response:any = await pool.query(sql_sum, values);

        if(response.length === 0){
            return {
                result: 'error',
                message: 'Erro ao tentar somar os valores dos produtos da compra.'
            } 
        }

        const sum = response[0].sum;

        const sql_update = `UPDATE tb_compra SET vr_total = (? - vr_frete), vr_compra = ? WHERE id_compra = ?`;
        const values2 = [sum, sum, id_compra];

        const response2:any = await pool.query(sql_update, values2);

        if(response2){
            return {
                result: 'success',
                message: 'Valor da compra recalculado com sucesso.'
            }
        }else{
            return {
                result: 'error',
                message: 'Erro ao tentar recalcular o valor da compra.'
            }
        }

        }catch(error:any){
            return {
                result: 'error',
                message: error?.message??'Erro ao tentar recalcular o valor da compra.'
            }
        }
    }

    public static async calculaValorTotal(id_produto:number, nu_quantidade:number){
        try{

        const sql_search = `SELECT vr_preco_compra FROM tb_produto WHERE id_produto = ?`;
        const values = [id_produto];

        const response:any = await pool.query(sql_search, values);

        if(response.length === 0){
            return {
                result: 'error',
                message: 'Erro ao tentar calcular o valor total do item.'
            } 
        }

        const vr_preco_compra = response[0].vr_preco_compra;

        return {
            result: 'success',
            message: 'Valor total calculado com sucesso.',
            data: vr_preco_compra*nu_quantidade
        }

        }catch(error:any){
            return {
                result: 'error',
                message: error?.message??'Erro ao tentar calcular o valor total do item.'
            }
        }
    }

    public static async criarCompraProduto( id_compra: number, id_estoque: number, id_produto: number, nu_quantidade: number): 
        Promise<object> {
        try {

            const calcula_vr_total = await this.calculaValorTotal(id_produto, nu_quantidade);

            if(calcula_vr_total.result === 'error'){
                return {
                    result: 'error',
                    message: calcula_vr_total?.message ?? 'Erro ao tentar adicionar item a compra.'
                };
            }

            const vr_total = calcula_vr_total.data; 

            const sql_insert = `
                INSERT INTO tb_venda_produto(id_compra, id_estoque, id_produto, nu_quantidade, vr_total)
                VALUES ($1, $2, $3, $4, $5) RETURNING id_compra_produto
            `;

            const response:any = await pool.query(sql_insert, [id_compra, id_estoque, id_produto, nu_quantidade, vr_total]);

            if (response?.length > 0) {

                const recalcular:any = await this.recalcularCompra(id_compra);

                if(recalcular?.result !== 'success'){
                    return {
                        result: 'error',
                        message: recalcular?.message ?? 'Erro ao tentar recalcular valor da compra.'
                    };
                }

                return {
                    result: 'success',
                    message: 'Item adicionado a compra com sucesso',
                    data: new CompraProduto(response[0].id_compra_produto, id_compra, id_estoque, id_produto, nu_quantidade, vr_total)
                };
            } else {
                throw new Error('Erro ao tentar adicionar item a compra.');
            }
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar adicionar item a compra.'
            };
        }
    }

    public static async buscarCompraProduto(id_compra: number, id_compra_produto?: number): Promise<object> {
        try {
            const sql_search = id_compra_produto
                ? `SELECT * FROM tb_compra_produto WHERE id_compra = $1 AND id_compra_produto = $2`
                : `SELECT * FROM tb_compra_produto WHERE id_compra = $1 ORDER BY id_compra`;

            const response:any = await pool.query(sql_search, id_compra_produto ? [id_compra, id_compra_produto] : [id_compra]);

            if(response?.length > 0){
                return {
                    result: 'success',
                    message: 'Item(ns) da compra encontrado(s) com sucesso',
                    data: response
                };
            }else{
                throw new Error('Erro ao tentar buscar item(ns) da compra(s).');
            }
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar buscar item(ns) da compra(s).'
            };
        }
    }

    public async atualizarCompraProduto(id_estoque: number, id_produto: number, nu_quantidade: number): Promise<object> {

        const calcula_vr_total = await CompraProduto.calculaValorTotal(id_produto, nu_quantidade);

        if(calcula_vr_total.result === 'error'){
            return {
                result: 'error',
                message: calcula_vr_total?.message ?? 'Erro ao tentar adicionar item a compra.'
            };
        }

        const vr_total:any = calcula_vr_total.data; 

        try {
            const sql_update = `
                UPDATE tb_compra_produto
                    id_estoque = $1,
                    id_produto = $2,
                    nu_quantidade = $3,
                    vr_total = $4
                    WHERE id_compra = $5
                    AND id_compra_produto = $6;
            `;

            const response:any = await pool.query(sql_update, [id_estoque, id_produto, nu_quantidade, vr_total, this.id_compra, this.id_compra_produto]);

            if(response){
                this.id_estoque = id_estoque;
                this.id_produto = id_produto;
                this.nu_quantidade = nu_quantidade;
                this.vr_total = vr_total;

                const recalcular:any = await CompraProduto.recalcularCompra(this.id_compra);

                if(recalcular?.result !== 'success'){
                    return {
                        result: 'error',
                        message: recalcular?.message ?? 'Erro ao tentar recalcular valor da compra.'
                    };
                }
    
                return {
                    result: 'success',
                    message: 'Item da compra atualizados com sucesso'
                };
            }else{
                throw new Error('Erro ao tentar atualizar item da compra.');
            }

        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar atualizar item da compra.'
            };
        }
    }

    public async deletarCompraProduto(): Promise<object> {
        try {
            const sql_delete = `DELETE FROM tb_compra_produto WHERE id_compra = $1 AND id_compra_produto = $2;`;
            const response:any = await pool.query(sql_delete, [this.id_compra, this.id_compra_produto]);

            if(response){

                const recalcular:any = await CompraProduto.recalcularCompra(this.id_compra);

                if(recalcular?.result !== 'success'){
                    return {
                        result: 'error',
                        message: recalcular?.message ?? 'Erro ao tentar recalcular valor da compra.'
                    };
                }

                return {
                    result: 'success',
                    message: 'Item da compra deletado com sucesso'
                };
            }else{
                throw new Error('Erro ao tentar deletar item da compra.');
            }
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar deletar compra.'
            };
        }
    }
}

export default CompraProduto;
