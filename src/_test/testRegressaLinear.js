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
exports.RegressaoLinear = RegressaoLinear;
const tf = __importStar(require("@tensorflow/tfjs"));
const tensorflow_1 = require("../services/tensorflow");
function RegressaoLinear(db) {
    return __awaiter(this, void 0, void 0, function* () {
        const inicio = Date.now();
        const histData = yield db.all(`
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
        // Acumuladores para métricas totais
        let somaMAE = 0;
        let somaRMSE = 0;
        let somaR2 = 0;
        let totalAvaliacoes = 0;
        for (const id_produto of produtos) {
            console.log(`\n🧠 Avaliando produto ${id_produto}...`);
            const dadosProduto = histData
                .filter(d => d.id_produto === id_produto)
                .map(d => {
                const mes = parseInt(d.mes);
                const ano = parseInt(d.ano);
                return Object.assign(Object.assign({}, d), { mes,
                    ano, nu_quantidade: parseInt(d.nu_quantidade.toString()), mes_sequencial: (ano * 12) + mes - 1 });
            });
            if (dadosProduto.length < 12) {
                console.log(`⚠️ Produto com poucos dados (${dadosProduto.length} registros), ignorado`);
                continue;
            }
            const dadosOrdenados = [...dadosProduto].sort((a, b) => a.mes_sequencial - b.mes_sequencial);
            const treino = dadosOrdenados.slice(0, -6);
            const teste = dadosOrdenados.slice(-6);
            try {
                const { model, minMonth, maxMonth, minQuantity, maxQuantity } = yield (0, tensorflow_1.trainModel)(treino.map(d => ({
                    mes_sequencial: d.mes_sequencial,
                    nu_quantidade: d.nu_quantidade
                })));
                const previsoes = [];
                for (const item of teste) {
                    const normalizado = (item.mes_sequencial - minMonth) / (maxMonth - minMonth);
                    const input = tf.tensor3d([[[normalizado]]], [1, 1, 1]);
                    const pred = model.predict(input);
                    const valor = (yield pred.data())[0];
                    const desnormalizado = valor * (maxQuantity - minQuantity) + minQuantity;
                    previsoes.push(desnormalizado);
                    input.dispose();
                    pred.dispose();
                }
                const reais = teste.map(d => d.nu_quantidade);
                const erros = previsoes.map((p, i) => p - reais[i]);
                const mae = erros.reduce((s, e) => s + Math.abs(e), 0) / erros.length;
                const rmse = Math.sqrt(erros.reduce((s, e) => s + e ** 2, 0) / erros.length);
                const mediaReal = reais.reduce((s, r) => s + r, 0) / reais.length;
                const ssRes = erros.reduce((s, e) => s + e ** 2, 0);
                const ssTot = reais.reduce((s, r) => s + (r - mediaReal) ** 2, 0);
                const r2 = 1 - (ssRes / ssTot);
                // Acumular métricas globais
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
                console.log(`✅ Produto ${id_produto} avaliado com sucesso`);
                model.dispose();
            }
            catch (error) {
                console.error(`❌ Erro ao avaliar produto ${id_produto}:`, error);
            }
        }
        const tempo = (Date.now() - inicio) / 1000;
        console.log(`\n⏱️ Tempo total: ${tempo.toFixed(2)} segundos`);
        // Exibir métricas totais (média entre os produtos avaliados)
        if (totalAvaliacoes > 0) {
            const mediaMAE = somaMAE / totalAvaliacoes;
            const mediaRMSE = somaRMSE / totalAvaliacoes;
            const mediaR2 = somaR2 / totalAvaliacoes;
            console.log('\n📊 MÉTRICAS GLOBAIS (médias dos produtos avaliados):');
            console.log(`✅ MAE Médio:  ${mediaMAE.toFixed(2)}`);
            console.log(`✅ RMSE Médio: ${mediaRMSE.toFixed(2)}`);
            console.log(`✅ R² Médio:   ${mediaR2.toFixed(3)}`);
        }
        else {
            console.log('⚠️ Nenhum produto com dados suficientes para avaliação.');
        }
    });
}
