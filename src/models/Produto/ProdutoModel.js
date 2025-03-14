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
                INSERT INTO tb_produto(id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda)
                VALUES ($1, $2, $3, $4, $5) RETURNING id_produto
            `;
                const response = yield db_1.default.query(sql_insert, [id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda]);
                if ((response === null || response === void 0 ? void 0 : response.length) > 0) {
                    return {
                        result: 'success',
                        message: 'Produto criado com sucesso',
                        data: new Produto(response[0].id_produto, id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda)
                    };
                }
                else {
                    throw new Error('Erro ao tentar inserir produto');
                }
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
                const sql_search = id_produto
                    ? `SELECT * FROM tb_produto WHERE id_produto = $1`
                    : `SELECT * FROM tb_produto ORDER BY id_produto`;
                const response = yield db_1.default.query(sql_search, id_produto ? [id_produto] : []);
                if ((response === null || response === void 0 ? void 0 : response.length) > 0) {
                    return {
                        result: 'success',
                        message: 'Produto(s) encontrado(s) com sucesso',
                        data: response
                    };
                }
                else {
                    throw new Error('Erro ao tentar buscar produto(s).');
                }
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
                    SET id_fornecedor = $1,
                    tx_nome = $2,
                    tx_marca = $3,
                    vr_preco_compra = $4,
                    vr_preco_venda = $5
                    WHERE id_produto = $6;
            `;
                const response = yield db_1.default.query(sql_update, [id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda, this.id_produto]);
                if (response) {
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
                else {
                    throw new Error('Erro ao tentar atualizar produto.');
                }
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
                const sql_delete = `DELETE FROM tb_produto WHERE id_produto = $1`;
                const response = yield db_1.default.query(sql_delete, [this.id_produto]);
                if (response) {
                    return {
                        result: 'success',
                        message: 'Produto deletado com sucesso'
                    };
                }
                else {
                    throw new Error('Erro ao tentar deletar produto.');
                }
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
                const response = yield Promise.all(produtos.map(produto => this.criarProduto(produto.id_fornecedor, produto.tx_nome, produto.tx_marca, produto.vr_preco_compra, produto.vr_preco_venda)));
                return {
                    result: 'success',
                    message: `${response.length} produtos criados com sucesso.`,
                    data: response
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao criar produtos em lote.'
                };
            }
        });
    }
}
exports.default = Produto;
