"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const tensorflow_1 = require("../../services/tensorflow");
const tf = __importStar(require("@tensorflow/tfjs"));
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
    static calculateNextSixMonths() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                // 1. Obter dados históricos de vendas por produto e mês/ano
                const queryHistData = `
            SELECT 
                p.id_produto, 
                strftime('%m', v.dt_venda) as mes,
                strftime('%Y', v.dt_venda) as ano,
                SUM(p.nu_quantidade) as nu_quantidade,
                SUM(p.vr_total) as vr_total
            FROM tb_venda_produto p
            JOIN tb_venda v ON p.id_venda = v.id_venda
            GROUP BY p.id_produto, mes, ano
            ORDER BY p.id_produto, ano, mes;
            `;
                const histData = yield app_1.db.all(queryHistData);
                // 2. Obter estoque atual por produto
                const queryStqAtual = `
            SELECT id_produto, SUM(nu_quantidade) as nu_quantidade
            FROM tb_estoque
            GROUP BY id_produto;
            `;
                const estoqueAtual = yield app_1.db.all(queryStqAtual);
                // 3. Processar dados para o modelo
                const produtos = [...new Set(histData.map(item => item.id_produto))];
                const previsoes = [];
                // 4. Calcular próximos 6 meses
                const dataAtual = new Date();
                const mesesFuturos = Array.from({ length: 6 }, (_, i) => {
                    const data = new Date(dataAtual);
                    data.setMonth(data.getMonth() + i + 1);
                    return {
                        mes: data.getMonth() + 1,
                        ano: data.getFullYear(),
                        mesExt: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'][data.getMonth()]
                    };
                });
                // 5. Para cada produto, treinar modelo e fazer previsão
                for (const idProduto of produtos) {
                    const dadosProduto = histData.filter(item => item.id_produto === idProduto);
                    if (dadosProduto.length < 3) {
                        const mediaQuantidade = dadosProduto.reduce((sum, item) => sum + item.nu_quantidade, 0) / dadosProduto.length;
                        const mediaValor = dadosProduto.reduce((sum, item) => sum + item.vr_total, 0) / dadosProduto.length;
                        mesesFuturos.forEach(({ mes, ano, mesExt }) => {
                            var _a;
                            previsoes.push({
                                id_produto: idProduto,
                                mes,
                                ano,
                                mesExt,
                                nu_quantidade: Math.round(mediaQuantidade),
                                vr_total: Math.round(mediaValor),
                                estoque_necessario: Math.round(mediaQuantidade * 1.1),
                                compras_necessarias: Math.max(0, Math.round(mediaQuantidade * 1.1) -
                                    (((_a = estoqueAtual.find(e => e.id_produto === idProduto)) === null || _a === void 0 ? void 0 : _a.nu_quantidade) || 0))
                            });
                        });
                        continue;
                    }
                    // Preparar dados para o TensorFlow
                    const dadosTreino = dadosProduto.map((item, index) => ({
                        mes_sequencial: index,
                        nu_quantidade: item.nu_quantidade,
                        vr_total: item.vr_total
                    }));
                    try {
                        // Treinar modelo
                        const { model, minMonth, maxMonth, minQuantity, maxQuantity } = yield (0, tensorflow_1.trainModel)(dadosTreino);
                        // Fazer previsões
                        const estoqueProduto = ((_a = estoqueAtual.find(e => e.id_produto === idProduto)) === null || _a === void 0 ? void 0 : _a.nu_quantidade) || 0;
                        for (let i = 0; i < mesesFuturos.length; i++) {
                            const mesSequencial = dadosTreino.length + i;
                            const input = tf.tensor3d([[[this.normalizar(mesSequencial, minMonth, maxMonth)]]], [1, 1, 1]);
                            const pred = model.predict(input);
                            const predData = yield pred.data();
                            const quantidade = this.desnormalizar(predData[0], minQuantity, maxQuantity);
                            const vrTotal = quantidade * (dadosProduto[0].vr_total / dadosProduto[0].nu_quantidade);
                            previsoes.push({
                                id_produto: idProduto,
                                mes: mesesFuturos[i].mes,
                                ano: mesesFuturos[i].ano,
                                mesExt: mesesFuturos[i].mesExt,
                                nu_quantidade: Math.round(quantidade),
                                vr_total: Math.round(vrTotal),
                                estoque_necessario: Math.round(quantidade * 1.1),
                                compras_necessarias: Math.max(0, Math.round(quantidade * 1.1) - estoqueProduto)
                            });
                            // Liberar memória
                            input.dispose();
                            pred.dispose();
                        }
                    }
                    catch (error) {
                        console.error(`Erro ao treinar modelo para produto ${idProduto}:`, error);
                        // Fallback para média móvel
                        const mediaQuantidade = dadosProduto.slice(-3).reduce((sum, item) => sum + item.nu_quantidade, 0) / 3;
                        const mediaValor = dadosProduto.slice(-3).reduce((sum, item) => sum + item.vr_total, 0) / 3;
                        mesesFuturos.forEach(({ mes, ano, mesExt }) => {
                            var _a;
                            previsoes.push({
                                id_produto: idProduto,
                                mes,
                                ano,
                                mesExt,
                                nu_quantidade: Math.round(mediaQuantidade),
                                vr_total: Math.round(mediaValor),
                                estoque_necessario: Math.round(mediaQuantidade * 1.1),
                                compras_necessarias: Math.max(0, Math.round(mediaQuantidade * 1.1) -
                                    (((_a = estoqueAtual.find(e => e.id_produto === idProduto)) === null || _a === void 0 ? void 0 : _a.nu_quantidade) || 0))
                            });
                        });
                    }
                }
                // 6. Agrupar resultados por mês/ano para retorno
                const resultadoAgrupado = mesesFuturos.map(({ mes, ano, mesExt }) => {
                    const previsoesMes = previsoes.filter(p => p.mes === mes && p.ano === ano);
                    return {
                        mes,
                        ano,
                        mesExt,
                        produtos: previsoesMes,
                        total_quantidade: previsoesMes.reduce((sum, p) => sum + p.nu_quantidade, 0),
                        total_valor: previsoesMes.reduce((sum, p) => sum + p.vr_total, 0),
                        total_estoque: previsoesMes.reduce((sum, p) => sum + p.estoque_necessario, 0),
                        total_compras: previsoesMes.reduce((sum, p) => sum + p.compras_necessarias, 0)
                    };
                });
                return {
                    result: "success",
                    message: 'Previsão calculada com sucesso',
                    data: {
                        previsoes: resultadoAgrupado,
                        produtos: produtos,
                        estoque_atual: estoqueAtual
                    }
                };
            }
            catch (error) {
                console.error('Erro em calculatorNextSixMonths:', error);
                return {
                    result: "error",
                    message: (error === null || error === void 0 ? void 0 : error.message) || 'Erro ao calcular previsão'
                };
            }
        });
    }
    // Funções auxiliares para normalização (devem estar no mesmo arquivo ou importadas)
    static normalizar(val, min, max) {
        return (val - min) / (max - min);
    }
    static desnormalizar(val, min, max) {
        return val * (max - min) + min;
    }
}
exports.default = BI;
