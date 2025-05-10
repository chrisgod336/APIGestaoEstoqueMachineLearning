import { db } from "../../../app";

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

    public static async getNextSixMonths(): Promise<object>{

        try{
            //Buscar os 10 produtos  mais vendidos
            const query_produtos = 
            `SELECT id_produto
                FROM tb_previsao_venda
                GROUP BY id_produto
                ORDER BY SUM(nu_quantidade) DESC
                LIMIT 10
            `;

            //Calcular o mês/ano dos próximos 6 meses
            const dataAtual = new Date();

            function adicionarMeses(data: Date, meses: number): object {
                const novaData = new Date(data);
                novaData.setMonth(novaData.getMonth() + meses);

                return {mes:novaData.getMonth() + 1, ano: novaData.getFullYear()};
            }

            function mesExt(mes:number){
                switch(mes){
                    case 1:return'JAN';
                    case 2:return'FEV';
                    case 3:return'MAR';
                    case 4:return'ABR';
                    case 5:return'MAI';
                    case 6:return'JUN';
                    case 7:return'JUL';
                    case 8:return'AGO';
                    case 9:return'SET';
                    case 10:return'OUT';
                    case 11:return'NOV';
                    default: return'DEZ';
                }
            }

            const proximos6Meses: object[] = [];
            for (let i = 1; i <= 6; i++) {
                proximos6Meses.push(adicionarMeses(dataAtual, i));
            }

            //Buscar os dados dos produtos nas tabelas previtivas para os próximos 6 meses
            const query_compra = `SELECT *, (
            SELECT tx_nome FROM tb_produto WHERE id_produto = tb_previsao_compra.id_produto
            ) AS nome_produto FROM tb_previsao_compra WHERE id_produto IN (${query_produtos}) ORDER BY mes, ano, id_produto`;
            const query_venda = `SELECT * , (
            SELECT tx_nome FROM tb_produto WHERE id_produto = tb_previsao_venda.id_produto
            ) AS nome_produto FROM tb_previsao_venda WHERE id_produto IN (${query_produtos}) ORDER BY mes, ano, id_produto`;
            const query_estoque = `SELECT *, (
            SELECT tx_nome FROM tb_produto WHERE id_produto = tb_previsao_estoque.id_produto
            ) AS nome_produto FROM tb_previsao_estoque WHERE id_produto IN (${query_produtos}) ORDER BY mes, ano, id_produto`;

            const response_compra:Array<BI> = await db.all(query_compra);
            const response_venda:Array<BI> = await db.all(query_venda);
            const response_estoque:Array<BI> = await db.all(query_estoque);

            if(!response_compra.length || !response_venda.length || !response_estoque.length){
                throw new Error('Erros ao buscar os dados.');
            }

            const query_sum_compra = `SELECT mes, ano, SUM(nu_quantidade) AS nu_quantidade, SUM(vr_total) AS vr_total FROM tb_previsao_compra WHERE id_produto IN (${query_produtos}) GROUP BY mes, ano ORDER BY mes, ano`;
            const query_sum_venda = `SELECT mes, ano, SUM(nu_quantidade) AS nu_quantidade, SUM(vr_total) AS vr_total FROM tb_previsao_venda WHERE id_produto IN (${query_produtos}) GROUP BY mes, ano ORDER BY mes, ano`;
            const query_sum_estoque = `SELECT mes, ano, SUM(nu_quantidade) AS nu_quantidade, SUM(vr_total) AS vr_total FROM tb_previsao_estoque WHERE id_produto IN (${query_produtos}) GROUP BY mes, ano ORDER BY mes, ano`;

            const response_sum_compra:Array<BI> = await db.all(query_sum_compra);
            const response_sum_venda:Array<BI> = await db.all(query_sum_venda);
            const response_sum_estoque:Array<BI> = await db.all(query_sum_estoque);

            return {
                result: "success",
                message: 'Dados encontrados com sucesso',
                data: {
                    compra: response_compra.map((element) => {
                        return {...element, mesExt:mesExt(element.mes)};
                    }),
                    venda: response_venda.map((element) => {
                        return {...element, mesExt:mesExt(element.mes)};
                    }),
                    estoque: response_estoque.map((element) => {
                        return {...element, mesExt:mesExt(element.mes)};
                    }),
                    total_compra: response_sum_compra.map((element) =>{
                        return {...element, mesExt:mesExt(element.mes)};
                    }),
                    total_venda: response_sum_venda.map((element) =>{
                        return {...element, mesExt:mesExt(element.mes)};
                    }),
                    total_estoque: response_sum_estoque.map((element) =>{
                        return {...element, mesExt:mesExt(element.mes)};
                    })
                }
            }
        }catch(error:any){
            return {
                result: "error",
                message: error||error?.message||'Erro ao buscar dados'
            }
        }
    }
}

export default BI;