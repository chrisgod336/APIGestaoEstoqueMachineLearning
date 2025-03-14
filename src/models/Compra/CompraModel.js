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
const MovimentoCaixaModel_1 = __importDefault(require("../MovimentoCaixa/MovimentoCaixaModel"));
class Compra {
    constructor(id_compra, id_fornecedor, id_local_estoque, dt_compra, tx_status, dt_previsao_entrega_inicial, dt_previsao_entrega_final, vr_total_compra, vr_compra, vr_frete, dt_entrega) {
        this.id_compra = id_compra;
        this.id_fornecedor = id_fornecedor;
        this.id_local_estoque = id_local_estoque;
        this.dt_compra = dt_compra !== null && dt_compra !== void 0 ? dt_compra : "";
        this.vr_total_compra = vr_total_compra !== null && vr_total_compra !== void 0 ? vr_total_compra : 0;
        this.vr_compra = vr_compra !== null && vr_compra !== void 0 ? vr_compra : 0;
        this.vr_frete = vr_frete !== null && vr_frete !== void 0 ? vr_frete : 0;
        this.tx_status = tx_status !== null && tx_status !== void 0 ? tx_status : "PENDENTE";
        this.dt_previsao_entrega_inicial = dt_previsao_entrega_inicial !== null && dt_previsao_entrega_inicial !== void 0 ? dt_previsao_entrega_inicial : "";
        this.dt_previsao_entrega_final = dt_previsao_entrega_final !== null && dt_previsao_entrega_final !== void 0 ? dt_previsao_entrega_final : "";
        this.dt_entrega = dt_entrega !== null && dt_entrega !== void 0 ? dt_entrega : "";
    }
    getIdCompra() {
        return this.id_compra;
    }
    getIdFornecedor() {
        return this.id_fornecedor;
    }
    getIdLocalEstoque() {
        return this.id_local_estoque;
    }
    getDtCompra() {
        return this.dt_compra;
    }
    getVrTotalCompra() {
        return this.vr_total_compra;
    }
    getVrCompra() {
        return this.vr_compra;
    }
    getVrFrete() {
        return this.vr_frete;
    }
    getTxStatus() {
        return this.tx_status;
    }
    getDtPrevisaoEntregaInicial() {
        return this.dt_previsao_entrega_inicial;
    }
    getDtPrevisaoEntregaFinal() {
        return this.dt_previsao_entrega_final;
    }
    getDtEntrega() {
        return this.dt_entrega;
    }
    static calcularPeriodoEntrega(id_fornecedor, dt_compra) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_search = `SELECT nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega FROM tb_fornecedores WHERE id_fornecedor = $1`;
                const values = [id_fornecedor];
                const response = yield db_1.default.query(sql_search, values);
                if ((response === null || response === void 0 ? void 0 : response.length) > 0) {
                    const dias_inc = response[0].nu_dias_previsao_inicial_entrega;
                    const dias_fim = response[0].nu_dias_previsao_final_entrega;
                    const dataCompra = new Date(dt_compra);
                    if (isNaN(dataCompra.getTime())) {
                        return {
                            result: 'error',
                            message: 'Data de compra inválida.'
                        };
                    }
                    const previsaoInicial = new Date(dataCompra);
                    previsaoInicial.setDate(previsaoInicial.getDate() + dias_inc);
                    const previsaoFinal = new Date(dataCompra);
                    previsaoFinal.setDate(previsaoFinal.getDate() + dias_fim);
                    return {
                        result: 'success',
                        previsao_inicial: previsaoInicial.toISOString().split('T')[0],
                        previsao_final: previsaoFinal.toISOString().split('T')[0]
                    };
                }
                else {
                    return {
                        result: 'error',
                        message: 'Não foi possível encontrar o período de entrega do fornecedor.'
                    };
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Não foi possível encontrar o período de entrega do fornecedor.'
                };
            }
        });
    }
    static criarCompra(id_fornecedor, id_local_estoque, dt_compra) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                dt_compra = dt_compra ? dt_compra : 'NOW()';
                const periodo_entrega = yield this.calcularPeriodoEntrega(id_fornecedor, dt_compra);
                if (!periodo_entrega || (periodo_entrega === null || periodo_entrega === void 0 ? void 0 : periodo_entrega.result) !== 'success') {
                    throw new Error((_a = periodo_entrega === null || periodo_entrega === void 0 ? void 0 : periodo_entrega.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar calcular o período de entrega.');
                }
                const { previsao_inicial, previsao_final } = periodo_entrega;
                const sql_insert = `
                INSERT INTO tb_compra(id_fornecedor, id_local_estoque, dt_compra, tx_status, dt_previsao_entrega_inicial, dt_previsao_entrega_final)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_compra
            `;
                const response = yield db_1.default.query(sql_insert, [id_fornecedor, id_local_estoque, dt_compra, 'PENDENTE', previsao_inicial, previsao_final]);
                if ((response === null || response === void 0 ? void 0 : response.length) > 0) {
                    return {
                        result: 'success',
                        message: 'Compra criada com sucesso',
                        data: new Compra(response[0].id_compra, id_fornecedor, id_local_estoque, dt_compra, 'PENDENTE', previsao_inicial, previsao_final, 0, 0, 0)
                    };
                }
                else {
                    throw new Error('Erro ao tentar inserir compra.');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : 'Erro ao tentar criar compra.'
                };
            }
        });
    }
    static buscarCompra(id_compra) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_search = id_compra
                    ? `SELECT * FROM tb_compra WHERE id_compra = $1`
                    : `SELECT * FROM tb_compra ORDER BY id_compra`;
                const response = yield db_1.default.query(sql_search, id_compra ? [id_compra] : []);
                if ((response === null || response === void 0 ? void 0 : response.length) > 0) {
                    return {
                        result: 'success',
                        message: 'Compra(s) encontrada(s) com sucesso',
                        data: response
                    };
                }
                else {
                    throw new Error('Erro ao tentar buscar compra(s).');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar buscar compra(s).'
                };
            }
        });
    }
    atualizarCompra(id_fornecedor, id_local_estoque, dt_compra, vr_frete) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const periodo_entrega = yield Compra.calcularPeriodoEntrega(id_fornecedor, dt_compra);
                const vr_total_compra = this.vr_compra - vr_frete;
                if (!periodo_entrega || (periodo_entrega === null || periodo_entrega === void 0 ? void 0 : periodo_entrega.result) !== 'success') {
                    throw new Error((_a = periodo_entrega === null || periodo_entrega === void 0 ? void 0 : periodo_entrega.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar calcular o período de entrega.');
                }
                const { previsao_inicial, previsao_final } = periodo_entrega;
                const sql_update = `
                UPDATE tb_compra
                    SET id_fornecedor = $1,
                    id_local_estoque = $2,
                    dt_compra = $3,
                    vr_total_compra = $4,
                    vr_frete = $5,
                    dt_previsao_entrega_inicial = $6
                    dt_previsao_entrega_final = $7
                    WHERE id_compra = $8;
            `;
                const response = yield db_1.default.query(sql_update, [id_fornecedor, id_local_estoque, dt_compra, vr_total_compra, vr_frete, previsao_inicial, previsao_final, this.id_compra]);
                if (response) {
                    this.id_fornecedor = id_fornecedor;
                    this.id_local_estoque = id_local_estoque;
                    this.dt_compra = dt_compra;
                    this.vr_total_compra = vr_total_compra;
                    this.vr_frete = vr_frete;
                    this.dt_previsao_entrega_inicial = previsao_inicial;
                    this.dt_previsao_entrega_final = previsao_final;
                    return {
                        result: 'success',
                        message: 'Compra atualizada com sucesso'
                    };
                }
                else {
                    throw new Error('Erro ao tentar atualizar compra.');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : 'Erro ao tentar atualizar compra.'
                };
            }
        });
    }
    deletarCompra() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_delete = `DELETE FROM tb_compra WHERE id_compra = $1`;
                const response = yield db_1.default.query(sql_delete, [this.id_compra]);
                if (response) {
                    return {
                        result: 'success',
                        message: 'Compra deletada com sucesso'
                    };
                }
                else {
                    throw new Error('Erro ao tentar deletar compra.');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar deletar compra.'
                };
            }
        });
    }
    baixarCompra(dt_entrega) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const sql_update = `UPDATE tb_compra SET dt_entrega = $1, tx_status  = 'BAIXADA' WHERE id_compra = $2`;
                const response = yield db_1.default.query(sql_update, [dt_entrega, this.id_compra]);
                if (response) {
                    const movimentacao = yield MovimentoCaixaModel_1.default.criarMovimentoCaixa(`Movimentação referente a compra: ${this.id_compra}`, this.vr_total_compra, 'COMPRA', 0, this.id_compra);
                    if ((movimentacao === null || movimentacao === void 0 ? void 0 : movimentacao.result) === 'success') {
                        this.dt_entrega = dt_entrega;
                        this.tx_status = 'BAIXADA';
                        return {
                            result: 'success',
                            message: `Compra baixada com sucesso.`
                        };
                    }
                    else {
                        throw new Error((_a = movimentacao === null || movimentacao === void 0 ? void 0 : movimentacao.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar baixar compra.');
                    }
                }
                else {
                    throw new Error('Erro ao tentar baixar compra.');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : 'Erro ao baixar a compras.'
                };
            }
        });
    }
    extornarCompra() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const sql_update = `UPDATE tb_compra SET dt_entrega = NULL, tx_status  = 'ABERTA' WHERE id_compra = $1`;
                const response = yield db_1.default.query(sql_update, [this.id_compra]);
                if (response) {
                    const movimentacao = yield MovimentoCaixaModel_1.default.deletarMovimentoCaixa(0, this.id_compra);
                    if ((movimentacao === null || movimentacao === void 0 ? void 0 : movimentacao.result) === 'success') {
                        this.dt_entrega = '';
                        this.tx_status = 'ABERTA';
                        return {
                            result: 'success',
                            message: `Compra extornada com sucesso.`
                        };
                    }
                    else {
                        throw new Error((_a = movimentacao === null || movimentacao === void 0 ? void 0 : movimentacao.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar extornar compra.');
                    }
                }
                else {
                    throw new Error('Erro ao tentar extornar compra.');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : 'Erro ao extornar a compra.'
                };
            }
        });
    }
}
exports.default = Compra;
