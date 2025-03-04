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
const CompraProdutoModel_1 = __importDefault(require("../../models/Compra/CompraProdutoModel"));
class CompraProdutoController {
    static criar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_compra, id_estoque, id_produto, nu_quantidade } = req.body;
                const result = yield CompraProdutoModel_1.default.criarCompraProduto(id_compra, id_estoque, id_produto, nu_quantidade);
                return res.status(result.result === 'success' ? 201 : 400).json(result);
            }
            catch (error) {
                return res.status(500).json({ result: 'error', message: error.message || 'Erro ao criar compra produto.' });
            }
        });
    }
    static buscar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_compra, id_compra_produto } = req.params;
                const result = yield CompraProdutoModel_1.default.buscarCompraProduto(Number(id_compra), id_compra_produto ? Number(id_compra_produto) : undefined);
                return res.status(result.result === 'success' ? 200 : 400).json(result);
            }
            catch (error) {
                return res.status(500).json({ result: 'error', message: error.message || 'Erro ao buscar compra produto.' });
            }
        });
    }
    static atualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_compra_produto } = req.params;
                const { id_estoque, id_produto, nu_quantidade } = req.body;
                const compraProduto = new CompraProdutoModel_1.default(Number(id_compra_produto), 0, id_estoque, id_produto, nu_quantidade);
                const result = yield compraProduto.atualizarCompraProduto(id_estoque, id_produto, nu_quantidade);
                return res.status(result.result === 'success' ? 200 : 400).json(result);
            }
            catch (error) {
                return res.status(500).json({ result: 'error', message: error.message || 'Erro ao atualizar compra produto.' });
            }
        });
    }
    static deletar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_compra_produto } = req.params;
                const compraProduto = new CompraProdutoModel_1.default(Number(id_compra_produto), 0, 0, 0);
                const result = yield compraProduto.deletarCompraProduto();
                return res.status(result.result === 'success' ? 200 : 400).json(result);
            }
            catch (error) {
                return res.status(500).json({ result: 'error', message: error.message || 'Erro ao deletar compra produto.' });
            }
        });
    }
}
exports.default = CompraProdutoController;
