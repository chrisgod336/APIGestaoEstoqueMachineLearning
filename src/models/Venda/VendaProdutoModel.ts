import { query } from "../../services/db";
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

    public static async criarVendaProduto( id_venda: number, id_local_estoque: number, id_estoque: number, id_produto: number, nu_quantidade: number, vr_total: number): 
        Promise<object> {
        try {

            const sql_insert = `
                INSERT INTO tb_venda_produto(id_venda, id_local_estoque, id_estoque, id_produto, nu_quantidade, vr_total)
                VALUES ($1, $2, $3, $4, $5, $) RETURNING id_venda¨_produto
            `;

            const response:any = await query(sql_insert, [id_venda, id_local_estoque, id_estoque, id_produto, nu_quantidade, vr_total]);

            if (response?.length > 0) {

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

            const response:any = await query(sql_search, id_venda_produto ? [id_venda, id_venda_produto] : [id_venda]);

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

    public async atualizarVendaProduto(id_local_estoque: number, id_estoque: number, id_produto: number, nu_quantidade: number, vr_total: number): Promise<object> {
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

            const response:any = await query(sql_update, [id_local_estoque, id_estoque, id_produto, nu_quantidade, vr_total, this.id_venda, this.id_venda_produto]);

            if(response){
                this.id_local_estoque =id_local_estoque;
                this.id_estoque = id_estoque;
                this.id_produto = id_produto;
                this.nu_quantidade = nu_quantidade;
                this.vr_total = vr_total;
    
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
            const response:any = await query(sql_delete, [this.id_venda, this.id_venda_produto]);

            if(response){
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
