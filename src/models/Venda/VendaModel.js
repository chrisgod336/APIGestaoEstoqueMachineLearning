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
const db_1 = require("../../services/db");
const MovimentoCaixaModel_1 = __importDefault(require("../MovimentoCaixa/MovimentoCaixaModel"));
class Venda {
    constructor(id_venda, id_cliente, dt_venda, vr_venda, status) {
        this.id_venda = id_venda;
        this.id_cliente = id_cliente;
        this.dt_venda = dt_venda !== null && dt_venda !== void 0 ? dt_venda : "";
        this.vr_venda = vr_venda !== null && vr_venda !== void 0 ? vr_venda : 0;
        this.status = status !== null && status !== void 0 ? status : "ABERTA";
    }
    getIdVenda() {
        return this.id_venda;
    }
    getIdCliente() {
        return this.id_cliente;
    }
    getDtVenda() {
        return this.dt_venda;
    }
    getVrVenda() {
        return this.vr_venda;
    }
    getStatus() {
        return this.status;
    }
    static criarVenda(id_cliente, dt_venda) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                dt_venda = dt_venda ? dt_venda : 'NOW()';
                const sql_insert = `
                INSERT INTO tb_venda(id_cliente, dt_venda)
                VALUES ($1, $2) RETURNING id_venda
            `;
                const response = yield (0, db_1.query)(sql_insert, [id_cliente, dt_venda]);
                if ((response === null || response === void 0 ? void 0 : response.length) > 0) {
                    return {
                        result: 'success',
                        message: 'Venda criada com sucesso',
                        data: new Venda(response[0].id_venda, id_cliente, dt_venda, 0)
                    };
                }
                else {
                    throw new Error('Erro ao tentar inserir venda');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar criar venda.'
                };
            }
        });
    }
    static buscarVenda(id_venda) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_search = id_venda
                    ? `SELECT * FROM tb_venda WHERE id_venda = $1`
                    : `SELECT * FROM tb_venda ORDER BY id_venda`;
                const response = yield (0, db_1.query)(sql_search, id_venda ? [id_venda] : []);
                if ((response === null || response === void 0 ? void 0 : response.length) > 0) {
                    return {
                        result: 'success',
                        message: 'Venda(s) encontrada(s) com sucesso',
                        data: response
                    };
                }
                else {
                    throw new Error('Erro ao tentar buscar venda(s).');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar buscar venda(s).'
                };
            }
        });
    }
    atualizarVenda(id_cliente, dt_venda, vr_venda) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_update = `
                UPDATE tb_venda
                    SET id_cliente = $1,
                    dt_venda = $2,
                    vr_venda = $3,
                    WHERE id_venda = $4;
            `;
                const response = yield (0, db_1.query)(sql_update, [id_cliente, dt_venda, vr_venda, this.id_venda]);
                if (response) {
                    this.id_cliente = id_cliente;
                    this.dt_venda = dt_venda;
                    this.vr_venda = vr_venda;
                    return {
                        result: 'success',
                        message: 'Venda atualizada com sucesso'
                    };
                }
                else {
                    throw new Error('Erro ao tentar atualizar venda.');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar atualizar venda.'
                };
            }
        });
    }
    deletarVenda() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_delete = `DELETE FROM tb_venda WHERE id_venda = $1`;
                const response = yield (0, db_1.query)(sql_delete, [this.id_venda]);
                if (response) {
                    return {
                        result: 'success',
                        message: 'Venda deletada com sucesso'
                    };
                }
                else {
                    throw new Error('Erro ao tentar deletar venda.');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar deletar venda.'
                };
            }
        });
    }
    baixarVenda() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const sql_update = `UPDATE tb_venda SET status  = 'BAIXADA' WHERE id_venda = $1`;
                const response = yield (0, db_1.query)(sql_update, [this.id_venda]);
                if (response) {
                    const movimentacao = yield MovimentoCaixaModel_1.default.criarMovimentoCaixa(`Movimentação referente a venda: ${this.id_venda}`, this.vr_venda, 'VENDA', this.id_venda, 0);
                    if ((movimentacao === null || movimentacao === void 0 ? void 0 : movimentacao.result) === 'success') {
                        this.status = 'BAIXADA';
                        return {
                            result: 'success',
                            message: `Venda baixada com sucesso.`
                        };
                    }
                    else {
                        throw new Error((_a = movimentacao === null || movimentacao === void 0 ? void 0 : movimentacao.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar baixar venda.');
                    }
                }
                else {
                    throw new Error('Erro ao tentar baixar venda.');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : 'Erro ao baixar a vendas.'
                };
            }
        });
    }
    extornarVenda() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const sql_update = `UPDATE tb_venda SET status  = 'ABERTA' WHERE id_venda = $1`;
                const response = yield (0, db_1.query)(sql_update, [this.id_venda]);
                if (response) {
                    const movimentacao = yield MovimentoCaixaModel_1.default.deletarMovimentoCaixa(this.id_venda, 0);
                    if ((movimentacao === null || movimentacao === void 0 ? void 0 : movimentacao.result) === 'success') {
                        this.status = 'ABERTA';
                        return {
                            result: 'success',
                            message: `Venda extornada com sucesso.`
                        };
                    }
                    else {
                        throw new Error((_a = movimentacao === null || movimentacao === void 0 ? void 0 : movimentacao.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar extornar venda.');
                    }
                }
                else {
                    throw new Error('Erro ao tentar baixar venda.');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : 'Erro ao baixar a vendas.'
                };
            }
        });
    }
}
exports.default = Venda;
