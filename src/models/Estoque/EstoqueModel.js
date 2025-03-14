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
const db_1 = __importDefault(require("../../services/db"));
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
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_estoque
            `;
                const response = yield db_1.default.query(sql_insert, [id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica]);
                if ((response === null || response === void 0 ? void 0 : response.length) > 0) {
                    return {
                        result: 'success',
                        message: 'Estoque criado com sucesso',
                        data: new Estoque(response[0].id_estoque, id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica)
                    };
                }
                else {
                    throw new Error('Erro ao tentar inserir estoque');
                }
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
                const sql_search = id_estoque
                    ? `SELECT * FROM tb_estoque WHERE id_local_estoque = $1 AND id_estoque = $2`
                    : `SELECT * FROM tb_estoque WHERE id_local_estoque = $1 ORDER BY id_estoque`;
                const response = yield db_1.default.query(sql_search, id_estoque ? [id_local_estoque, id_estoque] : [id_local_estoque]);
                if ((response === null || response === void 0 ? void 0 : response.length) > 0) {
                    return {
                        result: 'success',
                        message: 'Estoque(s) encontrado(s) com sucesso',
                        data: response
                    };
                }
                else {
                    throw new Error('Erro ao tentar buscar estoque(s).');
                }
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
                    SET id_local_estoque = $1,
                    id_produto = $2,
                    nu_quantidade = $3,
                    nu_quantidade_minima = $4,
                    nu_quantidade_maxima = $5,
                    lo_reposicao_automatica = $6
                    WHERE id_estoque = $7;
            `;
                const response = yield db_1.default.query(sql_update, [id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica, this.id_estoque]);
                if (response) {
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
                else {
                    throw new Error('Erro ao tentar atualizar estoque.');
                }
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
                const sql_delete = `DELETE FROM tb_estoque WHERE id_estoque = $1`;
                const response = yield db_1.default.query(sql_delete, [this.id_estoque]);
                if (response) {
                    return {
                        result: 'success',
                        message: 'Estoque deletado com sucesso'
                    };
                }
                else {
                    throw new Error('Erro ao tentar deletar estoque.');
                }
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
            var _a;
            try {
                const response = yield Promise.all(estoques.map((estoque) => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b;
                    const sql_search = `SELECT id_estoque FROM tb_estoque WHERE id_local_estoque = $1 AND id_produto = $2`;
                    const response_search = yield db_1.default.query(sql_search, [estoque.id_local_estoque, estoque.id_produto]);
                    if (response_search.length > 0 && ((_a = response_search[0]) === null || _a === void 0 ? void 0 : _a.id_estoque) > 0) {
                        const id_estoque = (_b = response_search[0]) === null || _b === void 0 ? void 0 : _b.id_estoque;
                        const stq = new Estoque(id_estoque);
                        const res = yield stq.atualizarEstoque(estoque.id_local_estoque, estoque.id_produto, estoque.nu_quantidade, estoque.nu_quantidade_minima, estoque.nu_quantidade_maxima, estoque.lo_reposicao_automatica);
                        return res;
                    }
                    else {
                        const res = yield Estoque.criarEstoque(estoque.id_local_estoque, estoque.id_produto, estoque.nu_quantidade, estoque.nu_quantidade_minima, estoque.nu_quantidade_maxima, estoque.lo_reposicao_automatica);
                        return res;
                    }
                })));
                return {
                    result: 'success',
                    message: `${response.length} estoques atualizados com sucesso.`,
                    data: response
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao atualizar estoque em lote.'
                };
            }
        });
    }
    static movimentarEstoque(id_local_estoque_ori, id_local_estoque_dest, id_produto, nu_quantidade_mov) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            try {
                const sql_search = `SELECT id_estoque, id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica 
            FROM tb_estoque WHERE id_local_estoque = $1 AND id_produto = $2`;
                const res = yield db_1.default.query(sql_search, [id_local_estoque_ori, id_produto]);
                if (res.length == 0 || ((_a = res[0]) === null || _a === void 0 ? void 0 : _a.id_estoque) <= 0) {
                    throw new Error('Estoque de origem não encontrado.');
                }
                const EstoqueOri = new Estoque((_b = res[0]) === null || _b === void 0 ? void 0 : _b.id_estoque);
                const res1 = yield EstoqueOri.atualizarEstoque((_c = res[0]) === null || _c === void 0 ? void 0 : _c.id_local_estoque, (_d = res[0]) === null || _d === void 0 ? void 0 : _d.id_produto, (((_e = res[0]) === null || _e === void 0 ? void 0 : _e.nu_quantidade) - nu_quantidade_mov), (_f = res[0]) === null || _f === void 0 ? void 0 : _f.nu_quantidade_minima, (_g = res[0]) === null || _g === void 0 ? void 0 : _g.nu_quantidade_maxima, (_h = res[0]) === null || _h === void 0 ? void 0 : _h.lo_reposicao_automatica);
                if (res1.result == "success") {
                    const sql_search = `SELECT id_estoque, id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica
                 FROM tb_estoque WHERE id_local_estoque = $1 AND id_produto = $2`;
                    const res2 = yield db_1.default.query(sql_search, [id_local_estoque_dest, id_produto]);
                    if (res2.length > 0 && res2[0].id_estoque > 0) {
                        const estoqueDest = new Estoque(res2[0].id_estoque);
                        const res3 = yield estoqueDest.atualizarEstoque(res2[0].id_local_estoque, res2[0].id_produto, (res2[0].nu_quantidade + nu_quantidade_mov), res2[0].nu_quantidade_minima, res2[0].nu_quantidade_maxima, res2[0].lo_reposicao_automatica);
                        if (res3.result == "error") {
                            throw new Error(res3.message);
                        }
                    }
                    else {
                        const res3 = yield Estoque.criarEstoque(id_local_estoque_dest, id_produto, nu_quantidade_mov, 0, 0, true);
                        if (res3.result == "error") {
                            throw new Error(res3.message);
                        }
                    }
                }
                else {
                    throw new Error('Erro ao atualizar estoque de origem.');
                }
                return {
                    result: 'success',
                    message: `Estoque movimentado com sucesso.`,
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_j = error === null || error === void 0 ? void 0 : error.message) !== null && _j !== void 0 ? _j : 'Erro ao movimentar estoque.'
                };
            }
        });
    }
}
exports.default = Estoque;
