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
exports.denormalize = denormalize;
exports.predict = predict;
const tf = __importStar(require("@tensorflow/tfjs"));
function trainModel(data) {
    return __awaiter(this, void 0, void 0, function* () {
        // Verificação dos dados
        if (!data || data.length < 3) {
            throw new Error('São necessários pelo menos 3 meses de dados para treinamento');
        }
        // Função de normalização
        const normalize = (value, min, max) => {
            if (max === min)
                return 0.5; // Evita divisão por zero
            return (value - min) / (max - min);
        };
        // Extrair e calcular estatísticas
        const months = data.map(item => item.sequential_month);
        const quantities = data.map(item => item.quantity);
        const minMonth = Math.min(...months);
        const maxMonth = Math.max(...months);
        const minQuantity = Math.min(...quantities);
        const maxQuantity = Math.max(...quantities);
        try {
            // Preparar os dados de treino
            const xsData = data.map(item => [
                [normalize(item.sequential_month, minMonth, maxMonth)]
            ]);
            const ysData = data.map(item => normalize(item.quantity, minQuantity, maxQuantity));
            // Criar tensores
            const xs = tf.tensor3d(xsData, [data.length, 1, 1]);
            const ys = tf.tensor2d(ysData, [data.length, 1]);
            // Criar modelo
            const model = tf.sequential();
            model.add(tf.layers.lstm({
                units: 32,
                inputShape: [1, 1],
                activation: 'tanh'
            }));
            model.add(tf.layers.dense({ units: 1 }));
            // Compilar o modelo
            model.compile({
                optimizer: tf.train.adam(0.1),
                loss: 'meanSquaredError'
            });
            // Treinar o modelo
            yield model.fit(xs, ys, {
                epochs: 100,
                batchSize: 1,
                shuffle: false,
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
            console.error('Training error:', error);
            throw new Error('Failed to train model');
        }
    });
}
// Função para desnormalização
function denormalize(value, min, max) {
    return value * (max - min) + min;
}
// Função para fazer previsões
function predict(model, month, minMonth, maxMonth, minQuantity, maxQuantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const normalizedMonth = (month - minMonth) / (maxMonth - minMonth);
        const input = tf.tensor3d([[[normalizedMonth]]], [1, 1, 1]);
        const output = model.predict(input);
        const prediction = yield output.data();
        output.dispose();
        return denormalize(prediction[0], minQuantity, maxQuantity);
    });
}
