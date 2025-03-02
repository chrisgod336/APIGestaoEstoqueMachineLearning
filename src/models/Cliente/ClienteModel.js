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
                INSERT INTO tb_cliente(tx_nome, tx_cpf_cnpj, tx_email, tx_telefone) VALUES ($1, $2, $3, $4) RETURNING id_cliente
            `;
                const response = yield (0, db_1.query)(sql_insert, [tx_nome, tx_cpf_cnpj, tx_email, tx_telefone]);
                if ((response === null || response === void 0 ? void 0 : response.length) > 0) {
                    return {
                        result: 'success',
                        message: 'Cliente criado com sucesso',
                        data: new Cliente(response[0].id_cliente, tx_nome, tx_cpf_cnpj, tx_email, tx_telefone)
                    };
                }
                else {
                    throw new Error('Erro ao tentar inserir cliente');
                }
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
                const sql_search = id_cliente
                    ? `SELECT * FROM tb_cliente WHERE id_cliente = $1`
                    : `SELECT * FROM tb_cliente ORDER BY id_cliente`;
                const response = yield (0, db_1.query)(sql_search, id_cliente ? [id_cliente] : []);
                if ((response === null || response === void 0 ? void 0 : response.length) > 0) {
                    return {
                        result: 'success',
                        message: 'Cliente(s) encontrado(s) com sucesso',
                        data: response
                    };
                }
                else {
                    throw new Error('Erro ao tentar buscar cliente(s).');
                }
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
                    SET tx_nome = $1,
                        tx_cpf_cnpj = $2,
                        tx_email = $3,
                        tx_telefone = $4
                    WHERE id_cliente = $5;
            `;
                const response = yield (0, db_1.query)(sql_update, [tx_nome, tx_cpf_cnpj, tx_email, tx_telefone, this.id_cliente]);
                if (response) {
                    this.tx_nome = tx_nome;
                    this.tx_cpf_cnpj = tx_cpf_cnpj;
                    this.tx_email = tx_email;
                    this.tx_telefone = tx_telefone;
                    return {
                        result: 'success',
                        message: 'Cliente atualizado com sucesso'
                    };
                }
                else {
                    throw new Error('Erro ao tentar atualizar cliente.');
                }
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
                const sql_delete = `DELETE FROM tb_cliente WHERE id_cliente = $1`;
                const response = yield (0, db_1.query)(sql_delete, [this.id_cliente]);
                if (response) {
                    return {
                        result: 'success',
                        message: 'Cliente deletado com sucesso'
                    };
                }
                else {
                    throw new Error('Erro ao tentar deletar cliente.');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar deletar cliente.'
                };
            }
        });
    }
    static criarClienteLote(clientes) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield Promise.all(clientes.map(cliente => this.criarCliente(cliente.tx_nome, cliente.tx_cpf_cnpj, cliente.tx_email, cliente.tx_telefone)));
                return {
                    result: 'success',
                    message: `${response.length} clientes criados com sucesso.`,
                    data: response
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao criar clientes em lote.'
                };
            }
        });
    }
}
exports.default = Cliente;
