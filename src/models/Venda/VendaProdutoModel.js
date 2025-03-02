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
class VendaProduto {
    constructor(id_venda_produto, id_venda, id_local_estoque, id_estoque, id_produto, nu_quantidade, vr_total) {
        this.id_venda_produto = id_venda_produto;
        this.id_venda = id_venda;
        this.id_local_estoque = id_local_estoque;
        this.id_estoque = id_estoque;
        this.id_produto = id_produto;
        this.nu_quantidade = nu_quantidade !== null && nu_quantidade !== void 0 ? nu_quantidade : 0;
        this.vr_total = vr_total !== null && vr_total !== void 0 ? vr_total : 0;
    }
    getIdVendaProduto() {
        return this.id_venda_produto;
    }
    getIdVenda() {
        return this.id_venda;
    }
    getIdLocalEstoque() {
        return this.id_local_estoque;
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
    getVrTotal() {
        return this.vr_total;
    }
    static criarVendaProduto(id_venda, id_local_estoque, id_estoque, id_produto, nu_quantidade, vr_total) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_insert = `
                INSERT INTO tb_venda_produto(id_venda, id_local_estoque, id_estoque, id_produto, nu_quantidade, vr_total)
                VALUES ($1, $2, $3, $4, $5, $) RETURNING id_venda¨_produto
            `;
                const response = yield (0, db_1.query)(sql_insert, [id_venda, id_local_estoque, id_estoque, id_produto, nu_quantidade, vr_total]);
                if ((response === null || response === void 0 ? void 0 : response.length) > 0) {
                    return {
                        result: 'success',
                        message: 'Item adicionado a venda com sucesso',
                        data: new VendaProduto(response[0].id_venda_produto, id_venda, id_local_estoque, id_estoque, id_produto, nu_quantidade, vr_total)
                    };
                }
                else {
                    throw new Error('Erro ao tentar adicionar item a venda.');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar adicionar item a venda.'
                };
            }
        });
    }
    static buscarVendaProduto(id_venda, id_venda_produto) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_search = id_venda_produto
                    ? `SELECT * FROM tb_venda_produto WHERE id_venda = $1 AND id_venda_produto = $2`
                    : `SELECT * FROM tb_venda_produto WHERE id_venda = $1 ORDER BY id_venda`;
                const response = yield (0, db_1.query)(sql_search, id_venda_produto ? [id_venda, id_venda_produto] : [id_venda]);
                if ((response === null || response === void 0 ? void 0 : response.length) > 0) {
                    return {
                        result: 'success',
                        message: 'Item(ns) da venda encontrado(s) com sucesso',
                        data: response
                    };
                }
                else {
                    throw new Error('Erro ao tentar buscar item(ns) da venda(s).');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar buscar item(ns) da venda(s).'
                };
            }
        });
    }
    atualizarVendaProduto(id_local_estoque, id_estoque, id_produto, nu_quantidade, vr_total) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_update = `
                UPDATE tb_venda_produto
                    SET id_local_estoque = $1,
                    id_estoque = $2,
                    id_produto = $3,
                    nu_quantidade = $4,
                    vr_total = $5
                    WHERE id_venda = $6
                    AND id_venda_produto = $7;
            `;
                const response = yield (0, db_1.query)(sql_update, [id_local_estoque, id_estoque, id_produto, nu_quantidade, vr_total, this.id_venda, this.id_venda_produto]);
                if (response) {
                    this.id_local_estoque = id_local_estoque;
                    this.id_estoque = id_estoque;
                    this.id_produto = id_produto;
                    this.nu_quantidade = nu_quantidade;
                    this.vr_total = vr_total;
                    return {
                        result: 'success',
                        message: 'Item da venda atualizados com sucesso'
                    };
                }
                else {
                    throw new Error('Erro ao tentar atualizar item da venda.');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar atualizar item da venda.'
                };
            }
        });
    }
    deletarVendaProduto() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_delete = `DELETE FROM tb_venda_produto WHERE id_venda = $1 AND id_venda_produto = $2;`;
                const response = yield (0, db_1.query)(sql_delete, [this.id_venda, this.id_venda_produto]);
                if (response) {
                    return {
                        result: 'success',
                        message: 'Item da venda deletado com sucesso'
                    };
                }
                else {
                    throw new Error('Erro ao tentar deletar item da venda.');
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
}
exports.default = VendaProduto;
