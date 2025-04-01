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
class LocalEstoque {
    constructor(id_local_estoque, tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco) {
        this.id_local_estoque = id_local_estoque;
        this.tx_nome = tx_nome !== null && tx_nome !== void 0 ? tx_nome : "";
        this.tx_pais = tx_pais !== null && tx_pais !== void 0 ? tx_pais : "";
        this.tx_uf = tx_uf !== null && tx_uf !== void 0 ? tx_uf : "";
        this.tx_cidade = tx_cidade !== null && tx_cidade !== void 0 ? tx_cidade : "";
        this.tx_endereco = tx_endereco !== null && tx_endereco !== void 0 ? tx_endereco : "";
    }
    getIdLocalEstoque() {
        return this.id_local_estoque;
    }
    getTxNome() {
        return this.tx_nome;
    }
    getTxPais() {
        return this.tx_pais;
    }
    getTxUf() {
        return this.tx_uf;
    }
    getTxCidade() {
        return this.tx_cidade;
    }
    getTxEndereco() {
        return this.tx_endereco;
    }
    static criarLocalEstoque(tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_insert = `
                INSERT INTO tb_local_estoque(tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco)
                VALUES (?, ?, ?, ?, ?)
            `;
                const result = yield app_1.db.run(sql_insert, [tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco]);
                if (result.lastID) {
                    return {
                        result: 'success',
                        message: 'Local de estoque criado com sucesso',
                        data: new LocalEstoque(result.lastID, tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco)
                    };
                }
                throw new Error('Falha ao criar local de estoque');
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar criar local de estoque.'
                };
            }
        });
    }
    static buscarLocalEstoque(id_local_estoque) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                let sql;
                let params = [];
                if (id_local_estoque) {
                    sql = `SELECT * FROM tb_local_estoque WHERE id_local_estoque = ?`;
                    params = [id_local_estoque];
                }
                else {
                    sql = `SELECT * FROM tb_local_estoque ORDER BY id_local_estoque`;
                }
                const response = yield app_1.db.all(sql, params);
                return {
                    result: 'success',
                    message: response.length > 0
                        ? 'Local(ais) encontrado(s) com sucesso'
                        : id_local_estoque ? 'Local não encontrado' : 'Nenhum local cadastrado',
                    data: response.length > 0 ? response : null
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar buscar local(ais).'
                };
            }
        });
    }
    atualizarLocalEstoque(tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_update = `
                UPDATE tb_local_estoque
                SET tx_nome = ?,
                    tx_pais = ?,
                    tx_uf = ?,
                    tx_cidade = ?,
                    tx_endereco = ?
                WHERE id_local_estoque = ?
            `;
                const result = yield app_1.db.run(sql_update, [
                    tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco,
                    this.id_local_estoque
                ]);
                if (result) {
                    this.tx_nome = tx_nome;
                    this.tx_pais = tx_pais;
                    this.tx_uf = tx_uf;
                    this.tx_cidade = tx_cidade;
                    this.tx_endereco = tx_endereco;
                    return {
                        result: 'success',
                        message: 'Local atualizado com sucesso'
                    };
                }
                throw new Error('Nenhum local foi atualizado');
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar atualizar local.'
                };
            }
        });
    }
    deletarLocalEstoque() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = yield app_1.db.run('DELETE FROM tb_local_estoque WHERE id_local_estoque = ?', [this.id_local_estoque]);
                return {
                    result: result ? 'success' : 'error',
                    message: result
                        ? 'Local deletado com sucesso'
                        : 'Nenhum local foi deletado'
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar deletar local.'
                };
            }
        });
    }
    static criarLocaisEstoqueLote(locais_estoque) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                yield app_1.db.run('BEGIN TRANSACTION');
                const results = [];
                for (const local of locais_estoque) {
                    const result = yield app_1.db.run(`INSERT INTO tb_local_estoque(
                        tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco
                    ) VALUES (?, ?, ?, ?, ?)`, [
                        local.tx_nome, local.tx_pais, local.tx_uf,
                        local.tx_cidade, local.tx_endereco
                    ]);
                    results.push(result.lastID);
                }
                yield app_1.db.run('COMMIT');
                return {
                    result: 'success',
                    message: `${locais_estoque.length} locais criados com sucesso.`,
                    data: results
                };
            }
            catch (error) {
                yield app_1.db.run('ROLLBACK');
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao criar locais em lote.'
                };
            }
        });
    }
}
exports.default = LocalEstoque;
