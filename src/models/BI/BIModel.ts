import { db } from "../../../app";

// 	mes INTEGER NOT NULL,
// 	ano INTEGER NOT NULL,
// 	id_produto INTEGER NOT NULL,
// 	nu quantidade INTEGER NOT NULL,
//   vr_total NUMERIC(18,2) DEFAULT 0

class BI {
    private mes: number;
    private ano: number;
    private id_produto: number;
    private nu_quantidade: number;
    private vr_total: number;

    constructor(
        mes:number,
        ano:number,
        id_produto: number,
        nu_quantidade: number,
        vr_total:number
    ){
        this.mes = mes;
        this.ano = ano;
        this.id_produto = id_produto;
        this.nu_quantidade = nu_quantidade;
        this.vr_total = vr_total;
    }

    public getMes(): number {
        return this.mes;
    }

    public getAno(): number {
        return this.ano;
    }

    public getIdProduto(): number {
        return this.id_produto;
    }

    public getNuQUantidade(): number {
        return this.nu_quantidade;
    }

    public getVrTotal(): number {
        return this.vr_total;
    }

    public static async getNextSixMonths(): object{

        const query_compra = '';
        const query_venda = '';
        const query_estoque = '';

        const response_compra = [];
        const response_venda = [];
        const response_estoque = [];

        return {

        }
    }
}

export default BI;