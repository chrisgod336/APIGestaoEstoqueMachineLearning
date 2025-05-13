import * as tf from '@tensorflow/tfjs';

// Interface para os dados de treino
interface TrainingData {
  sequential_month: number;
  quantity: number;
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
  // Verificação dos dados
  if (!data || data.length < 3) {
    throw new Error('São necessários pelo menos 3 meses de dados para treinamento');
  }

  // Função de normalização
  const normalize = (value: number, min: number, max: number): number => {
    if (max === min) return 0.5; // Evita divisão por zero
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
    model.add(tf.layers.dense({units: 1}));

    // Compilar o modelo
    model.compile({
      optimizer: tf.train.adam(0.1),
      loss: 'meanSquaredError'
    });

    // Treinar o modelo
    await model.fit(xs, ys, {
      epochs: 100,
      batchSize: 1,
      shuffle: false,
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
    console.error('Training error:', error);
    throw new Error('Failed to train model');
  }
}

// Função para desnormalização
export function denormalize(value: number, min: number, max: number): number {
  return value * (max - min) + min;
}

// Função para fazer previsões
export async function predict(
  model: tf.LayersModel,
  month: number,
  minMonth: number,
  maxMonth: number,
  minQuantity: number,
  maxQuantity: number
): Promise<number> {
  const normalizedMonth = (month - minMonth) / (maxMonth - minMonth);
  const input = tf.tensor3d([[[normalizedMonth]]], [1, 1, 1]);
  const output = model.predict(input) as tf.Tensor;
  const prediction = await output.data();
  output.dispose();
  return denormalize(prediction[0], minQuantity, maxQuantity);
}