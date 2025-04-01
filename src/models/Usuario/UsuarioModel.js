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
                const sql_search = `SELECT * FROM tb_usuario WHERE tx_email = ? AND tx_senha = ?`;
                const response = yield app_1.db.all(sql_search, [tx_email, tx_senha]);
                return {
                    result: response.length > 0 ? 'success' : 'error',
                    message: response.length > 0
                        ? 'Login realizado com sucesso.'
                        : 'E-mail ou senha inválidos.',
                    data: response.length > 0 ? response : null
                };
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
                VALUES (?, ?, ?, 'ADMIN')
            `;
                const result = yield app_1.db.run(sql_insert, [tx_nome, tx_email, tx_senha]);
                if (result.lastID) {
                    return {
                        result: 'success',
                        message: 'Usuário criado com sucesso',
                        data: new Usuario(result.lastID, tx_nome, tx_email, tx_senha)
                    };
                }
                throw new Error('Falha ao criar usuário');
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
                let sql;
                let params = [];
                if (id_usuario) {
                    sql = `SELECT * FROM tb_usuario WHERE id_usuario = ?`;
                    params = [id_usuario];
                }
                else {
                    sql = `SELECT * FROM tb_usuario ORDER BY id_usuario`;
                }
                const response = yield app_1.db.all(sql, params);
                return {
                    result: 'success',
                    message: response.length > 0
                        ? 'Usuário(s) encontrado(s) com sucesso'
                        : id_usuario ? 'Usuário não encontrado' : 'Nenhum usuário cadastrado',
                    data: response.length > 0 ? response : null
                };
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
                SET tx_nome = ?, tx_email = ?, tx_senha = ?
                WHERE id_usuario = ?
            `;
                const result = yield app_1.db.run(sql_update, [tx_nome, tx_email, tx_senha, this.id_usuario]);
                if (result) {
                    this.tx_nome = tx_nome;
                    this.tx_email = tx_email;
                    this.tx_senha = tx_senha;
                    return {
                        result: 'success',
                        message: 'Usuário atualizado com sucesso'
                    };
                }
                throw new Error('Nenhum usuário foi atualizado');
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
                const result = yield app_1.db.run('DELETE FROM tb_usuario WHERE id_usuario = ?', [this.id_usuario]);
                return {
                    result: result ? 'success' : 'error',
                    message: result
                        ? 'Usuário deletado com sucesso'
                        : 'Nenhum usuário foi deletado'
                };
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
