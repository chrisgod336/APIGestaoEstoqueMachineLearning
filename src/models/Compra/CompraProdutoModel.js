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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../../app");
const EstoqueModel_1 = __importDefault(require("../Estoque/EstoqueModel"));
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
            var _a, _b;
            try {
                const response = yield app_1.db.get('SELECT COALESCE(SUM(vr_total), 0) AS sum FROM tb_compra_produto WHERE id_compra = ?', [id_compra]);
                const sum = (_a = response === null || response === void 0 ? void 0 : response.sum) !== null && _a !== void 0 ? _a : 0;
                yield app_1.db.run('UPDATE tb_compra SET vr_compra = (? - vr_frete), vr_compra = ? WHERE id_compra = ?', [sum, sum, id_compra]);
                return {
                    result: 'success',
                    message: 'Valor da compra recalculado com sucesso.'
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : 'Erro ao recalcular valor da compra.'
                };
            }
        });
    }
    static calculaValorTotal(id_produto, nu_quantidade) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield app_1.db.get('SELECT vr_preco_compra FROM tb_produto WHERE id_produto = ?', [id_produto]);
                if (!response) {
                    return {
                        result: 'error',
                        message: 'Produto não encontrado'
                    };
                }
                const vr_preco_compra = response.vr_preco_compra;
                const total = vr_preco_compra * nu_quantidade;
                return {
                    result: 'success',
                    message: 'Valor total calculado com sucesso.',
                    data: total
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao calcular valor total do item.'
                };
            }
        });
    }
    static criarCompraProduto(id_compra, id_estoque, id_produto, nu_quantidade) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const calcula_vr_total = yield this.calculaValorTotal(id_produto, nu_quantidade);
                if (!calcula_vr_total) {
                    return calcula_vr_total;
                }
                const vr_total = calcula_vr_total.data;
                const result = yield app_1.db.run(`INSERT INTO tb_compra_produto(
                    id_compra, id_estoque, id_produto, nu_quantidade, vr_total
                ) VALUES (?, ?, ?, ?, ?)`, [id_compra, id_estoque, id_produto, nu_quantidade, vr_total]);
                if (result.lastID) {
                    const recalcular = yield this.recalcularCompra(id_compra);
                    if (recalcular.result !== 'success') {
                        return recalcular;
                    }
                    EstoqueModel_1.default.movimentarEstoque(id_produto, nu_quantidade, '+');
                    return {
                        result: 'success',
                        message: 'Item adicionado à compra com sucesso',
                        data: new CompraProduto(result.lastID, id_compra, id_estoque, id_produto, nu_quantidade, vr_total)
                    };
                }
                throw new Error('Falha ao adicionar item à compra');
            }
            catch (error) {
                console.error(error);
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao adicionar item à compra.'
                };
            }
        });
    }
    static buscarCompraProduto(id_compra, id_compra_produto) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                let sql;
                let params;
                if (id_compra_produto) {
                    sql = `SELECT * FROM tb_compra_produto WHERE id_compra = ? AND id_compra_produto = ?`;
                    params = [id_compra, id_compra_produto];
                }
                else {
                    sql = `SELECT * FROM tb_compra_produto WHERE id_compra = ? ORDER BY id_compra_produto`;
                    params = [id_compra];
                }
                const response = yield app_1.db.all(sql, params);
                return {
                    result: 'success',
                    message: response.length > 0
                        ? 'Item(ns) da compra encontrado(s) com sucesso'
                        : id_compra_produto ? 'Item não encontrado' : 'Nenhum item encontrado',
                    data: response.length > 0 ? response : null
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao buscar item(ns) da compra.'
                };
            }
        });
    }
    atualizarCompraProduto(id_estoque, id_produto, nu_quantidade) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const calcula_vr_total = yield CompraProduto.calculaValorTotal(id_produto, nu_quantidade);
                if (calcula_vr_total.result === 'error') {
                    return calcula_vr_total;
                }
                const res = yield app_1.db.all(`SELECT id_produto, nu_quantidade FROM tb_compra_produto WHERE id_compra = ? AND id_compra_produto = ?`, [this.id_compra, this.id_compra_produto]);
                if (!res || res.length === 0) {
                    throw new Error('Nenhum item encontrado.');
                }
                const id_produto_antigo = res[0].id_produto;
                const nu_quantidade_antiga = res[0].nu_quantidade;
                const vr_total = calcula_vr_total.data;
                const result = yield app_1.db.run(`UPDATE tb_compra_produto
                SET id_estoque = ?,
                    id_produto = ?,
                    nu_quantidade = ?,
                    vr_total = ?
                WHERE id_compra = ?
                AND id_compra_produto = ?`, [id_estoque, id_produto, nu_quantidade, vr_total, this.id_compra, this.id_compra_produto]);
                if (result.changes > 0) {
                    EstoqueModel_1.default.movimentarEstoque(id_produto_antigo, nu_quantidade_antiga, '-');
                    EstoqueModel_1.default.movimentarEstoque(id_produto, nu_quantidade, '+');
                    this.id_estoque = id_estoque;
                    this.id_produto = id_produto;
                    this.nu_quantidade = nu_quantidade;
                    this.vr_total = vr_total;
                    const recalcular = yield CompraProduto.recalcularCompra(this.id_compra);
                    if (recalcular.result !== 'success') {
                        return recalcular;
                    }
                    return {
                        result: 'success',
                        message: 'Item da compra atualizado com sucesso'
                    };
                }
                throw new Error('Nenhum item foi atualizado');
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao atualizar item da compra.'
                };
            }
        });
    }
    deletarCompraProduto() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const res = yield app_1.db.all(`SELECT id_produto, nu_quantidade FROM tb_compra_produto WHERE id_compra = ? AND id_compra_produto = ?`, [this.id_compra, this.id_compra_produto]);
                if (!res || res.length === 0) {
                    throw new Error('Nenhum item foi encontrado.');
                }
                this.id_produto = (_a = res[0]) === null || _a === void 0 ? void 0 : _a.id_produto;
                this.nu_quantidade = (_b = res[0]) === null || _b === void 0 ? void 0 : _b.nu_quantidade;
                const result = yield app_1.db.run('DELETE FROM tb_compra_produto WHERE id_compra = ? AND id_compra_produto = ?', [this.id_compra, this.id_compra_produto]);
                if (result.changes > 0) {
                    EstoqueModel_1.default.movimentarEstoque(this.id_produto, this.nu_quantidade, '-');
                    const recalcular = yield CompraProduto.recalcularCompra(this.id_compra);
                    if (recalcular.result !== 'success') {
                        return recalcular;
                    }
                    return {
                        result: 'success',
                        message: 'Item da compra deletado com sucesso'
                    };
                }
                throw new Error('Nenhum item foi deletado');
            }
            catch (error) {
                console.error(error);
                return {
                    result: 'error',
                    message: (_c = error === null || error === void 0 ? void 0 : error.message) !== null && _c !== void 0 ? _c : 'Erro ao deletar item da compra.'
                };
            }
        });
    }
}
exports.default = CompraProduto;
