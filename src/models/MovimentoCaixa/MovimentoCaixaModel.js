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
class MovimentoCaixa {
    constructor(id_movimento_caixa, id_venda, id_compra, tx_descricao, vr_movimento, dt_movimento, tx_tipo_movimento) {
        this.id_movimento_caixa = id_movimento_caixa;
        this.id_venda = id_venda;
        this.id_compra = id_compra;
        this.tx_descricao = tx_descricao !== null && tx_descricao !== void 0 ? tx_descricao : "";
        this.vr_movimento = vr_movimento !== null && vr_movimento !== void 0 ? vr_movimento : 0;
        this.dt_movimento = dt_movimento !== null && dt_movimento !== void 0 ? dt_movimento : "";
        this.tx_tipo_movimento = tx_tipo_movimento !== null && tx_tipo_movimento !== void 0 ? tx_tipo_movimento : "";
    }
    getIdMovimentoCaixa() {
        return this.id_movimento_caixa;
    }
    getIdVenda() {
        return this.id_venda;
    }
    getIdCompra() {
        return this.id_compra;
    }
    getTxDescricao() {
        return this.tx_descricao;
    }
    getVrMovimento() {
        return this.vr_movimento;
    }
    getDtMovimento() {
        return this.dt_movimento;
    }
    getTxTipoMovimento() {
        return this.tx_tipo_movimento;
    }
    static criarMovimentoCaixa(tx_descricao, vr_movimento, tx_tipo_movimento, id_venda, id_compra, dt_movimento) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                dt_movimento = dt_movimento ? dt_movimento : 'NOW()';
                id_venda = id_venda ? id_venda : 0;
                id_compra = id_compra ? id_compra : 0;
                const sql_insert = `
                INSERT INTO tb_movimento_caixa(tx_descricao, vr_movimento, tx_tipo_movimento, dt_movimento, id_venda, id_compra)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_movimento_caixa
            `;
                const response = yield (0, db_1.query)(sql_insert, [tx_descricao, vr_movimento, tx_tipo_movimento, dt_movimento, id_venda, id_compra]);
                if ((response === null || response === void 0 ? void 0 : response.length) > 0) {
                    return {
                        result: 'success',
                        message: 'Movimentação de caixa realizada com sucesso',
                        data: new MovimentoCaixa(response[0].id_movimento_caixa, response[0].tx_descricao, response[0].vr_movimento, response[0].tx_tipo_movimento, response[0].dt_movimento, response[0].id_venda, response[0].id_compra)
                    };
                }
                else {
                    throw new Error('Erro ao tentar inserir movimentação.');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar criar movimentação.'
                };
            }
        });
    }
    static deletarMovimentoCaixa(id_venda, id_compra) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_delete = id_venda ?
                    `DELETE FROM tb_movimento_caixa WHERE id_venda = $1` :
                    `DELETE FROM tb_movimento_caixa WHERE id_compra = $1`;
                const response = yield (0, db_1.query)(sql_delete, [id_venda ? id_venda : id_compra]);
                if (response) {
                    return {
                        result: 'success',
                        message: 'Movimentação deletada com sucesso'
                    };
                }
                else {
                    throw new Error('Erro ao tentar deletar movimentação.');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar deletar movimentação.'
                };
            }
        });
    }
}
exports.default = MovimentoCaixa;
