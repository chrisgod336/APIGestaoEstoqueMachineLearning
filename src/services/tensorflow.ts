const mlCart = require('ml-regression') as any;
const SimpleLinearRegression = mlCart.SimpleLinearRegression;

export function trainModel(data: { mes_sequencial: number, nu_quantidade: number }[]) {
  const X = data.map(d => d.mes_sequencial);
  const Y = data.map(d => d.nu_quantidade);

  const model = new SimpleLinearRegression(X, Y);

  return {
    predict: (x: number) => model.predict(x),
    coeficiente: model.slope,
    intercepto: model.intercept
  };
}
