"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trainModel = trainModel;
const mlCart = require('ml-regression');
const SimpleLinearRegression = mlCart.SimpleLinearRegression;
function trainModel(data) {
    const X = data.map(d => d.mes_sequencial);
    const Y = data.map(d => d.nu_quantidade);
    const model = new SimpleLinearRegression(X, Y);
    return {
        predict: (x) => model.predict(x),
        coeficiente: model.slope,
        intercepto: model.intercept
    };
}
