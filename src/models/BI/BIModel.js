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
    static mesExt(mes) {
        const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
        return meses[mes - 1] || 'DES';
    }
    static adicionarMeses(data, meses) {
        const novaData = new Date(data);
        novaData.setMonth(novaData.getMonth() + meses);
        return { mes: novaData.getMonth() + 1, ano: novaData.getFullYear() };
    }
    static getNextSixMonths(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query_produtos = `
                SELECT id_produto
                FROM tb_previsao_venda
                GROUP BY id_produto
                ORDER BY SUM(nu_quantidade) DESC
                ${limit ? `LIMIT ${limit}` : ''}
            `;
                const dataAtual = new Date();
                const proximos6Meses = Array.from({ length: 6 }, (_, i) => {
                    const { mes, ano } = this.adicionarMeses(dataAtual, i + 1);
                    return { mes, ano, mesExt: this.mesExt(mes) };
                });
                const queries = {
                    compra: `SELECT *, (SELECT tx_nome FROM tb_produto WHERE id_produto = tb_previsao_compra.id_produto) AS nome_produto 
                         FROM tb_previsao_compra WHERE id_produto IN (${query_produtos}) ORDER BY mes, ano, id_produto`,
                    venda: `SELECT *, (SELECT tx_nome FROM tb_produto WHERE id_produto = tb_previsao_venda.id_produto) AS nome_produto 
                        FROM tb_previsao_venda WHERE id_produto IN (${query_produtos}) ORDER BY mes, ano, id_produto`,
                    estoque: `SELECT *, (SELECT tx_nome FROM tb_produto WHERE id_produto = tb_previsao_estoque.id_produto) AS nome_produto 
                          FROM tb_previsao_estoque WHERE id_produto IN (${query_produtos}) ORDER BY mes, ano, id_produto`
                };
                const [response_compra, response_venda, response_estoque] = yield Promise.all([
                    app_1.db.all(queries.compra),
                    app_1.db.all(queries.venda),
                    app_1.db.all(queries.estoque)
                ]);
                if (!response_compra.length || !response_venda.length || !response_estoque.length) {
                    throw new Error('Erros ao buscar os dados.');
                }
                const sumQueries = {
                    compra: `SELECT mes, ano, SUM(nu_quantidade) AS nu_quantidade, SUM(vr_total) AS vr_total 
                         FROM tb_previsao_compra WHERE id_produto IN (${query_produtos}) GROUP BY mes, ano ORDER BY mes, ano`,
                    venda: `SELECT mes, ano, SUM(nu_quantidade) AS nu_quantidade, SUM(vr_total) AS vr_total 
                        FROM tb_previsao_venda WHERE id_produto IN (${query_produtos}) GROUP BY mes, ano ORDER BY mes, ano`,
                    estoque: `SELECT mes, ano, SUM(nu_quantidade) AS nu_quantidade, SUM(vr_total) AS vr_total 
                          FROM tb_previsao_estoque WHERE id_produto IN (${query_produtos}) GROUP BY mes, ano ORDER BY mes, ano`
                };
                const [response_sum_compra, response_sum_venda, response_sum_estoque] = yield Promise.all([
                    app_1.db.all(sumQueries.compra),
                    app_1.db.all(sumQueries.venda),
                    app_1.db.all(sumQueries.estoque)
                ]);
                const processData = (data) => data.map(element => (Object.assign(Object.assign({}, element), { mesExt: this.mesExt(element.mes) })));
                return {
                    result: "success",
                    message: 'Dados encontrados com sucesso',
                    data: {
                        compra: processData(response_compra),
                        venda: processData(response_venda),
                        estoque: processData(response_estoque),
                        total_compra: processData(response_sum_compra),
                        total_venda: processData(response_sum_venda),
                        total_estoque: processData(response_sum_estoque)
                    }
                };
            }
            catch (error) {
                return {
                    result: "error",
                    message: (error === null || error === void 0 ? void 0 : error.message) || 'Erro ao buscar dados'
                };
            }
        });
    }
    static calculateNextSixMonths() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                // 1. Obter dados históricos
                const [histData, estoqueAtual] = yield Promise.all([
                    app_1.db.all(`
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
            `),
                    app_1.db.all(`SELECT id_produto, SUM(nu_quantidade) as nu_quantidade FROM tb_estoque GROUP BY id_produto;`)
                ]);
                // 2. Processar dados para análise temporal
                const produtos = [...new Set(histData.map(item => item.id_produto))];
                const previsoes = [];
                // 3. Calcular próximos 6 meses
                const dataAtual = new Date();
                const mesesFuturos = Array.from({ length: 6 }, (_, i) => {
                    const data = new Date(dataAtual);
                    data.setMonth(data.getMonth() + i + 1);
                    return {
                        mes: data.getMonth() + 1,
                        ano: data.getFullYear(),
                        mesExt: this.mesExt(data.getMonth() + 1),
                        mesSequencial: (data.getFullYear() * 12) + data.getMonth() // Sequência única de meses
                    };
                });
                // 4. Para cada produto, treinar modelo e fazer previsão
                for (const idProduto of produtos) {
                    const dadosProduto = histData
                        .filter(item => item.id_produto === idProduto)
                        .map(item => (Object.assign(Object.assign({}, item), { mes: parseInt(item.mes), ano: parseInt(item.ano), nu_quantidade: parseInt(item.nu_quantidade), vr_total: parseFloat(item.vr_total), mesSequencial: (parseInt(item.ano) * 12) + parseInt(item.mes) - 1 // Sequência única de meses
                     })))
                        .sort((a, b) => a.mesSequencial - b.mesSequencial);
                    let estoqueAtualProduto = Math.round(((_a = estoqueAtual.find(e => e.id_produto === idProduto)) === null || _a === void 0 ? void 0 : _a.nu_quantidade) || 0);
                    let previsaoAnterior = null;
                    // Fallback para produtos com poucos dados
                    if (dadosProduto.length < 6) {
                        this.previsaoSimplificada(idProduto, dadosProduto, mesesFuturos, estoqueAtualProduto, previsoes);
                        continue;
                    }
                    try {
                        // Preparar dados para o modelo LSTM
                        const dadosTreino = dadosProduto.map(item => ({
                            mes_sequencial: item.mesSequencial,
                            nu_quantidade: item.nu_quantidade,
                            vr_total: item.vr_total
                        }));
                        // Treinar o modelo
                        const { model, minMonth, maxMonth, minQuantity, maxQuantity } = yield (0, tensorflow_1.trainModel)(dadosTreino);
                        // Fazer previsões para cada mês futuro
                        for (const mesFuturo of mesesFuturos) {
                            // Normalizar o mês sequencial
                            const mesNormalizado = this.normalizar(mesFuturo.mesSequencial, minMonth, maxMonth);
                            // Fazer previsão
                            const input = tf.tensor3d([[[mesNormalizado]]], [1, 1, 1]);
                            const pred = model.predict(input);
                            const predData = yield pred.data();
                            // Desnormalizar a quantidade prevista
                            let quantidade = this.desnormalizar(predData[0], minQuantity, maxQuantity);
                            // Ajustar sazonalidade (se houver dados suficientes)
                            if (dadosProduto.length >= 12) {
                                const historicoMes = dadosProduto.filter(item => item.mes === mesFuturo.mes);
                                if (historicoMes.length > 0) {
                                    const mediaMes = historicoMes.reduce((sum, item) => sum + item.nu_quantidade, 0) / historicoMes.length;
                                    // Combinar previsão LSTM (60%) com sazonalidade histórica (40%)
                                    quantidade = (quantidade * 0.6) + (mediaMes * 0.4);
                                }
                            }
                            // Garantir valores inteiros e mínimos
                            quantidade = Math.max(1, Math.round(quantidade));
                            // Calcular valor total
                            const precoMedio = dadosProduto.reduce((sum, item) => sum + (item.vr_total / item.nu_quantidade), 0) / dadosProduto.length;
                            const vrTotal = Math.round(quantidade * precoMedio);
                            // Calcular estoque necessário (10% a mais que as vendas previstas)
                            const estoqueNecessario = Math.ceil(quantidade * 1.1);
                            // Calcular compras necessárias baseado no estoque atual
                            let comprasNecessarias = 0;
                            if (previsaoAnterior) {
                                // Estoque atual = estoque do mês anterior - vendas do mês anterior
                                const estoqueAtualizado = previsaoAnterior.estoque_necessario - previsaoAnterior.nu_quantidade;
                                comprasNecessarias = Math.max(0, estoqueNecessario - estoqueAtualizado);
                            }
                            else {
                                // Para o primeiro mês, usa o estoque inicial do banco de dados
                                comprasNecessarias = Math.max(0, estoqueNecessario - estoqueAtualProduto);
                            }
                            const previsaoAtual = {
                                id_produto: idProduto,
                                mes: mesFuturo.mes,
                                ano: mesFuturo.ano,
                                mesExt: mesFuturo.mesExt,
                                nu_quantidade: quantidade,
                                vr_total: vrTotal,
                                estoque_necessario: estoqueNecessario,
                                compras_necessarias: comprasNecessarias
                            };
                            previsoes.push(previsaoAtual);
                            previsaoAnterior = previsaoAtual;
                            // Liberar memória
                            input.dispose();
                            pred.dispose();
                        }
                        // Liberar modelo
                        model.dispose();
                    }
                    catch (error) {
                        console.error(`Erro no modelo para produto ${idProduto}:`, error);
                        this.previsaoSimplificada(idProduto, dadosProduto, mesesFuturos, estoqueAtualProduto, previsoes);
                    }
                }
                // 5. Agrupar resultados por mês
                const resultadoAgrupado = this.agruparPorMeses(mesesFuturos, previsoes);
                // 6. Atualizar os dados consolidados
                const query_delete_previtivo = `
        DELETE FROM tb_previsao_venda;
        DELETE FROM tb_previsao_compra;
        DELETE FROM tb_previsao_estoque;
        `;
                const query_venda_insert = `
        INSERT INTO tb_previsao_venda(mes, ano, id_produto, nu_quantidade, vr_total)
        VALUES(?,?,?,?,?);
        `;
                const query_compra_insert = `
        INSERT INTO tb_previsao_compra(mes, ano, id_produto, nu_quantidade, vr_total)
        VALUES(?,?,?,?,?);
        `;
                const query_estoque_insert = `
        INSERT INTO tb_previsao_estoque(mes, ano, id_produto, nu_quantidade, vr_total)
        VALUES(?,?,?,?,?);
        `;
                if (resultadoAgrupado.length) {
                    // Primeiro deleta todos os dados previstos antigos UMA ÚNICA VEZ
                    yield app_1.db.run(query_delete_previtivo);
                    // Array para armazenar todas as operações de inserção
                    const operacoesInsercao = [];
                    for (const element of resultadoAgrupado) {
                        for (const produto of element.produtos) {
                            const { id_produto, mes, ano, nu_quantidade, vr_total, compras_necessarias, estoque_necessario } = produto;
                            // Obter preço de compra do produto
                            const produtoInfo = yield app_1.db.get(`SELECT vr_preco_compra FROM tb_produto WHERE id_produto = ?`, id_produto);
                            if (!produtoInfo) {
                                console.error(`Produto ${id_produto} não encontrado`);
                                continue;
                            }
                            // Calcular valores
                            const vr_total_compra = produtoInfo.vr_preco_compra * compras_necessarias;
                            const vr_total_estoque = vr_total - vr_total_compra;
                            // Adicionar operações ao array
                            operacoesInsercao.push(app_1.db.run(query_venda_insert, [mes, ano, id_produto, nu_quantidade, vr_total]), app_1.db.run(query_compra_insert, [mes, ano, id_produto, compras_necessarias, vr_total_compra]), app_1.db.run(query_estoque_insert, [mes, ano, id_produto, estoque_necessario, vr_total_estoque]));
                        }
                    }
                    // Executar todas as inserções em paralelo
                    const resultados = yield Promise.all(operacoesInsercao);
                    // Logar resultados (opcional)
                    console.log('Inserções realizadas:', resultados.length);
                }
                return {
                    result: "success",
                    message: 'Previsão calculada com sucesso',
                    data: {
                        previsoes: resultadoAgrupado,
                        produtos,
                        estoque_atual: estoqueAtual
                    }
                };
            }
            catch (error) {
                console.error('Erro em calculateNextSixMonths:', error);
                return {
                    result: "error",
                    message: (error === null || error === void 0 ? void 0 : error.message) || 'Erro ao calcular previsão'
                };
            }
        });
    }
    // Método auxiliar atualizado para previsão simplificada
    static previsaoSimplificada(idProduto, dadosProduto, mesesFuturos, estoqueAtual, previsoes) {
        // Média dos últimos 3 meses com crescimento de 2% ao mês
        const ultimosMeses = dadosProduto.slice(-3);
        const base = ultimosMeses.length > 0 ?
            Math.round(ultimosMeses.reduce((sum, item) => sum + item.nu_quantidade, 0) / ultimosMeses.length) :
            1;
        const precoMedio = dadosProduto.length > 0 ?
            dadosProduto.reduce((sum, item) => sum + (item.vr_total / item.nu_quantidade), 0) / dadosProduto.length :
            1;
        let previsaoAnterior = null;
        mesesFuturos.forEach(({ mes, ano, mesExt }, i) => {
            const quantidade = Math.max(1, Math.round(base * Math.pow(1.02, i + 1)));
            const vrTotal = Math.round(quantidade * precoMedio);
            const estoqueNecessario = Math.ceil(quantidade * 1.1);
            let comprasNecessarias = 0;
            if (previsaoAnterior) {
                const estoqueAtualizado = previsaoAnterior.estoque_necessario - previsaoAnterior.nu_quantidade;
                comprasNecessarias = Math.max(0, estoqueNecessario - estoqueAtualizado);
            }
            else {
                comprasNecessarias = Math.max(0, estoqueNecessario - estoqueAtual);
            }
            const previsaoAtual = {
                id_produto: idProduto,
                mes,
                ano,
                mesExt,
                nu_quantidade: quantidade,
                vr_total: vrTotal,
                estoque_necessario: estoqueNecessario,
                compras_necessarias: comprasNecessarias
            };
            previsoes.push(previsaoAtual);
            previsaoAnterior = previsaoAtual;
        });
    }
    static agruparPorMeses(mesesFuturos, previsoes) {
        return mesesFuturos.map(({ mes, ano, mesExt }) => {
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
    }
    static normalizar(val, min, max) {
        return (val - min) / (max - min);
    }
    static desnormalizar(val, min, max) {
        return val * (max - min) + min;
    }
}
exports.default = BI;
