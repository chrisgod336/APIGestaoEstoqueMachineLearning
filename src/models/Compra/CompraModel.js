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
    constructor(id_compra, id_fornecedor, dt_compra, tx_status, vr_total_compra, vr_compra, vr_frete, dt_entrega) {
        this.id_compra = id_compra;
        this.id_fornecedor = id_fornecedor;
        this.dt_compra = dt_compra !== null && dt_compra !== void 0 ? dt_compra : "";
        this.vr_total_compra = vr_total_compra !== null && vr_total_compra !== void 0 ? vr_total_compra : 0;
        this.vr_compra = vr_compra !== null && vr_compra !== void 0 ? vr_compra : 0;
        this.vr_frete = vr_frete !== null && vr_frete !== void 0 ? vr_frete : 0;
        this.tx_status = tx_status !== null && tx_status !== void 0 ? tx_status : "ABERTA";
        this.dt_entrega = dt_entrega !== null && dt_entrega !== void 0 ? dt_entrega : "";
    }
    getIdCompra() {
        return this.id_compra;
    }
    getIdFornecedor() {
        return this.id_fornecedor;
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
    getDtEntrega() {
        return this.dt_entrega;
    }
    static criarCompra(id_fornecedor, dt_compra) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const dataCompra = dt_compra !== null && dt_compra !== void 0 ? dt_compra : new Date().toISOString();
                const result = yield app_1.db.run(`INSERT INTO tb_compra(
                    id_fornecedor, dt_compra
                ) VALUES (?, ?, ?, ?, ?)`, [
                    id_fornecedor,
                    dataCompra
                ]);
                if (result.lastID) {
                    return {
                        result: 'success',
                        message: 'Compra criada com sucesso',
                        data: new Compra(result.lastID, id_fornecedor)
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
    atualizarCompra(id_fornecedor, dt_compra, vr_frete) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const vr_total_compra = this.vr_compra + vr_frete;
                const result = yield app_1.db.run(`UPDATE tb_compra
                SET id_fornecedor = ?,
                    dt_compra = ?,
                    vr_total_compra = ?,
                    vr_frete = ?
                WHERE id_compra = ?`, [
                    id_fornecedor,
                    dt_compra,
                    vr_total_compra,
                    vr_frete,
                    this.id_compra
                ]);
                if (result) {
                    this.id_fornecedor = id_fornecedor;
                    this.dt_compra = dt_compra;
                    this.vr_total_compra = vr_total_compra;
                    this.vr_frete = vr_frete;
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
                const result = yield app_1.db.run('DELETE FROM tb_compra_produto WHERE id_compra = ?', [this.id_compra]);
                const result2 = yield app_1.db.run('DELETE FROM tb_compra WHERE id_compra = ?', [this.id_compra]);
                return {
                    result: (result && result2) ? 'success' : 'error',
                    message: (result && result2)
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
