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
const CompraModel_1 = __importDefault(require("../../models/Compra/CompraModel"));
class CompraController {
    static criar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_fornecedor, id_local_estoque, dt_compra } = req.body;
            const result = yield CompraModel_1.default.criarCompra(id_fornecedor, id_local_estoque, dt_compra);
            res.status(result.result === 'success' ? 201 : 400).json(result);
        });
    }
    ;
    static buscar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_compra } = req.query;
            const result = yield CompraModel_1.default.buscarCompra(id_compra ? Number(id_compra) : undefined);
            res.status(result.result === 'success' ? 200 : 404).json(result);
        });
    }
    ;
    static atualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_compra, id_fornecedor, id_local_estoque, dt_compra, vr_frete } = req.body;
            const compra = new CompraModel_1.default(Number(id_compra), id_fornecedor, id_local_estoque);
            const result = yield compra.atualizarCompra(id_fornecedor, id_local_estoque, dt_compra, vr_frete);
            res.status(result.result === 'success' ? 200 : 400).json(result);
        });
    }
    ;
    static deletar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_compra } = req.query;
            const compra = new CompraModel_1.default(Number(id_compra), 0, 0);
            const result = yield compra.deletarCompra();
            res.status(result.result === 'success' ? 200 : 400).json(result);
        });
    }
    ;
    static baixar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_compra, dt_entrega } = req.body;
            const compra = new CompraModel_1.default(Number(id_compra), 0, 0);
            const result = yield compra.baixarCompra(dt_entrega);
            res.status(result.result === 'success' ? 200 : 400).json(result);
        });
    }
    ;
    static extornar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_compra } = req.body;
            const compra = new CompraModel_1.default(Number(id_compra), 0, 0);
            const result = yield compra.extornarCompra();
            res.status(result.result === 'success' ? 200 : 400).json(result);
        });
    }
    ;
}
exports.default = CompraController;
