import { db } from "../../../app";
import { trainModel } from "../../services/tensorflow";
import * as tf from '@tensorflow/tfjs';

interface MinMax {
  minMes: number;
  maxMes: number;
  minQuant: number;
  maxQuant: number;
}

interface Previsao {
  id_produto: number;
  mes: number;
  ano: number;
  mesExt: string;
  nu_quantidade: number;
  vr_total: number;
  estoque_necessario: number;
  compras_necessarias: number;
}

interface ResultadoMensal {
  mes: number;
  ano: number;
  mesExt: string;
  produtos: Previsao[];
  total_quantidade: number;
  total_valor: number;
  total_estoque: number;
  total_compras: number;
}

interface DadosTreino {
  mes_sequencial: number;
  nu_quantidade: number;
  vr_total?: number;
}

class BI {
    private mes: number;
    private ano: number;
    private id_produto: number;
    private nu_quantidade: number;
    private vr_total: number;

    constructor(
        mes: number,
        ano: number,
        id_produto: number,
        nu_quantidade: number,
        vr_total: number
    ) {
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

    private static mesExt(mes: number): string {
        const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
        return meses[mes - 1] || 'DES';
    }

    private static adicionarMeses(data: Date, meses: number): { mes: number, ano: number } {
        const novaData = new Date(data);
        novaData.setMonth(novaData.getMonth() + meses);
        return { mes: novaData.getMonth() + 1, ano: novaData.getFullYear() };
    }

    public static async getNextSixMonths(limit?: number): Promise<object> {
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

            const [response_compra, response_venda, response_estoque] = await Promise.all([
                db.all(queries.compra),
                db.all(queries.venda),
                db.all(queries.estoque)
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

            const [response_sum_compra, response_sum_venda, response_sum_estoque] = await Promise.all([
                db.all(sumQueries.compra),
                db.all(sumQueries.venda),
                db.all(sumQueries.estoque)
            ]);

            const processData = (data: any[]) => data.map(element => ({
                ...element,
                mesExt: this.mesExt(element.mes)
            }));

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
        } catch (error: any) {
            return {
                result: "error",
                message: error?.message || 'Erro ao buscar dados'
            };
        }
    }


public static async calculateNextSixMonths() {
    console.log('══════════════════════════════════════════════════');
    console.log(' INICIANDO PROCESSO DE PREVISÃO PARA OS PRÓXIMOS 6 MESES ');
    console.log('══════════════════════════════════════════════════\n');

    try {
        // 1. Obter dados históricos
        console.log('🔍 FASE 1: OBTENÇÃO DE DADOS HISTÓRICOS');
        console.log('----------------------------------------');
        console.log('📊 Buscando dados de vendas históricas e estoque atual...');
        
        const startTime = Date.now();
        const [histData, estoqueAtual] = await Promise.all([
            db.all(`
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
            db.all(`SELECT id_produto, SUM(nu_quantidade) as nu_quantidade FROM tb_estoque GROUP BY id_produto;`)
        ]);

        console.log(`✅ Dados obtidos em ${(Date.now() - startTime)/1000}s`);
        console.log(`📦 Total de registros históricos: ${histData.length}`);
        console.log(`📦 Produtos com estoque atual: ${estoqueAtual.length}\n`);

        // 2. Processar dados para análise temporal
        const produtos = [...new Set(histData.map(item => item.id_produto))];
        const previsoes: Previsao[] = [];

        console.log('🔍 LISTA DE PRODUTOS PARA PREVISÃO:');
        console.table(produtos.map(p => ({ 'ID Produto': p })));

        // 3. Calcular próximos 6 meses
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

        // 4. Para cada produto, treinar modelo e fazer previsão
        console.log('\n🔍 FASE 2: PROCESSAMENTO POR PRODUTO');
        console.log('-------------------------------------');
        
        for (const idProduto of produtos) {
            const produtoStartTime = Date.now();
            console.log(`\n🔄 Processando produto ${idProduto}...`);

            const dadosProduto = histData
                .filter(item => item.id_produto === idProduto)
                .map(item => ({
                    ...item,
                    mes: parseInt(item.mes),
                    ano: parseInt(item.ano),
                    nu_quantidade: parseInt(item.nu_quantidade),
                    vr_total: parseFloat(item.vr_total),
                    mesSequencial: (parseInt(item.ano) * 12) + parseInt(item.mes) - 1 
                }))
                .sort((a, b) => a.mesSequencial - b.mesSequencial);

            console.log(`📈 Dados históricos do produto ${idProduto}:`);
            console.table(dadosProduto.map(d => ({
                Mês: d.mes,
                Ano: d.ano,
                Quantidade: d.nu_quantidade,
                'Valor Total': d.vr_total
            })));

            let estoqueAtualProduto = Math.round(estoqueAtual.find(e => e.id_produto === idProduto)?.nu_quantidade || 0);
            let previsaoAnterior: Previsao | null = null;

            // Fallback para produtos com poucos dados
            if (dadosProduto.length < 6) {
                console.log(`⚠️  Produto ${idProduto} tem apenas ${dadosProduto.length} registros - usando método simplificado`);
                this.previsaoSimplificada(idProduto, dadosProduto, mesesFuturos, estoqueAtualProduto, previsoes);
                console.log(`⏱  Tempo processamento produto ${idProduto}: ${(Date.now() - produtoStartTime)/1000}s`);
                continue;
            }

            try {
                console.log(`🧠 Treinando modelo LSTM para produto ${idProduto}...`);

                // Preparar dados para o modelo LSTM
                const dadosTreino = dadosProduto.map(item => ({
                    mes_sequencial: item.mesSequencial,
                    nu_quantidade: item.nu_quantidade,
                    vr_total: item.vr_total
                }));

                // Treinar o modelo
                const { model, minMonth, maxMonth, minQuantity, maxQuantity } = await trainModel(dadosTreino);
                console.log(`✅ Modelo treinado para produto ${idProduto}`);

                // Fazer previsões para cada mês futuro
                console.log(`🔮 Gerando previsões para produto ${idProduto}...`);
                
                for (const mesFuturo of mesesFuturos) {
                    const mesStartTime = Date.now();
                    
                    // Normalizar o mês sequencial
                    const mesNormalizado = this.normalizar(mesFuturo.mesSequencial, minMonth, maxMonth);
                    
                    // Fazer previsão
                    const input = tf.tensor3d([[[mesNormalizado]]], [1, 1, 1]);
                    const pred = model.predict(input) as tf.Tensor;
                    const predData = await pred.data();
                    
                    // Desnormalizar a quantidade prevista
                    let quantidade = this.desnormalizar(predData[0], minQuantity, maxQuantity);
                    
                    // Ajustar sazonalidade (se houver dados suficientes)
                    if (dadosProduto.length >= 12) {
                        const historicoMes = dadosProduto.filter(item => item.mes === mesFuturo.mes);
                        if (historicoMes.length > 0) {
                            const mediaMes = historicoMes.reduce((sum, item) => sum + item.nu_quantidade, 0) / historicoMes.length;
                            // Combinar previsão LSTM (60%) com sazonalidade histórica (40%)
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
                    } else {
                        // Para o primeiro mês, usa o estoque inicial do banco de dados
                        comprasNecessarias = Math.max(0, estoqueNecessario - estoqueAtualProduto);
                    }

                    const previsaoAtual: Previsao = {
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

                    // Liberar memória
                    input.dispose();
                    pred.dispose();
                }

                // Liberar modelo
                model.dispose();
                console.log(`⏱  Tempo total produto ${idProduto}: ${(Date.now() - produtoStartTime)/1000}s`);
            } catch (error) {
                console.error(`❌ Erro no modelo para produto ${idProduto}:`, error);
                console.log(`🔄 Usando método simplificado como fallback`);
                this.previsaoSimplificada(idProduto, dadosProduto, mesesFuturos, estoqueAtualProduto, previsoes);
            }
        }

        // 5. Agrupar resultados por mês
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

        // 6. Atualizar os dados consolidados
        console.log('\n🔍 FASE 4: PERSISTÊNCIA NO BANCO DE DADOS');
        console.log('-----------------------------------------');
        
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
            console.log('🧹 Limpando previsões anteriores...');
            await db.run(query_delete_previtivo);
            
            console.log('📝 Inserindo novas previsões...');
            const operacoesInsercao = [];
            let totalInsercoes = 0;
            
            for (const element of resultadoAgrupado) {
                for (const produto of element.produtos) {
                    const { id_produto, mes, ano, nu_quantidade, vr_total, compras_necessarias, estoque_necessario } = produto;
                    
                    // Obter preço de compra do produto
                    const produtoInfo = await db.get(`SELECT vr_preco_compra FROM tb_produto WHERE id_produto = ?`, id_produto);
                    if (!produtoInfo) {
                        console.error(`❌ Produto ${id_produto} não encontrado`);
                        continue;
                    }
                    
                    // Calcular valores
                    const vr_total_compra = produtoInfo.vr_preco_compra * compras_necessarias;
                    const vr_total_estoque = vr_total - vr_total_compra;
                    
                    // Adicionar operações ao array
                    operacoesInsercao.push(
                        db.run(query_venda_insert, [mes, ano, id_produto, nu_quantidade, vr_total]),
                        db.run(query_compra_insert, [mes, ano, id_produto, compras_necessarias, vr_total_compra]),
                        db.run(query_estoque_insert, [mes, ano, id_produto, estoque_necessario, vr_total_estoque])
                    );
                    totalInsercoes += 3;
                }
            }
            
            // Executar todas as inserções em paralelo
            const resultados = await Promise.all(operacoesInsercao);
            
            console.log(`✅ ${totalInsercoes} registros inseridos com sucesso`);
        }

        console.log('\n══════════════════════════════════════════════════');
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

    } catch (error: any) {
        console.error('\n❌❌❌ ERRO NO PROCESSO DE PREVISÃO ❌❌❌');
        console.error('Detalhes do erro:', error);
        console.error('Stack trace:', error.stack);
        console.log('\n══════════════════════════════════════════════════');
        console.log(' PROCESSO DE PREVISÃO FINALIZADO COM ERROS ');
        console.log('══════════════════════════════════════════════════\n');

        return {
            result: "error",
            message: error?.message || 'Erro ao calcular previsão'
        };
    }
}

// Método auxiliar atualizado para previsão simplificada
private static previsaoSimplificada(idProduto: number, dadosProduto: any[], mesesFuturos: any[], estoqueAtual: number, previsoes: Previsao[]) {
    // Média dos últimos 3 meses com crescimento de 2% ao mês
    const ultimosMeses = dadosProduto.slice(-3);
    const base = ultimosMeses.length > 0 ?
        Math.round(ultimosMeses.reduce((sum, item) => sum + item.nu_quantidade, 0) / ultimosMeses.length) :
        1;
    const precoMedio = dadosProduto.length > 0 ?
        dadosProduto.reduce((sum, item) => sum + (item.vr_total / item.nu_quantidade), 0) / dadosProduto.length :
        1;

    let previsaoAnterior: Previsao | null = null;

    mesesFuturos.forEach(({ mes, ano, mesExt }, i) => {
        const quantidade = Math.max(1, Math.round(base * Math.pow(1.02, i + 1)));
        const vrTotal = Math.round(quantidade * precoMedio);
        const estoqueNecessario = Math.ceil(quantidade * 1.1);
        
        let comprasNecessarias = 0;
        if (previsaoAnterior) {
            const estoqueAtualizado = previsaoAnterior.estoque_necessario - previsaoAnterior.nu_quantidade;
            comprasNecessarias = Math.max(0, estoqueNecessario - estoqueAtualizado);
        } else {
            comprasNecessarias = Math.max(0, estoqueNecessario - estoqueAtual);
        }

        const previsaoAtual: Previsao = {
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

private static agruparPorMeses(mesesFuturos: any[], previsoes: Previsao[]): ResultadoMensal[] {
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

    private static normalizar(val: number, min: number, max: number): number {
        return (val - min) / (max - min);
    }

    private static desnormalizar(val: number, min: number, max: number): number {
        return val * (max - min) + min;
    }
}

export default BI;