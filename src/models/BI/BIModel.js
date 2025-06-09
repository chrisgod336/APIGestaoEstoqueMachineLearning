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
const tensorflow_1 = require("../../services/tensorflow");
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
                const strProximos6Meses = `${proximos6Meses[0].mes}/${proximos6Meses[0].ano}, ${proximos6Meses[1].mes}/${proximos6Meses[1].ano}, ${proximos6Meses[2].mes}/${proximos6Meses[2].ano}, ${proximos6Meses[3].mes}/${proximos6Meses[3].ano}, ${proximos6Meses[4].mes}/${proximos6Meses[4].ano}, ${proximos6Meses[5].mes}/${proximos6Meses[5].ano}`;
                const queries = {
                    compra: `SELECT *, (SELECT tx_nome FROM tb_produto WHERE id_produto = tb_previsao_compra.id_produto) AS nome_produto 
                         FROM tb_previsao_compra WHERE id_produto IN (${query_produtos}) 
                         AND mes/ano IN (${strProximos6Meses})
                         ORDER BY mes, ano, id_produto`,
                    venda: `SELECT *, (SELECT tx_nome FROM tb_produto WHERE id_produto = tb_previsao_venda.id_produto) AS nome_produto 
                        FROM tb_previsao_venda WHERE id_produto IN (${query_produtos}) 
                        AND mes/ano IN (${strProximos6Meses})
                        ORDER BY mes, ano, id_produto`,
                    estoque: `SELECT *, (SELECT tx_nome FROM tb_produto WHERE id_produto = tb_previsao_estoque.id_produto) AS nome_produto 
                          FROM tb_previsao_estoque WHERE id_produto IN (${query_produtos}) 
                          AND mes/ano IN (${strProximos6Meses})
                          ORDER BY mes, ano, id_produto`
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
                         FROM tb_previsao_compra WHERE id_produto IN (${query_produtos}) 
                         AND mes/ano IN (${strProximos6Meses})
                         GROUP BY mes, ano ORDER BY mes, ano`,
                    venda: `SELECT mes, ano, SUM(nu_quantidade) AS nu_quantidade, SUM(vr_total) AS vr_total 
                        FROM tb_previsao_venda WHERE id_produto IN (${query_produtos}) 
                        AND mes/ano IN (${strProximos6Meses})
                        GROUP BY mes, ano ORDER BY mes, ano`,
                    estoque: `SELECT mes, ano, SUM(nu_quantidade) AS nu_quantidade, SUM(vr_total) AS vr_total 
                          FROM tb_previsao_estoque WHERE id_produto IN (${query_produtos}) 
                          AND mes/ano IN (${strProximos6Meses})
                          GROUP BY mes, ano ORDER BY mes, ano`
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
            console.log('══════════════════════════════════════════════════');
            console.log(' INICIANDO PROCESSO DE PREVISÃO PARA OS PRÓXIMOS 6 MESES ');
            console.log('══════════════════════════════════════════════════\n');
            // Iniciar transação
            yield app_1.db.run('BEGIN TRANSACTION');
            try {
                // 1. Obter dados históricos (mantido igual)
                console.log('🔍 FASE 1: OBTENÇÃO DE DADOS HISTÓRICOS');
                console.log('----------------------------------------');
                console.log('📊 Buscando dados de vendas históricas e estoque atual...');
                const startTime = Date.now();
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
                console.log(`✅ Dados obtidos em ${(Date.now() - startTime) / 1000}s`);
                console.log(`📦 Total de registros históricos: ${histData.length}`);
                console.log(`📦 Produtos com estoque atual: ${estoqueAtual.length}\n`);
                // 2. Processar dados para análise temporal (mantido igual)
                const produtos = [...new Set(histData.map(item => item.id_produto))];
                const previsoes = [];
                console.log('🔍 LISTA DE PRODUTOS PARA PREVISÃO:');
                console.table(produtos.map(p => ({ 'ID Produto': p })));
                // 3. Calcular próximos 6 meses (mantido igual)
                const dataAtual = new Date();
                const mesesFuturos = Array.from({ length: 6 }, (_, i) => {
                    const data = new Date(dataAtual);
                    data.setMonth(data.getMonth() + i + 1);
                    return {
                        mes: data.getMonth() + 1,
                        ano: data.getFullYear(),
                        mesExt: this.mesExt(data.getMonth() + 1),
                        mesSequencial: (data.getFullYear() * 12) + data.getMonth()
                    };
                });
                console.log('\n📅 PERÍODOS PARA PREVISÃO:');
                console.table(mesesFuturos.map(m => ({
                    Mês: m.mesExt,
                    Ano: m.ano,
                    'Mês Sequencial': m.mesSequencial
                })));
                // 4. Para cada produto, treinar modelo e fazer previsão (MODIFICADO)
                console.log('\n🔍 FASE 2: PROCESSAMENTO POR PRODUTO');
                console.log('-------------------------------------');
                for (const idProduto of produtos) {
                    const produtoStartTime = Date.now();
                    console.log(`\n🔄 Processando produto ${idProduto}...`);
                    const dadosProduto = histData
                        .filter(item => item.id_produto === idProduto)
                        .map(item => (Object.assign(Object.assign({}, item), { mes: parseInt(item.mes), ano: parseInt(item.ano), nu_quantidade: parseInt(item.nu_quantidade), vr_total: parseFloat(item.vr_total), mesSequencial: (parseInt(item.ano) * 12) + parseInt(item.mes) - 1 })))
                        .sort((a, b) => a.mesSequencial - b.mesSequencial);
                    console.log(`📈 Dados históricos do produto ${idProduto}:`);
                    console.table(dadosProduto.map(d => ({
                        Mês: d.mes,
                        Ano: d.ano,
                        Quantidade: d.nu_quantidade,
                        'Valor Total': d.vr_total
                    })));
                    let estoqueAtualProduto = Math.round(((_a = estoqueAtual.find(e => e.id_produto === idProduto)) === null || _a === void 0 ? void 0 : _a.nu_quantidade) || 0);
                    let previsaoAnterior = null;
                    // Fallback para produtos com poucos dados (mantido igual)
                    if (dadosProduto.length < 6) {
                        console.log(`⚠️  Produto ${idProduto} tem apenas ${dadosProduto.length} registros - usando método simplificado`);
                        this.previsaoSimplificada(idProduto, dadosProduto, mesesFuturos, estoqueAtualProduto, previsoes);
                        console.log(`⏱  Tempo processamento produto ${idProduto}: ${(Date.now() - produtoStartTime) / 1000}s`);
                        continue;
                    }
                    try {
                        console.log(`📈 Treinando modelo de regressão linear para produto ${idProduto}...`);
                        // Preparar dados para o modelo (simplificado)
                        const dadosTreino = dadosProduto.map(item => ({
                            mes_sequencial: item.mesSequencial,
                            nu_quantidade: item.nu_quantidade
                        }));
                        // Treinar o modelo (nova versão simplificada)
                        const model = (0, tensorflow_1.trainModel)(dadosTreino);
                        console.log(`✅ Modelo treinado para produto ${idProduto}`);
                        console.log(`📊 Coeficiente: ${model.coeficiente}, Intercepto: ${model.intercepto}`);
                        // Fazer previsões para cada mês futuro (simplificado)
                        console.log(`🔮 Gerando previsões para produto ${idProduto}...`);
                        for (const mesFuturo of mesesFuturos) {
                            const mesStartTime = Date.now();
                            // Fazer previsão diretamente com o modelo linear
                            let quantidade = model.predict(mesFuturo.mesSequencial);
                            // Ajustar sazonalidade (se houver dados suficientes)
                            if (dadosProduto.length >= 12) {
                                const historicoMes = dadosProduto.filter(item => item.mes === mesFuturo.mes);
                                if (historicoMes.length > 0) {
                                    const mediaMes = historicoMes.reduce((sum, item) => sum + item.nu_quantidade, 0) / historicoMes.length;
                                    // Combinar previsão linear (60%) com sazonalidade histórica (40%)
                                    quantidade = (quantidade * 0.6) + (mediaMes * 0.4);
                                    console.log(`🔄 Ajuste sazonal para ${mesFuturo.mesExt}/${mesFuturo.ano}: +40% média histórica`);
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
                            console.log(`📅 Previsão ${mesFuturo.mesExt}/${mesFuturo.ano}:`);
                            console.table([{
                                    'Quantidade Prevista': quantidade,
                                    'Valor Total Previsto': vrTotal,
                                    'Estoque Necessário': estoqueNecessario,
                                    'Compras Necessárias': comprasNecessarias,
                                    'Tempo Processamento': `${(Date.now() - mesStartTime)}ms`
                                }]);
                        }
                        console.log(`⏱  Tempo total produto ${idProduto}: ${(Date.now() - produtoStartTime) / 1000}s`);
                    }
                    catch (error) {
                        console.error(`❌ Erro no modelo para produto ${idProduto}:`, error);
                        console.log(`🔄 Usando método simplificado como fallback`);
                        this.previsaoSimplificada(idProduto, dadosProduto, mesesFuturos, estoqueAtualProduto, previsoes);
                    }
                }
                // 5. Agrupar resultados por mês (mantido igual)
                console.log('\n🔍 FASE 3: CONSOLIDAÇÃO DOS RESULTADOS');
                console.log('-------------------------------------');
                const resultadoAgrupado = this.agruparPorMeses(mesesFuturos, previsoes);
                console.log('\n📊 RESUMO DAS PREVISÕES:');
                resultadoAgrupado.forEach(mes => {
                    console.log(`\n📅 ${mes.mesExt}/${mes.ano}:`);
                    console.table(mes.produtos.map(p => ({
                        'ID Produto': p.id_produto,
                        'Quantidade': p.nu_quantidade,
                        'Valor Total': p.vr_total,
                        'Compras': p.compras_necessarias,
                        'Estoque': p.estoque_necessario
                    })));
                });
                // 6. Atualizar os dados consolidados (mantido igual)
                console.log('\n🔍 FASE 4: SALVAR NO BANCO DE DADOS');
                console.log('-----------------------------------------');
                // Calcular os próximos 6 meses que serão atualizados
                const mesesParaLimpar = Array.from({ length: 6 }, (_, i) => {
                    const data = new Date(dataAtual);
                    data.setMonth(data.getMonth() + i + 1);
                    return {
                        mes: data.getMonth() + 1,
                        ano: data.getFullYear()
                    };
                });
                console.log('🧹 Limpando previsões anteriores...', mesesParaLimpar.map(m => `${m.mes}/${m.ano}`).join(', '));
                // Limpar as três tabelas de forma atômica
                yield Promise.all([
                    app_1.db.run(`DELETE FROM tb_previsao_venda`),
                    app_1.db.run(`DELETE FROM tb_previsao_compra`),
                    app_1.db.run(`DELETE FROM tb_previsao_estoque`),
                    app_1.db.run(`DELETE FROM tb_previsao_venda;
                     DELETE FROM tb_previsao_compra;
                     DELETE FROM tb_previsao_estoque;`)
                ]);
                console.log('📝 Inserindo novas previsões...');
                const operacoesInsercao = [];
                for (const element of resultadoAgrupado) {
                    for (const produto of element.produtos) {
                        const { id_produto, mes, ano, nu_quantidade, vr_total, compras_necessarias, estoque_necessario } = produto;
                        const produtoInfo = yield app_1.db.get(`SELECT vr_preco_compra FROM tb_produto WHERE id_produto = ?`, id_produto);
                        if (produtoInfo) {
                            const vr_total_compra = produtoInfo.vr_preco_compra * compras_necessarias;
                            const vr_total_estoque = vr_total - vr_total_compra;
                            operacoesInsercao.push(app_1.db.run(`INSERT OR REPLACE INTO tb_previsao_venda(mes, ano, id_produto, nu_quantidade, vr_total)
                                 VALUES(?,?,?,?,?)`, [mes, ano, id_produto, nu_quantidade, vr_total]), app_1.db.run(`INSERT OR REPLACE INTO tb_previsao_compra(mes, ano, id_produto, nu_quantidade, vr_total)
                                 VALUES(?,?,?,?,?)`, [mes, ano, id_produto, compras_necessarias, vr_total_compra]), app_1.db.run(`INSERT OR REPLACE INTO tb_previsao_estoque(mes, ano, id_produto, nu_quantidade, vr_total)
                                 VALUES(?,?,?,?,?)`, [mes, ano, id_produto, estoque_necessario, vr_total_estoque]));
                        }
                    }
                }
                yield Promise.all(operacoesInsercao);
                yield app_1.db.run('COMMIT');
                console.log(`✅ ${operacoesInsercao.length} registros inseridos/atualizados com sucesso`);
                console.log('══════════════════════════════════════════════════');
                console.log(' PROCESSO DE PREVISÃO CONCLUÍDO COM SUCESSO ');
                console.log('══════════════════════════════════════════════════\n');
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
                console.error('\n❌❌❌ ERRO NO PROCESSO DE PREVISÃO ❌❌❌');
                console.error('Detalhes do erro:', error);
                console.error('Stack trace:', error.stack);
                console.log('\n══════════════════════════════════════════════════');
                console.log(' PROCESSO DE PREVISÃO FINALIZADO COM ERROS ');
                console.log('══════════════════════════════════════════════════\n');
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
}
exports.default = BI;
