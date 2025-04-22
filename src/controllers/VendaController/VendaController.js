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
const VendaModel_1 = __importDefault(require("../../models/Venda/VendaModel"));
class VendaController {
    static criar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_cliente, dt_venda } = req.body;
            const result = yield VendaModel_1.default.criarVenda(id_cliente, dt_venda);
            return res.status(result.result === "success" ? 201 : 400).json(result);
        });
    }
    static buscar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_venda } = req.query;
            const result = yield VendaModel_1.default.buscarVenda(id_venda ? Number(id_venda) : undefined);
            return res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
    static atualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_venda, id_cliente, dt_venda } = req.body;
            if (!id_venda) {
                return res.status(400).json({ result: "error", message: "ID da venda é obrigatório." });
            }
            const venda = new VendaModel_1.default(id_venda, id_cliente, dt_venda);
            const result = yield venda.atualizarVenda(id_cliente, dt_venda);
            return res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
    static deletar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_venda } = req.query;
            if (!id_venda) {
                return res.status(400).json({ result: "error", message: "ID da venda é obrigatório." });
            }
            const venda = new VendaModel_1.default(Number(id_venda), 0);
            const result = yield venda.deletarVenda();
            return res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
    static baixar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_venda } = req.body;
            if (!id_venda) {
                return res.status(400).json({ result: "error", message: "ID da venda é obrigatório." });
            }
            const venda = new VendaModel_1.default(id_venda, 0);
            const result = yield venda.baixarVenda();
            return res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
    static extornar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_venda } = req.body;
            if (!id_venda) {
                return res.status(400).json({ result: "error", message: "ID da venda é obrigatório." });
            }
            const venda = new VendaModel_1.default(id_venda, 0);
            const result = yield venda.extornarVenda();
            return res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
}
exports.default = VendaController;
