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
const db_1 = require("../../services/db");
class CompraProduto {
    constructor(id_compra_produto, id_compra, id_estoque, id_produto, nu_quantidade, vr_total) {
        this.id_compra_produto = id_compra_produto;
        this.id_compra = id_compra;
        this.id_estoque = id_estoque;
        this.id_produto = id_produto;
        this.nu_quantidade = nu_quantidade !== null && nu_quantidade !== void 0 ? nu_quantidade : 0;
        this.vr_total = vr_total !== null && vr_total !== void 0 ? vr_total : 0;
    }
    getIdCompraProduto() {
        return this.id_compra_produto;
    }
    getIdCompra() {
        return this.id_compra;
    }
    getIdProduto() {
        return this.id_produto;
    }
    getIdEstoque() {
        return this.id_estoque;
    }
    getNuQuantidade() {
        return this.nu_quantidade;
    }
    getVrTotal() {
        return this.vr_total;
    }
    static recalcularCompra(id_compra) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_sum = `SELECT COALESCE(SUM(vr_total),0) AS sum FROM tb_compra_produto WHERE id_compra = ?`;
                const values = [id_compra];
                const response = yield (0, db_1.query)(sql_sum, values);
                if (response.length === 0) {
                    return {
                        result: 'error',
                        message: 'Erro ao tentar somar os valores dos produtos da compra.'
                    };
                }
                const sum = response[0].sum;
                const sql_update = `UPDATE tb_compra SET vr_total = (? - vr_frete), vr_compra = ? WHERE id_compra = ?`;
                const values2 = [sum, sum, id_compra];
                const response2 = yield (0, db_1.query)(sql_update, values2);
                if (response2) {
                    return {
                        result: 'success',
                        message: 'Valor da compra recalculado com sucesso.'
                    };
                }
                else {
                    return {
                        result: 'error',
                        message: 'Erro ao tentar recalcular o valor da compra.'
                    };
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar recalcular o valor da compra.'
                };
            }
        });
    }
    static calculaValorTotal(id_produto, nu_quantidade) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_search = `SELECT vr_preco_compra FROM tb_produto WHERE id_produto = ?`;
                const values = [id_produto];
                const response = yield (0, db_1.query)(sql_search, values);
                if (response.length === 0) {
                    return {
                        result: 'error',
                        message: 'Erro ao tentar calcular o valor total do item.'
                    };
                }
                const vr_preco_compra = response[0].vr_preco_compra;
                return {
                    result: 'success',
                    message: 'Valor total calculado com sucesso.',
                    data: vr_preco_compra * nu_quantidade
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar calcular o valor total do item.'
                };
            }
        });
    }
    static criarCompraProduto(id_compra, id_estoque, id_produto, nu_quantidade) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const calcula_vr_total = yield this.calculaValorTotal(id_produto, nu_quantidade);
                if (calcula_vr_total.result === 'error') {
                    return {
                        result: 'error',
                        message: (_a = calcula_vr_total === null || calcula_vr_total === void 0 ? void 0 : calcula_vr_total.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar adicionar item a compra.'
                    };
                }
                const vr_total = calcula_vr_total.data;
                const sql_insert = `
                INSERT INTO tb_venda_produto(id_compra, id_estoque, id_produto, nu_quantidade, vr_total)
                VALUES ($1, $2, $3, $4, $5) RETURNING id_compra_produto
            `;
                const response = yield (0, db_1.query)(sql_insert, [id_compra, id_estoque, id_produto, nu_quantidade, vr_total]);
                if ((response === null || response === void 0 ? void 0 : response.length) > 0) {
                    const recalcular = yield this.recalcularCompra(id_compra);
                    if ((recalcular === null || recalcular === void 0 ? void 0 : recalcular.result) !== 'success') {
                        return {
                            result: 'error',
                            message: (_b = recalcular === null || recalcular === void 0 ? void 0 : recalcular.message) !== null && _b !== void 0 ? _b : 'Erro ao tentar recalcular valor da compra.'
                        };
                    }
                    return {
                        result: 'success',
                        message: 'Item adicionado a compra com sucesso',
                        data: new CompraProduto(response[0].id_compra_produto, id_compra, id_estoque, id_produto, nu_quantidade, vr_total)
                    };
                }
                else {
                    throw new Error('Erro ao tentar adicionar item a compra.');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_c = error === null || error === void 0 ? void 0 : error.message) !== null && _c !== void 0 ? _c : 'Erro ao tentar adicionar item a compra.'
                };
            }
        });
    }
    static buscarCompraProduto(id_compra, id_compra_produto) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_search = id_compra_produto
                    ? `SELECT * FROM tb_compra_produto WHERE id_compra = $1 AND id_compra_produto = $2`
                    : `SELECT * FROM tb_compra_produto WHERE id_compra = $1 ORDER BY id_compra`;
                const response = yield (0, db_1.query)(sql_search, id_compra_produto ? [id_compra, id_compra_produto] : [id_compra]);
                if ((response === null || response === void 0 ? void 0 : response.length) > 0) {
                    return {
                        result: 'success',
                        message: 'Item(ns) da compra encontrado(s) com sucesso',
                        data: response
                    };
                }
                else {
                    throw new Error('Erro ao tentar buscar item(ns) da compra(s).');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar buscar item(ns) da compra(s).'
                };
            }
        });
    }
    atualizarCompraProduto(id_estoque, id_produto, nu_quantidade) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const calcula_vr_total = yield CompraProduto.calculaValorTotal(id_produto, nu_quantidade);
            if (calcula_vr_total.result === 'error') {
                return {
                    result: 'error',
                    message: (_a = calcula_vr_total === null || calcula_vr_total === void 0 ? void 0 : calcula_vr_total.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar adicionar item a compra.'
                };
            }
            const vr_total = calcula_vr_total.data;
            try {
                const sql_update = `
                UPDATE tb_compra_produto
                    id_estoque = $1,
                    id_produto = $2,
                    nu_quantidade = $3,
                    vr_total = $4
                    WHERE id_compra = $5
                    AND id_compra_produto = $6;
            `;
                const response = yield (0, db_1.query)(sql_update, [id_estoque, id_produto, nu_quantidade, vr_total, this.id_compra, this.id_compra_produto]);
                if (response) {
                    this.id_estoque = id_estoque;
                    this.id_produto = id_produto;
                    this.nu_quantidade = nu_quantidade;
                    this.vr_total = vr_total;
                    const recalcular = yield CompraProduto.recalcularCompra(this.id_compra);
                    if ((recalcular === null || recalcular === void 0 ? void 0 : recalcular.result) !== 'success') {
                        return {
                            result: 'error',
                            message: (_b = recalcular === null || recalcular === void 0 ? void 0 : recalcular.message) !== null && _b !== void 0 ? _b : 'Erro ao tentar recalcular valor da compra.'
                        };
                    }
                    return {
                        result: 'success',
                        message: 'Item da compra atualizados com sucesso'
                    };
                }
                else {
                    throw new Error('Erro ao tentar atualizar item da compra.');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_c = error === null || error === void 0 ? void 0 : error.message) !== null && _c !== void 0 ? _c : 'Erro ao tentar atualizar item da compra.'
                };
            }
        });
    }
    deletarCompraProduto() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const sql_delete = `DELETE FROM tb_compra_produto WHERE id_compra = $1 AND id_compra_produto = $2;`;
                const response = yield (0, db_1.query)(sql_delete, [this.id_compra, this.id_compra_produto]);
                if (response) {
                    const recalcular = yield CompraProduto.recalcularCompra(this.id_compra);
                    if ((recalcular === null || recalcular === void 0 ? void 0 : recalcular.result) !== 'success') {
                        return {
                            result: 'error',
                            message: (_a = recalcular === null || recalcular === void 0 ? void 0 : recalcular.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar recalcular valor da compra.'
                        };
                    }
                    return {
                        result: 'success',
                        message: 'Item da compra deletado com sucesso'
                    };
                }
                else {
                    throw new Error('Erro ao tentar deletar item da compra.');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : 'Erro ao tentar deletar compra.'
                };
            }
        });
    }
}
exports.default = CompraProduto;
