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
const EstoqueModel_1 = __importDefault(require("../../models/Estoque/EstoqueModel"));
class EstoqueController {
    static criarEstoque(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica } = req.body;
            const result = yield EstoqueModel_1.default.criarEstoque(id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica);
            res.status(result.result === "success" ? 201 : 400).json(result);
        });
    }
    static buscarEstoque(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_local_estoque, id_estoque } = req.query;
            const result = yield EstoqueModel_1.default.buscarEstoque(Number(id_local_estoque), id_estoque ? Number(id_estoque) : undefined);
            res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
    static atualizarEstoque(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_estoque } = req.body;
            const { id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica } = req.body;
            const estoque = new EstoqueModel_1.default(Number(id_estoque));
            const result = yield estoque.atualizarEstoque(id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica);
            res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
    static deletarEstoque(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_estoque } = req.query;
            const estoque = new EstoqueModel_1.default(Number(id_estoque));
            const result = yield estoque.deletarEstoque();
            res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
    static atualizarEstoquesLote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { estoques } = req.body;
            const result = yield EstoqueModel_1.default.atualizarEstoquesLote(estoques);
            res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
    static movimentarEstoque(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_local_estoque_ori, id_local_estoque_dest, id_produto, nu_quantidade_mov } = req.body;
            const result = yield EstoqueModel_1.default.movimentarEstoque(id_local_estoque_ori, id_local_estoque_dest, id_produto, nu_quantidade_mov);
            res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
}
exports.default = EstoqueController;
