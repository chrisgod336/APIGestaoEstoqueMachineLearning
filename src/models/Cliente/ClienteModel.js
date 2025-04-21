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
class Cliente {
    constructor(id_cliente, tx_nome, tx_cpf_cnpj, tx_email, tx_telefone) {
        this.id_cliente = id_cliente;
        this.tx_nome = tx_nome !== null && tx_nome !== void 0 ? tx_nome : "";
        this.tx_cpf_cnpj = tx_cpf_cnpj !== null && tx_cpf_cnpj !== void 0 ? tx_cpf_cnpj : "";
        this.tx_email = tx_email !== null && tx_email !== void 0 ? tx_email : "";
        this.tx_telefone = tx_telefone !== null && tx_telefone !== void 0 ? tx_telefone : "";
    }
    getIdCliente() {
        return this.id_cliente;
    }
    getTxNome() {
        return this.tx_nome;
    }
    getTxCpfCnpj() {
        return this.tx_cpf_cnpj;
    }
    getTxEmail() {
        return this.tx_email;
    }
    getTxTelefone() {
        return this.tx_telefone;
    }
    static criarCliente(tx_nome, tx_cpf_cnpj, tx_email, tx_telefone) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_insert = `
                INSERT INTO tb_cliente(tx_nome, tx_cpf_cnpj, tx_email, tx_telefone)
                VALUES (?, ?, ?, ?)
            `;
                const result = yield app_1.db.run(sql_insert, [
                    tx_nome, tx_cpf_cnpj, tx_email, tx_telefone
                ]);
                if (result.lastID) {
                    return {
                        result: 'success',
                        message: 'Cliente criado com sucesso',
                        data: new Cliente(result.lastID, tx_nome, tx_cpf_cnpj, tx_email, tx_telefone)
                    };
                }
                throw new Error('Falha ao criar cliente');
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar criar cliente.'
                };
            }
        });
    }
    static buscarCliente(id_cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                let sql;
                let params = [];
                if (id_cliente) {
                    sql = `SELECT * FROM tb_cliente WHERE id_cliente = ?`;
                    params = [id_cliente];
                }
                else {
                    sql = `SELECT * FROM tb_cliente ORDER BY id_cliente`;
                }
                const response = yield app_1.db.all(sql, params);
                return {
                    result: 'success',
                    message: response.length > 0
                        ? 'Cliente(s) encontrado(s) com sucesso'
                        : id_cliente ? 'Cliente não encontrado' : 'Nenhum cliente cadastrado',
                    data: response.length > 0 ? response : null
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar buscar cliente(s).'
                };
            }
        });
    }
    atualizarCliente(tx_nome, tx_cpf_cnpj, tx_email, tx_telefone) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_update = `
                UPDATE tb_cliente
                SET tx_nome = ?,
                    tx_cpf_cnpj = ?,
                    tx_email = ?,
                    tx_telefone = ?
                WHERE id_cliente = ?
            `;
                const result = yield app_1.db.run(sql_update, [
                    tx_nome, tx_cpf_cnpj, tx_email, tx_telefone,
                    this.id_cliente
                ]);
                if (result) {
                    this.tx_nome = tx_nome;
                    this.tx_cpf_cnpj = tx_cpf_cnpj;
                    this.tx_email = tx_email;
                    this.tx_telefone = tx_telefone;
                    return {
                        result: 'success',
                        message: 'Cliente atualizado com sucesso'
                    };
                }
                throw new Error('Nenhum cliente foi atualizado');
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar atualizar cliente.'
                };
            }
        });
    }
    deletarCliente() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = yield app_1.db.run('DELETE FROM tb_cliente WHERE id_cliente = ?', [this.id_cliente]);
                return {
                    result: result ? 'success' : 'error',
                    message: result
                        ? 'Cliente deletado com sucesso'
                        : 'Nenhum cliente foi deletado'
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar deletar cliente.'
                };
            }
        });
    }
}
exports.default = Cliente;
