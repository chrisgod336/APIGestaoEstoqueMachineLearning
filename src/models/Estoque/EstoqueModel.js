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
    constructor(id_estoque, id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica) {
        this.id_estoque = id_estoque;
        this.id_local_estoque = id_local_estoque !== null && id_local_estoque !== void 0 ? id_local_estoque : 0;
        this.id_produto = id_produto !== null && id_produto !== void 0 ? id_produto : 0;
        this.nu_quantidade = nu_quantidade !== null && nu_quantidade !== void 0 ? nu_quantidade : 0;
        this.nu_quantidade_minima = nu_quantidade_minima !== null && nu_quantidade_minima !== void 0 ? nu_quantidade_minima : 0;
        this.nu_quantidade_maxima = nu_quantidade_maxima !== null && nu_quantidade_maxima !== void 0 ? nu_quantidade_maxima : 0;
        this.lo_reposicao_automatica = lo_reposicao_automatica !== null && lo_reposicao_automatica !== void 0 ? lo_reposicao_automatica : false;
    }
    getIdEstoque() {
        return this.id_estoque;
    }
    getIdLocalEstoque() {
        return this.id_local_estoque;
    }
    getIdProduto() {
        return this.id_produto;
    }
    getNuQuantidade() {
        return this.nu_quantidade;
    }
    getNuQuantidadeMinima() {
        return this.nu_quantidade_minima;
    }
    getNuQuantidadeMaxima() {
        return this.nu_quantidade_maxima;
    }
    getLoReposicaoAutomatica() {
        return this.lo_reposicao_automatica;
    }
    static criarEstoque(id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_insert = `
                INSERT INTO tb_estoque(id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
                const result = yield app_1.db.run(sql_insert, [id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica]);
                if (result.lastID) {
                    return {
                        result: 'success',
                        message: 'Estoque criado com sucesso',
                        data: new Estoque(result.lastID, id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica)
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
    static buscarEstoque(id_local_estoque, id_estoque) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                let sql;
                let params = [id_local_estoque];
                if (id_estoque) {
                    sql = `SELECT * FROM tb_estoque WHERE id_local_estoque = ? AND id_estoque = ?`;
                    params.push(id_estoque);
                }
                else {
                    sql = `SELECT * FROM tb_estoque WHERE id_local_estoque = ? ORDER BY id_estoque`;
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
    atualizarEstoque(id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_update = `
                UPDATE tb_estoque
                SET id_local_estoque = ?,
                    id_produto = ?,
                    nu_quantidade = ?,
                    nu_quantidade_minima = ?,
                    nu_quantidade_maxima = ?,
                    lo_reposicao_automatica = ?
                WHERE id_estoque = ?
            `;
                const result = yield app_1.db.run(sql_update, [
                    id_local_estoque, id_produto, nu_quantidade,
                    nu_quantidade_minima, nu_quantidade_maxima,
                    lo_reposicao_automatica, this.id_estoque
                ]);
                if (result) {
                    this.id_local_estoque = id_local_estoque;
                    this.id_produto = id_produto;
                    this.nu_quantidade = nu_quantidade;
                    this.nu_quantidade_minima = nu_quantidade_minima;
                    this.nu_quantidade_maxima = nu_quantidade_maxima;
                    this.lo_reposicao_automatica = lo_reposicao_automatica;
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
    static atualizarEstoquesLote(estoques) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                yield app_1.db.run('BEGIN TRANSACTION');
                const results = [];
                for (const estoque of estoques) {
                    const response_search = yield app_1.db.all('SELECT id_estoque FROM tb_estoque WHERE id_local_estoque = ? AND id_produto = ?', [estoque.id_local_estoque, estoque.id_produto]);
                    let result;
                    if (response_search.length > 0 && ((_a = response_search[0]) === null || _a === void 0 ? void 0 : _a.id_estoque) > 0) {
                        const stq = new Estoque(response_search[0].id_estoque);
                        result = yield stq.atualizarEstoque(estoque.id_local_estoque, estoque.id_produto, estoque.nu_quantidade, estoque.nu_quantidade_minima, estoque.nu_quantidade_maxima, estoque.lo_reposicao_automatica);
                    }
                    else {
                        result = yield Estoque.criarEstoque(estoque.id_local_estoque, estoque.id_produto, estoque.nu_quantidade, estoque.nu_quantidade_minima, estoque.nu_quantidade_maxima, estoque.lo_reposicao_automatica);
                    }
                    results.push(result);
                }
                yield app_1.db.run('COMMIT');
                return {
                    result: 'success',
                    message: `${estoques.length} estoques atualizados com sucesso.`,
                    data: results
                };
            }
            catch (error) {
                yield app_1.db.run('ROLLBACK');
                return {
                    result: 'error',
                    message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : 'Erro ao atualizar estoque em lote.'
                };
            }
        });
    }
    static movimentarEstoque(id_local_estoque_ori, id_local_estoque_dest, id_produto, nu_quantidade_mov) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                yield app_1.db.run('BEGIN TRANSACTION');
                const res = yield app_1.db.all(`SELECT id_estoque, id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica 
                FROM tb_estoque WHERE id_local_estoque = ? AND id_produto = ?`, [id_local_estoque_ori, id_produto]);
                if (res.length == 0 || ((_a = res[0]) === null || _a === void 0 ? void 0 : _a.id_estoque) <= 0) {
                    throw new Error('Estoque de origem não encontrado.');
                }
                const EstoqueOri = new Estoque(res[0].id_estoque);
                const res1 = yield EstoqueOri.atualizarEstoque(res[0].id_local_estoque, res[0].id_produto, (res[0].nu_quantidade - nu_quantidade_mov), res[0].nu_quantidade_minima, res[0].nu_quantidade_maxima, res[0].lo_reposicao_automatica);
                if (!res1) {
                    throw new Error('Erro ao atualizar estoque de origem.');
                }
                const res2 = yield app_1.db.all(`SELECT id_estoque, id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica
                FROM tb_estoque WHERE id_local_estoque = ? AND id_produto = ?`, [id_local_estoque_dest, id_produto]);
                if (res2.length > 0 && res2[0].id_estoque > 0) {
                    const estoqueDest = new Estoque(res2[0].id_estoque);
                    const res3 = yield estoqueDest.atualizarEstoque(res2[0].id_local_estoque, res2[0].id_produto, (res2[0].nu_quantidade + nu_quantidade_mov), res2[0].nu_quantidade_minima, res2[0].nu_quantidade_maxima, res2[0].lo_reposicao_automatica);
                    if (!res3) {
                        throw new Error('Erro ao tentar ralizar operação');
                    }
                }
                else {
                    const res3 = yield Estoque.criarEstoque(id_local_estoque_dest, id_produto, nu_quantidade_mov, 0, 0, true);
                    if (!res3) {
                        throw new Error('Erro ao tentar ralizar operação');
                    }
                }
                yield app_1.db.run('COMMIT');
                return {
                    result: 'success',
                    message: `Estoque movimentado com sucesso.`,
                };
            }
            catch (error) {
                yield app_1.db.run('ROLLBACK');
                return {
                    result: 'error',
                    message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : 'Erro ao movimentar estoque.'
                };
            }
        });
    }
}
exports.default = Estoque;
