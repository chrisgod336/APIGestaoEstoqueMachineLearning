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
class Usuario {
    constructor(id_usuario, tx_nome, tx_email, tx_senha) {
        this.id_usuario = id_usuario;
        this.tx_nome = tx_nome !== null && tx_nome !== void 0 ? tx_nome : '';
        this.tx_email = tx_email !== null && tx_email !== void 0 ? tx_email : '';
        this.tx_senha = tx_senha !== null && tx_senha !== void 0 ? tx_senha : '';
    }
    getIdUsuario() {
        return this.id_usuario;
    }
    getTxNome() {
        return this.tx_nome;
    }
    getTxEmail() {
        return this.tx_email;
    }
    getTxSenha() {
        return this.tx_senha;
    }
    static loginUsuario(tx_email, tx_senha) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_search = `SELECT * FROM tb_usuario WHERE tx_email = $1 AND tx_senha = $2`;
                const response = yield (0, db_1.query)(sql_search, [tx_email, tx_senha]);
                if ((response === null || response === void 0 ? void 0 : response.length) > 0) {
                    return {
                        result: 'success',
                        message: 'Login realizado com sucesso.',
                        data: response
                    };
                }
                else {
                    return {
                        result: 'error',
                        message: 'E-mail ou senha inválidos.'
                    };
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar logar com usuário.'
                };
            }
        });
    }
    static criarUsuario(tx_nome, tx_email, tx_senha) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_insert = `
                INSERT INTO tb_usuario(tx_nome, tx_email, tx_senha, tx_tipo_usuario)
                VALUES ($1, $2, $3, 'ADMIN') RETURNING id_usuario
            `;
                const response = yield (0, db_1.query)(sql_insert, [tx_nome, tx_email, tx_senha]);
                if ((response === null || response === void 0 ? void 0 : response.length) > 0) {
                    return {
                        result: 'success',
                        message: 'Usuário criado com sucesso',
                        data: new Usuario(response[0].id_usuario, tx_nome, tx_email, tx_senha)
                    };
                }
                else {
                    throw new Error('Erro ao tentar inserir usuário');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar criar usuário.'
                };
            }
        });
    }
    static buscarUsuario(id_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_search = id_usuario
                    ? `SELECT * FROM tb_usuario WHERE id_usuario = $1`
                    : `SELECT * FROM tb_usuario ORDER BY id_usuario`;
                const response = yield (0, db_1.query)(sql_search, id_usuario ? [id_usuario] : []);
                if ((response === null || response === void 0 ? void 0 : response.length) > 0) {
                    return {
                        result: 'success',
                        message: 'Usuário(s) encontrado(s) com sucesso',
                        data: response
                    };
                }
                else {
                    throw new Error('Erro ao tentar buscar usuário(s).');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar buscar usuário(s).'
                };
            }
        });
    }
    atualizarUsuario(tx_nome, tx_email, tx_senha) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_update = `
                UPDATE tb_usuario
                SET tx_nome = $1, tx_email = $2, tx_senha = $3
                WHERE id_usuario = $4
            `;
                const response = yield (0, db_1.query)(sql_update, [tx_nome, tx_email, tx_senha, this.id_usuario]);
                if (response) {
                    this.tx_nome = tx_nome;
                    this.tx_email = tx_email;
                    this.tx_senha = tx_senha;
                    return {
                        result: 'success',
                        message: 'Usuário atualizado com sucesso'
                    };
                }
                else {
                    throw new Error('Erro ao tentar atualizar usuário.');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar atualizar usuário.'
                };
            }
        });
    }
    deletarUsuario() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_delete = `DELETE FROM tb_usuario WHERE id_usuario = $1`;
                const response = yield (0, db_1.query)(sql_delete, [this.id_usuario]);
                if (response) {
                    return {
                        result: 'success',
                        message: 'Usuário deletado com sucesso'
                    };
                }
                else {
                    throw new Error('Erro ao tentar deletar usuário.');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar deletar usuário.'
                };
            }
        });
    }
}
exports.default = Usuario;
