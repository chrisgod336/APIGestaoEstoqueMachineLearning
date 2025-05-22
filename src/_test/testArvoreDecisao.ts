const mlCart = require('ml-cart') as any;
const DecisionTree = mlCart.DecisionTreeRegression;

interface Registro {
  id_produto: number;
  mes: number;
  ano: number;
  nu_quantidade: number;
  mes_sequencial: number;
}

export async function ArvoreDecisao(db: any) {
  const inicio = Date.now();

  const histData:Array<any> = await db.all(`
    SELECT 
      p.id_produto,
      strftime('%m', v.dt_venda) as mes,
      strftime('%Y', v.dt_venda) as ano,
      SUM(p.nu_quantidade) as nu_quantidade
    FROM tb_venda_produto p
    JOIN tb_venda v ON p.id_venda = v.id_venda
    GROUP BY p.id_produto, mes, ano
    ORDER BY p.id_produto, ano, mes
  `);

  const produtos = [...new Set(histData.map(d => d.id_produto))];
  console.log(`🔍 Produtos encontrados: ${produtos.length}`);

  let somaMAE = 0, somaRMSE = 0, somaR2 = 0, totalAvaliacoes = 0;

  for (const id_produto of produtos) {
    const dadosProduto = histData
      .filter(d => d.id_produto === id_produto)
      .map(d => {
        const mes = parseInt(d.mes);
        const ano = parseInt(d.ano);
        return {
          ...d,
          mes,
          ano,
          nu_quantidade: parseInt(d.nu_quantidade.toString()),
          mes_sequencial: (ano * 12) + mes - 1
        };
      });

    if (dadosProduto.length < 12) continue;

    const dadosOrdenados = [...dadosProduto].sort((a, b) => a.mes_sequencial - b.mes_sequencial);
    const treino = dadosOrdenados.slice(0, -6);
    const teste = dadosOrdenados.slice(-6);

    try {
      const X = treino.map(d => [d.mes_sequencial]);
      const y = treino.map(d => d.nu_quantidade);

      const tree = new DecisionTree({ maxDepth: 10 });
      tree.train(X, y);

      const previsoes = teste.map(t => tree.predict([[t.mes_sequencial]]));
      const reais = teste.map(t => t.nu_quantidade);
      const erros = previsoes.map((p, i) => p - reais[i]);

      const mae = erros.reduce((s, e) => s + Math.abs(e), 0) / erros.length;
      const rmse = Math.sqrt(erros.reduce((s, e) => s + e ** 2, 0) / erros.length);
      const mediaReal = reais.reduce((s, r) => s + r, 0) / reais.length;
      const ssRes = erros.reduce((s, e) => s + e ** 2, 0);
      const ssTot = reais.reduce((s, r) => s + (r - mediaReal) ** 2, 0);
      const r2 = 1 - (ssRes / ssTot);

      somaMAE += mae;
      somaRMSE += rmse;
      somaR2 += r2;
      totalAvaliacoes++;

      console.table(teste.map((t, i) => ({
        Mês: `${t.mes}/${t.ano}`,
        Real: reais[i],
        Previsto: Math.round(previsoes[i]),
        Erro: Math.round(erros[i])
      })));

      console.log(`📈 MAE: ${mae.toFixed(2)} | RMSE: ${rmse.toFixed(2)} | R²: ${r2.toFixed(3)}`);
    } catch (e) {
      console.error(`❌ Erro ao avaliar produto ${id_produto}:`, e);
    }
  }

  const tempo = (Date.now() - inicio) / 1000;
  console.log(`⏱️ Tempo total: ${tempo.toFixed(2)} segundos`);

  if (totalAvaliacoes > 0) {
    console.log('\n📊 MÉTRICAS GLOBAIS:');
    console.log(`✅ MAE Médio:  ${(somaMAE / totalAvaliacoes).toFixed(2)}`);
    console.log(`✅ RMSE Médio: ${(somaRMSE / totalAvaliacoes).toFixed(2)}`);
    console.log(`✅ R² Médio:   ${(somaR2 / totalAvaliacoes).toFixed(3)}`);
  } else {
    console.log('⚠️ Nenhum produto com dados suficientes para avaliação.');
  }
}
