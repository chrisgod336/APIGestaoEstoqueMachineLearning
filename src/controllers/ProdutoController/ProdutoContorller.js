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
const ProdutoModel_1 = __importDefault(require("../../models/Produto/ProdutoModel"));
class ProdutoController {
    static criar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda } = req.body;
            const result = yield ProdutoModel_1.default.criarProduto(id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda);
            return res.status(result.result === "success" ? 201 : 400).json(result);
        });
    }
    static buscar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_produto } = req.query;
            const result = yield ProdutoModel_1.default.buscarProduto(id_produto ? Number(id_produto) : undefined);
            return res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
    static atualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_produto, id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda } = req.body;
            if (!id_produto) {
                return res.status(400).json({ result: "error", message: "ID do produto é obrigatório." });
            }
            const produto = new ProdutoModel_1.default(id_produto, id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda);
            const result = yield produto.atualizarProduto(id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda);
            return res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
    static deletar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_produto } = req.query;
            if (!id_produto) {
                return res.status(400).json({ result: "error", message: "ID do produto é obrigatório." });
            }
            const produto = new ProdutoModel_1.default(Number(id_produto));
            const result = yield produto.deletarProduto();
            return res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
    static criarLote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { produtos } = req.body;
            if (!Array.isArray(produtos) || produtos.length === 0) {
                return res.status(400).json({ result: "error", message: "Lista de produtos inválida." });
            }
            const result = yield ProdutoModel_1.default.criarProdutosLote(produtos);
            return res.status(result.result === "success" ? 201 : 400).json(result);
        });
    }
}
exports.default = ProdutoController;
