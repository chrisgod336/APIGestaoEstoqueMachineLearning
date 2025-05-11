"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../../app");
class BI {
    constructor(mes, ano, id_produto, nu_quantidade, vr_total) {
        this.mes = mes;
        this.ano = ano;
        this.id_produto = id_produto;
        this.nu_quantidade = nu_quantidade;
        this.vr_total = vr_total;
    }
    getMes() {
        return this.mes;
    }
    getAno() {
        return this.ano;
    }
    getIdProduto() {
        return this.id_produto;
    }
    getNuQUantidade() {
        return this.nu_quantidade;
    }
    getVrTotal() {
        return this.vr_total;
    }
    static getNextSixMonths(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Buscar os produtos mais vendidos
                const query_produtos = `SELECT id_produto
                FROM tb_previsao_venda
                GROUP BY id_produto
                ORDER BY SUM(nu_quantidade) DESC
                ${limit ? `LIMIT ${limit}` : ''}
            `;
                //Calcular o mês/ano dos próximos 6 meses
                const dataAtual = new Date();
                function adicionarMeses(data, meses) {
                    const novaData = new Date(data);
                    novaData.setMonth(novaData.getMonth() + meses);
                    return { mes: novaData.getMonth() + 1, ano: novaData.getFullYear() };
                }
                function mesExt(mes) {
                    switch (mes) {
                        case 1: return 'JAN';
                        case 2: return 'FEV';
                        case 3: return 'MAR';
                        case 4: return 'ABR';
                        case 5: return 'MAI';
                        case 6: return 'JUN';
                        case 7: return 'JUL';
                        case 8: return 'AGO';
                        case 9: return 'SET';
                        case 10: return 'OUT';
                        case 11: return 'NOV';
                        default: return 'DEZ';
                    }
                }
                const proximos6Meses = [];
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
                const response_compra = yield app_1.db.all(query_compra);
                const response_venda = yield app_1.db.all(query_venda);
                const response_estoque = yield app_1.db.all(query_estoque);
                if (!response_compra.length || !response_venda.length || !response_estoque.length) {
                    throw new Error('Erros ao buscar os dados.');
                }
                const query_sum_compra = `SELECT mes, ano, SUM(nu_quantidade) AS nu_quantidade, SUM(vr_total) AS vr_total FROM tb_previsao_compra WHERE id_produto IN (${query_produtos}) GROUP BY mes, ano ORDER BY mes, ano`;
                const query_sum_venda = `SELECT mes, ano, SUM(nu_quantidade) AS nu_quantidade, SUM(vr_total) AS vr_total FROM tb_previsao_venda WHERE id_produto IN (${query_produtos}) GROUP BY mes, ano ORDER BY mes, ano`;
                const query_sum_estoque = `SELECT mes, ano, SUM(nu_quantidade) AS nu_quantidade, SUM(vr_total) AS vr_total FROM tb_previsao_estoque WHERE id_produto IN (${query_produtos}) GROUP BY mes, ano ORDER BY mes, ano`;
                const response_sum_compra = yield app_1.db.all(query_sum_compra);
                const response_sum_venda = yield app_1.db.all(query_sum_venda);
                const response_sum_estoque = yield app_1.db.all(query_sum_estoque);
                return {
                    result: "success",
                    message: 'Dados encontrados com sucesso',
                    data: {
                        compra: response_compra.map((element) => {
                            return Object.assign(Object.assign({}, element), { mesExt: mesExt(element.mes) });
                        }),
                        venda: response_venda.map((element) => {
                            return Object.assign(Object.assign({}, element), { mesExt: mesExt(element.mes) });
                        }),
                        estoque: response_estoque.map((element) => {
                            return Object.assign(Object.assign({}, element), { mesExt: mesExt(element.mes) });
                        }),
                        total_compra: response_sum_compra.map((element) => {
                            return Object.assign(Object.assign({}, element), { mesExt: mesExt(element.mes) });
                        }),
                        total_venda: response_sum_venda.map((element) => {
                            return Object.assign(Object.assign({}, element), { mesExt: mesExt(element.mes) });
                        }),
                        total_estoque: response_sum_estoque.map((element) => {
                            return Object.assign(Object.assign({}, element), { mesExt: mesExt(element.mes) });
                        })
                    }
                };
            }
            catch (error) {
                return {
                    result: "error",
                    message: error || (error === null || error === void 0 ? void 0 : error.message) || 'Erro ao buscar dados'
                };
            }
        });
    }
}
exports.default = BI;
