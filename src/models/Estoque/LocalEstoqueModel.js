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
                VALUES ($1, $2, $3, $4, $5) RETURNING id_local_estoque
            `;
                const response = yield db_1.default.query(sql_insert, [tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco]);
                if ((response === null || response === void 0 ? void 0 : response.length) > 0) {
                    return {
                        result: 'success',
                        message: 'Local de estoque criado com sucesso',
                        data: new LocalEstoque(response[0].id_local_estoque, tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco)
                    };
                }
                else {
                    throw new Error('Erro ao tentar inserir local de estoque');
                }
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
                const sql_search = id_local_estoque
                    ? `SELECT * FROM tb_local_estoque WHERE id_local_estoque = $1`
                    : `SELECT * FROM tb_local_estoque ORDER BY id_local_estoque`;
                const response = yield db_1.default.query(sql_search, id_local_estoque ? [id_local_estoque] : []);
                if ((response === null || response === void 0 ? void 0 : response.length) > 0) {
                    return {
                        result: 'success',
                        message: 'Local(ais) encontrado(s) com sucesso',
                        data: response
                    };
                }
                else {
                    throw new Error('Erro ao tentar buscar local(ais).');
                }
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
                    SET tx_nome = $1,
                    tx_pais = $2,
                    tx_uf = $3,
                    tx_cidade = $4,
                    tx_endereco = $5
                    WHERE id_local_estoque = $6;
            `;
                const response = yield db_1.default.query(sql_update, [tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco, this.id_local_estoque]);
                if (response) {
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
                else {
                    throw new Error('Erro ao tentar atualizar local.');
                }
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
                const sql_delete = `DELETE FROM tb_local_estoque WHERE id_local_estoque = $1`;
                const response = yield db_1.default.query(sql_delete, [this.id_local_estoque]);
                if (response) {
                    return {
                        result: 'success',
                        message: 'Local deletado com sucesso'
                    };
                }
                else {
                    throw new Error('Erro ao tentar deletar local.');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar deletar local.'
                };
            }
        });
    }
    static criarLocaisEstoqueLote(locais_esotque) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield Promise.all(locais_esotque.map(local => this.criarLocalEstoque(local.tx_nome, local.tx_pais, local.tx_uf, local.tx_cidade, local.tx_endereco)));
                return {
                    result: 'success',
                    message: `${response.length} locais criados com sucesso.`,
                    data: response
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao criar locais em lote.'
                };
            }
        });
    }
}
exports.default = LocalEstoque;
