import * as tf from '@tensorflow/tfjs';

// Interface para os dados de treino
interface TrainingData {
  mes_sequencial: number;
  nu_quantidade: number;
}

// Interface para o modelo treinado
export interface TrainedModel {
  model: tf.LayersModel;
  minMonth: number;  
  maxMonth: number;
  minQuantity: number;
  maxQuantity: number;
}

export async function trainModel(data: TrainingData[]): Promise<TrainedModel> {
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
        
        const ysData = data.map(item => 
            (item.nu_quantidade - minQuantity) / (maxQuantity - minQuantity)
        );

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
        model.add(tf.layers.dense({units: 32, activation: 'relu'}));
        model.add(tf.layers.dense({units: 1}));

        // Compilar com otimizador e taxa de aprendizado ajustada
        model.compile({
            optimizer: tf.train.adam(0.01),
            loss: 'meanSquaredError',
            metrics: ['mae']
        });

        // Treinar com mais épocas e callbacks
        await model.fit(xs, ys, {
            epochs: 200,
            batchSize: 1,
            shuffle: false,
            validationSplit: 0.2,
            callbacks: {
                onEpochEnd: (epoch, logs) => {
                    console.log(`Epoch ${epoch}: loss = ${logs?.loss}`);
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
    } catch (error) {
        console.error('Erro no treinamento:', error);
        throw new Error('Falha ao treinar modelo');
    }
}