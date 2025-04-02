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
    static buscaMovimentoCaixa() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_search = `SELECT * FROM tb_movimento_caixa ORDER BY id_movimento_caixa DESC`;
                const response = yield app_1.db.all(sql_search);
                return {
                    result: 'success',
                    message: response.length > 0
                        ? 'Movimentações encontradas com sucesso'
                        : 'Nenhuma movimentação encontrada',
                    data: response.length > 0 ? response : null
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar buscar movimentações.'
                };
            }
        });
    }
    static criarMovimentoCaixa(tx_descricao, vr_movimento, tx_tipo_movimento, id_venda, id_compra, dt_movimento) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_insert = `
                INSERT INTO tb_movimento_caixa(
                    tx_descricao, vr_movimento, tx_tipo_movimento, 
                    dt_movimento, id_venda, id_compra
                ) VALUES (?, ?, ?, ${dt_movimento ? '?' : 'datetime("now")'}, ?, ?)
            `;
                const params = [
                    tx_descricao,
                    vr_movimento,
                    tx_tipo_movimento,
                    ...(dt_movimento ? [dt_movimento] : []),
                    id_venda !== null && id_venda !== void 0 ? id_venda : 0,
                    id_compra !== null && id_compra !== void 0 ? id_compra : 0
                ];
                const result = yield app_1.db.run(sql_insert, params);
                if (result.lastID) {
                    return {
                        result: 'success',
                        message: 'Movimentação de caixa realizada com sucesso',
                        data: new MovimentoCaixa(result.lastID, id_venda !== null && id_venda !== void 0 ? id_venda : 0, id_compra !== null && id_compra !== void 0 ? id_compra : 0, tx_descricao, vr_movimento, dt_movimento !== null && dt_movimento !== void 0 ? dt_movimento : new Date().toISOString(), tx_tipo_movimento)
                    };
                }
                throw new Error('Falha ao criar movimentação');
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
                const sql_delete = id_venda
                    ? `DELETE FROM tb_movimento_caixa WHERE id_venda = ?`
                    : `DELETE FROM tb_movimento_caixa WHERE id_compra = ?`;
                const id = id_venda !== null && id_venda !== void 0 ? id_venda : id_compra;
                const result = yield app_1.db.run(sql_delete, [id]);
                return {
                    result: result ? 'success' : 'error',
                    message: result
                        ? 'Movimentação deletada com sucesso'
                        : 'Nenhuma movimentação foi deletada'
                };
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
