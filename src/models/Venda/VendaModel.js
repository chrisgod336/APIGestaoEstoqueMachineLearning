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
                const sql_insert = `
                INSERT INTO tb_venda(id_cliente, dt_venda, vr_venda)
                VALUES (?, ${dt_venda ? '?' : 'datetime("now")'}, 0)
            `;
                const params = dt_venda ? [id_cliente, dt_venda] : [id_cliente];
                const result = yield app_1.db.run(sql_insert, params);
                if (result.lastID) {
                    return {
                        result: 'success',
                        message: 'Venda criada com sucesso',
                        data: new Venda(result.lastID, id_cliente, dt_venda, 0)
                    };
                }
                throw new Error('Falha ao criar venda');
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
                let sql;
                let params = [];
                if (id_venda) {
                    sql = `SELECT * FROM tb_venda WHERE id_venda = ?`;
                    params = [id_venda];
                }
                else {
                    sql = `SELECT tb_venda.*, tb_cliente.id_cliente||' - '||tb_cliente.tx_nome AS cliente 
                        FROM tb_venda 
                        INNER JOIN tb_cliente 
                        ON tb_venda.id_cliente = tb_cliente.id_cliente
                        ORDER BY id_venda
                        `;
                }
                const response = yield app_1.db.all(sql, params);
                return {
                    result: 'success',
                    message: response.length > 0
                        ? 'Venda(s) encontrada(s) com sucesso'
                        : id_venda ? 'Venda não encontrada' : 'Nenhuma venda cadastrada',
                    data: response.length > 0 ? response : null
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar buscar venda(s).'
                };
            }
        });
    }
    atualizarVenda(id_cliente, dt_venda) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_update = `
                UPDATE tb_venda
                SET id_cliente = ?,
                    dt_venda = ?
                WHERE id_venda = ?
            `;
                const result = yield app_1.db.run(sql_update, [id_cliente, dt_venda, this.id_venda]);
                if (result) {
                    this.id_cliente = id_cliente;
                    this.dt_venda = dt_venda;
                    return {
                        result: 'success',
                        message: 'Venda atualizada com sucesso'
                    };
                }
                throw new Error('Nenhuma venda foi atualizada');
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
                const result = yield app_1.db.run('DELETE FROM tb_venda_produto WHERE id_venda = ?', [this.id_venda]);
                const result2 = yield app_1.db.run('DELETE FROM tb_venda WHERE id_venda = ?', [this.id_venda]);
                return {
                    result: (result && result2) ? 'success' : 'error',
                    message: (result && result2)
                        ? 'Venda deletada com sucesso'
                        : 'Nenhuma venda foi deletada'
                };
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
            var _a;
            try {
                yield app_1.db.run('BEGIN TRANSACTION');
                const result = yield app_1.db.run('UPDATE tb_venda SET status = ? WHERE id_venda = ?', ['BAIXADA', this.id_venda]);
                if (result) {
                    this.status = 'BAIXADA';
                    yield app_1.db.run('COMMIT');
                    return {
                        result: 'success',
                        message: 'Venda baixada com sucesso.'
                    };
                }
                throw new Error('Erro ao tentar baixar venda.');
            }
            catch (error) {
                yield app_1.db.run('ROLLBACK');
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao baixar a venda.'
                };
            }
        });
    }
    extornarVenda() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                yield app_1.db.run('BEGIN TRANSACTION');
                const result = yield app_1.db.run('UPDATE tb_venda SET status = ? WHERE id_venda = ?', ['ABERTA', this.id_venda]);
                if (result) {
                    this.status = 'ABERTA';
                    yield app_1.db.run('COMMIT');
                    return {
                        result: 'success',
                        message: 'Venda extornada com sucesso.'
                    };
                }
                throw new Error('Erro ao tentar extornar venda.');
            }
            catch (error) {
                yield app_1.db.run('ROLLBACK');
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao extornar a venda.'
                };
            }
        });
    }
}
exports.default = Venda;
