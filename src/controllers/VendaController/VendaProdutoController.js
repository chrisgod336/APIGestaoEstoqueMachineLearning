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
const VendaProdutoModel_1 = __importDefault(require("../../models/Venda/VendaProdutoModel"));
class VendaProdutoController {
    static criar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_venda, id_local_estoque, id_estoque, id_produto, nu_quantidade, vr_total } = req.body;
                const resultado = yield VendaProdutoModel_1.default.criarVendaProduto(id_venda, id_local_estoque, id_estoque, id_produto, nu_quantidade, vr_total);
                res.status(201).json(resultado);
            }
            catch (error) {
                res.status(500).json({ result: "error", message: error.message });
            }
        });
    }
    static buscar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_venda, id_venda_produto } = req.query;
                const resultado = yield VendaProdutoModel_1.default.buscarVendaProduto(Number(id_venda), id_venda_produto ? Number(id_venda_produto) : undefined);
                res.status(200).json(resultado);
            }
            catch (error) {
                res.status(500).json({ result: "error", message: error.message });
            }
        });
    }
    static atualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_venda_produto } = req.params;
                const { id_local_estoque, id_estoque, id_produto, nu_quantidade, vr_total } = req.body;
                const vendaProduto = new VendaProdutoModel_1.default(Number(id_venda_produto), 0, 0, 0, 0); // Apenas ID é necessário para update
                const resultado = yield vendaProduto.atualizarVendaProduto(id_local_estoque, id_estoque, id_produto, nu_quantidade, vr_total);
                res.status(200).json(resultado);
            }
            catch (error) {
                res.status(500).json({ result: "error", message: error.message });
            }
        });
    }
    static deletar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_venda_produto, id_venda } = req.params;
                const vendaProduto = new VendaProdutoModel_1.default(Number(id_venda_produto), Number(id_venda), 0, 0, 0);
                const resultado = yield vendaProduto.deletarVendaProduto();
                res.status(200).json(resultado);
            }
            catch (error) {
                res.status(500).json({ result: "error", message: error.message });
            }
        });
    }
}
exports.default = VendaProdutoController;
