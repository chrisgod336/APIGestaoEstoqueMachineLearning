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
exports.trainModel = trainModel;
const tf = __importStar(require("@tensorflow/tfjs"));
function trainModel(data) {
    return __awaiter(this, void 0, void 0, function* () {
        // Verificação robusta dos dados
        if (!data || data.length < 6) {
            throw new Error('São necessários pelo menos 6 meses de dados para treinamento');
        }
        // Ordenar por mes_sequencial
        data.sort((a, b) => a.mes_sequencial - b.mes_sequencial);
        // Extrair sequências temporais
        const months = data.map(item => item.mes_sequencial);
        const quantities = data.map(item => item.nu_quantidade);
        // Calcular estatísticas para normalização
        const minMonth = Math.min(...months);
        const maxMonth = Math.max(...months);
        const minQuantity = Math.min(...quantities);
        const maxQuantity = Math.max(...quantities);
        try {
            // Preparar dados de treino (sequências temporais)
            const xsData = data.map(item => [
                [(item.mes_sequencial - minMonth) / (maxMonth - minMonth)]
            ]);
            const ysData = data.map(item => (item.nu_quantidade - minQuantity) / (maxQuantity - minQuantity));
            // Criar tensores com formato adequado para LSTM [samples, timeSteps, features]
            const xs = tf.tensor3d(xsData, [xsData.length, 1, 1]);
            const ys = tf.tensor2d(ysData, [ysData.length, 1]);
            // Criar modelo LSTM mais sofisticado
            const model = tf.sequential();
            // Camada LSTM com mais neurônios e returnSequences
            model.add(tf.layers.lstm({
                units: 64,
                inputShape: [1, 1],
                returnSequences: false
            }));
            // Camadas densas para processamento adicional
            model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
            model.add(tf.layers.dense({ units: 1 }));
            // Compilar com otimizador e taxa de aprendizado ajustada
            model.compile({
                optimizer: tf.train.adam(0.01),
                loss: 'meanSquaredError',
                metrics: ['mae']
            });
            // Treinar com mais épocas e callbacks
            yield model.fit(xs, ys, {
                epochs: 200,
                batchSize: 1,
                shuffle: false,
                validationSplit: 0.2,
                callbacks: {
                    onEpochEnd: (epoch, logs) => {
                        console.log(`Epoch ${epoch}: loss = ${logs === null || logs === void 0 ? void 0 : logs.loss}`);
                    }
                }
            });
            // Liberar memória
            tf.dispose([xs, ys]);
            return {
                model,
                minMonth,
                maxMonth,
                minQuantity,
                maxQuantity
            };
        }
        catch (error) {
            console.error('Erro no treinamento:', error);
            throw new Error('Falha ao treinar modelo');
        }
    });
}
