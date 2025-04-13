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
                const response = yield app_1.db.get('SELECT nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega FROM tb_fornecedor WHERE id_fornecedor = ?', [id_fornecedor]);
                if (!response) {
                    return {
                        result: 'error',
                        message: 'Fornecedor não encontrado'
                    };
                }
                const dias_inc = response.nu_dias_previsao_inicial_entrega;
                const dias_fim = response.nu_dias_previsao_final_entrega;
                const dataCompra = new Date(dt_compra);
                if (isNaN(dataCompra.getTime())) {
                    return {
                        result: 'error',
                        message: 'Data de compra inválida'
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
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao calcular período de entrega'
                };
            }
        });
    }
    static criarCompra(id_fornecedor, id_local_estoque, dt_compra) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const dataCompra = dt_compra !== null && dt_compra !== void 0 ? dt_compra : new Date().toISOString();
                const periodo_entrega = yield this.calcularPeriodoEntrega(id_fornecedor, dataCompra);
                const { previsao_inicial, previsao_final } = periodo_entrega;
                const result = yield app_1.db.run(`INSERT INTO tb_compra(
                    id_fornecedor, id_local_estoque, dt_compra, 
                    tx_status, dt_previsao_entrega_inicial, dt_previsao_entrega_final, vr_total_compra, vr_compra, vr_frete
                ) VALUES (?, ?, ?, ?, ?, ?, 0, 0, 0)`, [
                    id_fornecedor,
                    id_local_estoque,
                    dataCompra,
                    'PENDENTE',
                    previsao_inicial,
                    previsao_final
                ]);
                if (result.lastID) {
                    return {
                        result: 'success',
                        message: 'Compra criada com sucesso',
                        data: new Compra(result.lastID, id_fornecedor, id_local_estoque, dataCompra, 'PENDENTE', previsao_inicial, previsao_final)
                    };
                }
                throw new Error('Falha ao criar compra');
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao criar compra'
                };
            }
        });
    }
    static buscarCompra(id_compra) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                let sql;
                let params = [];
                if (id_compra) {
                    sql = `SELECT * FROM tb_compra WHERE id_compra = ?`;
                    params = [id_compra];
                }
                else {
                    sql = `SELECT * FROM tb_compra ORDER BY id_compra`;
                }
                const response = yield app_1.db.all(sql, params);
                return {
                    result: 'success',
                    message: response.length > 0
                        ? 'Compra(s) encontrada(s) com sucesso'
                        : id_compra ? 'Compra não encontrada' : 'Nenhuma compra cadastrada',
                    data: response.length > 0 ? response : null
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao buscar compra(s)'
                };
            }
        });
    }
    atualizarCompra(id_fornecedor, id_local_estoque, dt_compra, vr_frete) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const periodo_entrega = yield Compra.calcularPeriodoEntrega(id_fornecedor, dt_compra);
                const { previsao_inicial, previsao_final } = periodo_entrega;
                const vr_total_compra = this.vr_compra + vr_frete;
                const result = yield app_1.db.run(`UPDATE tb_compra
                SET id_fornecedor = ?,
                    id_local_estoque = ?,
                    dt_compra = ?,
                    vr_total_compra = ?,
                    vr_frete = ?,
                    dt_previsao_entrega_inicial = ?,
                    dt_previsao_entrega_final = ?
                WHERE id_compra = ?`, [
                    id_fornecedor,
                    id_local_estoque,
                    dt_compra,
                    vr_total_compra,
                    vr_frete,
                    previsao_inicial,
                    previsao_final,
                    this.id_compra
                ]);
                if (result) {
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
                throw new Error('Nenhuma compra foi atualizada');
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao atualizar compra'
                };
            }
        });
    }
    deletarCompra() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = yield app_1.db.run('DELETE FROM tb_compra WHERE id_compra = ?', [this.id_compra]);
                return {
                    result: result ? 'success' : 'error',
                    message: result
                        ? 'Compra deletada com sucesso'
                        : 'Nenhuma compra foi deletada'
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao deletar compra'
                };
            }
        });
    }
    baixarCompra(dt_entrega) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                yield app_1.db.run('BEGIN TRANSACTION');
                const result = yield app_1.db.run('UPDATE tb_compra SET dt_entrega = ?, tx_status = ? WHERE id_compra = ?', [dt_entrega, 'BAIXADA', this.id_compra]);
                if (result) {
                    this.dt_entrega = dt_entrega;
                    this.tx_status = 'BAIXADA';
                    yield app_1.db.run('COMMIT');
                    return {
                        result: 'success',
                        message: 'Compra baixada com sucesso'
                    };
                }
                throw new Error('Falha ao baixar compra');
            }
            catch (error) {
                yield app_1.db.run('ROLLBACK');
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao baixar compra'
                };
            }
        });
    }
    extornarCompra() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                yield app_1.db.run('BEGIN TRANSACTION');
                const result = yield app_1.db.run('UPDATE tb_compra SET dt_entrega = NULL, tx_status = ? WHERE id_compra = ?', ['ABERTA', this.id_compra]);
                if (result) {
                    this.dt_entrega = '';
                    this.tx_status = 'ABERTA';
                    yield app_1.db.run('COMMIT');
                    return {
                        result: 'success',
                        message: 'Compra extornada com sucesso'
                    };
                }
                throw new Error('Falha ao extornar compra');
            }
            catch (error) {
                yield app_1.db.run('ROLLBACK');
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao extornar compra'
                };
            }
        });
    }
}
exports.default = Compra;
