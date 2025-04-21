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
const app_1 = require("../../../app");
class VendaProduto {
    constructor(id_venda_produto, id_venda, id_estoque, id_produto, nu_quantidade, vr_total) {
        this.id_venda_produto = id_venda_produto;
        this.id_venda = id_venda;
        this.id_estoque = id_estoque;
        this.id_produto = id_produto;
        this.nu_quantidade = nu_quantidade !== null && nu_quantidade !== void 0 ? nu_quantidade : 0;
        this.vr_total = vr_total !== null && vr_total !== void 0 ? vr_total : 0;
    }
    getIdVendaProduto() {
        return this.id_venda_produto;
    }
    getIdVenda() {
        return this.id_venda;
    }
    getIdEstoque() {
        return this.id_estoque;
    }
    getIdProduto() {
        return this.id_produto;
    }
    getNuQuantidade() {
        return this.nu_quantidade;
    }
    getVrTotal() {
        return this.vr_total;
    }
    static recalcularVenda(id_venda) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const sql_sum = `SELECT COALESCE(SUM(vr_total),0) AS sum FROM tb_venda_produto WHERE id_venda = ?`;
                const response = yield app_1.db.get(sql_sum, [id_venda]);
                const sum = (_a = response === null || response === void 0 ? void 0 : response.sum) !== null && _a !== void 0 ? _a : 0;
                yield app_1.db.run('UPDATE tb_venda SET vr_venda = ? WHERE id_venda = ?', [sum, id_venda]);
                return {
                    result: 'success',
                    message: 'Valor da venda recalculado com sucesso.'
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : 'Erro ao tentar recalcular o valor da venda.'
                };
            }
        });
    }
    static calculaValorTotal(id_produto, nu_quantidade) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield app_1.db.get('SELECT vr_preco_venda FROM tb_produto WHERE id_produto = ?', [id_produto]);
                if (!response) {
                    return {
                        result: 'error',
                        message: 'Produto não encontrado'
                    };
                }
                const vr_preco_venda = response.vr_preco_venda;
                const total = vr_preco_venda * nu_quantidade;
                return {
                    result: 'success',
                    message: 'Valor total calculado com sucesso.',
                    data: total
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
    static criarVendaProduto(id_venda, id_estoque, id_produto, nu_quantidade) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const calcula_vr_total = yield this.calculaValorTotal(id_produto, nu_quantidade);
                if (!calcula_vr_total) {
                    return calcula_vr_total;
                }
                const vr_total = calcula_vr_total === null || calcula_vr_total === void 0 ? void 0 : calcula_vr_total.data;
                const result = yield app_1.db.run(`INSERT INTO tb_venda_produto(
                    id_venda, id_estoque, 
                    id_produto, nu_quantidade, vr_total
                ) VALUES (?, ?, ?, ?, ?)`, [id_venda, id_estoque, id_produto, nu_quantidade, vr_total]);
                if (result.lastID) {
                    const recalcular = yield this.recalcularVenda(id_venda);
                    if (recalcular) {
                        return recalcular;
                    }
                    return {
                        result: 'success',
                        message: 'Item adicionado a venda com sucesso',
                        data: new VendaProduto(result.lastID, id_venda, id_estoque, id_produto, nu_quantidade, vr_total)
                    };
                }
                throw new Error('Falha ao adicionar item à venda');
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar adicionar item a venda.'
                };
            }
        });
    }
    static buscarVendaProduto(id_venda, id_venda_produto) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                let sql;
                let params;
                if (id_venda_produto) {
                    sql = `SELECT * FROM tb_venda_produto WHERE id_venda = ? AND id_venda_produto = ?`;
                    params = [id_venda, id_venda_produto];
                }
                else {
                    sql = `SELECT * FROM tb_venda_produto WHERE id_venda = ? ORDER BY id_venda_produto`;
                    params = [id_venda];
                }
                const response = yield app_1.db.all(sql, params);
                return {
                    result: 'success',
                    message: response.length > 0
                        ? 'Item(ns) da venda encontrado(s) com sucesso'
                        : id_venda_produto ? 'Item não encontrado' : 'Nenhum item encontrado',
                    data: response.length > 0 ? response : null
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar buscar item(ns) da venda.'
                };
            }
        });
    }
    atualizarVendaProduto(id_estoque, id_produto, nu_quantidade) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const calcula_vr_total = yield VendaProduto.calculaValorTotal(id_produto, nu_quantidade);
                if (!calcula_vr_total) {
                    return calcula_vr_total;
                }
                const vr_total = calcula_vr_total === null || calcula_vr_total === void 0 ? void 0 : calcula_vr_total.data;
                const result = yield app_1.db.run(`UPDATE tb_venda_produto
                SET id_estoque = ?,
                    id_produto = ?,
                    nu_quantidade = ?,
                    vr_total = ?
                WHERE id_venda = ?
                AND id_venda_produto = ?`, [id_estoque, id_produto, nu_quantidade, vr_total, this.id_venda, this.id_venda_produto]);
                if (result) {
                    this.id_estoque = id_estoque;
                    this.id_produto = id_produto;
                    this.nu_quantidade = nu_quantidade;
                    this.vr_total = vr_total;
                    const recalcular = yield VendaProduto.recalcularVenda(this.id_venda);
                    if (recalcular) {
                        return recalcular;
                    }
                    return {
                        result: 'success',
                        message: 'Item da venda atualizado com sucesso'
                    };
                }
                throw new Error('Nenhum item foi atualizado');
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar atualizar item da venda.'
                };
            }
        });
    }
    deletarVendaProduto() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = yield app_1.db.run('DELETE FROM tb_venda_produto WHERE id_venda = ? AND id_venda_produto = ?', [this.id_venda, this.id_venda_produto]);
                if (result) {
                    const recalcular = yield VendaProduto.recalcularVenda(this.id_venda);
                    if (recalcular) {
                        return recalcular;
                    }
                    return {
                        result: 'success',
                        message: 'Item da venda deletado com sucesso'
                    };
                }
                throw new Error('Nenhum item foi deletado');
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar deletar item da venda.'
                };
            }
        });
    }
}
exports.default = VendaProduto;
