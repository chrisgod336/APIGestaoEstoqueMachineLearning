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
class Estoque {
    constructor(id_estoque, id_produto, nu_quantidade) {
        this.id_estoque = id_estoque;
        this.id_produto = id_produto !== null && id_produto !== void 0 ? id_produto : 0;
        this.nu_quantidade = nu_quantidade !== null && nu_quantidade !== void 0 ? nu_quantidade : 0;
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
    static criarEstoque(id_produto, nu_quantidade) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_insert = `
                INSERT INTO tb_estoque(id_produto, nu_quantidade)
                VALUES (?, ?)
            `;
                const result = yield app_1.db.run(sql_insert, [id_produto, nu_quantidade]);
                if (result.lastID) {
                    return {
                        result: 'success',
                        message: 'Estoque criado com sucesso',
                        data: new Estoque(result.lastID, id_produto, nu_quantidade)
                    };
                }
                throw new Error('Falha ao criar estoque');
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar criar estoque.'
                };
            }
        });
    }
    static buscarEstoque(id_estoque) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                let sql;
                let params = [];
                if (id_estoque) {
                    sql = `SELECT * FROM tb_estoque WHERE id_estoque = ?`;
                    params.push(id_estoque);
                }
                else {
                    sql = `SELECT tb_estoque.*, tb_produto.id_produto||' - '||tb_produto.tx_nome AS produto 
                       FROM tb_estoque
                       INNER JOIN tb_produto 
                       ON tb_estoque.id_produto = tb_produto.id_produto
                       ORDER BY id_estoque`;
                }
                const response = yield app_1.db.all(sql, params);
                return {
                    result: 'success',
                    message: response.length > 0
                        ? 'Estoque(s) encontrado(s) com sucesso'
                        : id_estoque ? 'Estoque não encontrado' : 'Nenhum estoque cadastrado',
                    data: response.length > 0 ? response : null
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar buscar estoque(s).'
                };
            }
        });
    }
    atualizarEstoque(id_produto, nu_quantidade) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_update = `
                UPDATE tb_estoque
                SET id_produto = ?,
                    nu_quantidade = ?
                WHERE id_estoque = ?
            `;
                const result = yield app_1.db.run(sql_update, [id_produto, nu_quantidade, this.id_estoque]);
                if (result) {
                    this.id_produto = id_produto;
                    this.nu_quantidade = nu_quantidade;
                    return {
                        result: 'success',
                        message: 'Estoque atualizado com sucesso'
                    };
                }
                throw new Error('Nenhum estoque foi atualizado');
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar atualizar estoque.'
                };
            }
        });
    }
    deletarEstoque() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = yield app_1.db.run('DELETE FROM tb_estoque WHERE id_estoque = ?', [this.id_estoque]);
                return {
                    result: result ? 'success' : 'error',
                    message: result
                        ? 'Estoque deletado com sucesso'
                        : 'Nenhum estoque foi deletado'
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar deletar estoque.'
                };
            }
        });
    }
    static countProduto(id_produto) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                let sql;
                let params = [id_produto];
                sql = `SELECT COUNT(*) AS count FROM tb_estoque WHERE id_produto = ?`;
                const response = yield app_1.db.all(sql, params);
                return {
                    result: 'success',
                    message: response.length > 0
                        ? 'Produto encontrado com sucesso'
                        : 'Produto não encontrado',
                    data: response || 0
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar buscar produtos(s).'
                };
            }
        });
    }
    static movimentarEstoque(id_produto, nu_quantidade_new, operation) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_update = `UPDATE tb_estoque SET nu_quantidade = nu_quantidade ${operation} ? WHERE id_produto = ?`;
                const values = [nu_quantidade_new, id_produto];
                const result = yield app_1.db.run(sql_update, values);
                if (result) {
                    return {
                        result: 'success',
                        message: 'Estoque movimentado com sucesso'
                    };
                }
                throw new Error('Nenhum estoque foi movimentado');
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar movimentar estoque.'
                };
            }
        });
    }
}
exports.default = Estoque;
