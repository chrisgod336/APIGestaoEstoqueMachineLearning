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
class Produto {
    constructor(id_produto, id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda) {
        this.id_produto = id_produto;
        this.id_fornecedor = id_fornecedor !== null && id_fornecedor !== void 0 ? id_fornecedor : 0;
        this.tx_nome = tx_nome !== null && tx_nome !== void 0 ? tx_nome : "";
        this.tx_marca = tx_marca !== null && tx_marca !== void 0 ? tx_marca : "";
        this.vr_preco_compra = vr_preco_compra !== null && vr_preco_compra !== void 0 ? vr_preco_compra : 0;
        this.vr_preco_venda = vr_preco_venda !== null && vr_preco_venda !== void 0 ? vr_preco_venda : 0;
    }
    getIdProduto() {
        return this.id_produto;
    }
    getIdFornecedor() {
        return this.id_fornecedor;
    }
    getTxNome() {
        return this.tx_nome;
    }
    getTxMarca() {
        return this.tx_marca;
    }
    getVrPrecoCompra() {
        return this.vr_preco_compra;
    }
    getVrPrecoVenda() {
        return this.vr_preco_venda;
    }
    static criarProduto(id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_insert = `
                INSERT INTO tb_produto(
                    id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda
                ) VALUES (?, ?, ?, ?, ?)
            `;
                const result = yield app_1.db.run(sql_insert, [
                    id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda
                ]);
                if (result.lastID) {
                    return {
                        result: 'success',
                        message: 'Produto criado com sucesso',
                        data: new Produto(result.lastID, id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda)
                    };
                }
                throw new Error('Falha ao criar produto');
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar criar produto.'
                };
            }
        });
    }
    static buscarProduto(id_produto) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                let sql;
                let params = [];
                if (id_produto) {
                    sql = `SELECT * FROM tb_produto WHERE id_produto = ?`;
                    params = [id_produto];
                }
                else {
                    sql = `SELECT * FROM tb_produto ORDER BY id_produto`;
                }
                const response = yield app_1.db.all(sql, params);
                return {
                    result: 'success',
                    message: response.length > 0
                        ? 'Produto(s) encontrado(s) com sucesso'
                        : id_produto ? 'Produto não encontrado' : 'Nenhum produto cadastrado',
                    data: response.length > 0 ? response : null
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar buscar produto(s).'
                };
            }
        });
    }
    atualizarProduto(id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_update = `
                UPDATE tb_produto
                SET id_fornecedor = ?,
                    tx_nome = ?,
                    tx_marca = ?,
                    vr_preco_compra = ?,
                    vr_preco_venda = ?
                WHERE id_produto = ?
            `;
                const result = yield app_1.db.run(sql_update, [
                    id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda,
                    this.id_produto
                ]);
                if (result) {
                    this.id_fornecedor = id_fornecedor;
                    this.tx_nome = tx_nome;
                    this.tx_marca = tx_marca;
                    this.vr_preco_compra = vr_preco_compra;
                    this.vr_preco_venda = vr_preco_venda;
                    return {
                        result: 'success',
                        message: 'Produto atualizado com sucesso'
                    };
                }
                throw new Error('Nenhum produto foi atualizado');
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar atualizar produto.'
                };
            }
        });
    }
    deletarProduto() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = yield app_1.db.run('DELETE FROM tb_produto WHERE id_produto = ?', [this.id_produto]);
                return {
                    result: result ? 'success' : 'error',
                    message: result
                        ? 'Produto deletado com sucesso'
                        : 'Nenhum produto foi deletado'
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar deletar produto.'
                };
            }
        });
    }
    static criarProdutosLote(produtos) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                yield app_1.db.run('BEGIN TRANSACTION');
                const results = [];
                for (const produto of produtos) {
                    const result = yield app_1.db.run(`INSERT INTO tb_produto(
                        id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda
                    ) VALUES (?, ?, ?, ?, ?)`, [
                        produto.id_fornecedor, produto.tx_nome, produto.tx_marca,
                        produto.vr_preco_compra, produto.vr_preco_venda
                    ]);
                    results.push(result.lastID);
                }
                yield app_1.db.run('COMMIT');
                return {
                    result: 'success',
                    message: `${produtos.length} produtos criados com sucesso.`,
                    data: results
                };
            }
            catch (error) {
                yield app_1.db.run('ROLLBACK');
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao criar produtos em lote.'
                };
            }
        });
    }
}
exports.default = Produto;
