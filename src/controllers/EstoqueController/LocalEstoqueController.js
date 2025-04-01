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
const LocalEstoqueModel_1 = __importDefault(require("../../models/Estoque/LocalEstoqueModel"));
class LocalEstoqueController {
    static criar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco } = req.body;
            const resultado = yield LocalEstoqueModel_1.default.criarLocalEstoque(tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco);
            res.json(resultado);
        });
    }
    static buscar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_local_estoque } = req.query;
            const resultado = yield LocalEstoqueModel_1.default.buscarLocalEstoque(id_local_estoque ? Number(id_local_estoque) : undefined);
            res.json(resultado);
        });
    }
    static atualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_local_estoque, tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco } = req.body;
            if (!id_local_estoque) {
                return res.status(400).json({ result: "error", message: "ID do local de estoque é obrigatório." });
            }
            const local = new LocalEstoqueModel_1.default(id_local_estoque);
            const resultado = yield local.atualizarLocalEstoque(tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco);
            res.json(resultado);
        });
    }
    static deletar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_local_estoque } = req.query;
            if (!id_local_estoque) {
                return res.status(400).json({ result: "error", message: "ID do local de estoque é obrigatório." });
            }
            const local = new LocalEstoqueModel_1.default(Number(id_local_estoque));
            const resultado = yield local.deletarLocalEstoque();
            res.json(resultado);
        });
    }
    static criarLote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { locais_estoque } = req.body;
            if (!Array.isArray(locais_estoque) || locais_estoque.length === 0) {
                return res.status(400).json({ result: "error", message: "Lista de locais de estoque inválida." });
            }
            const resultado = yield LocalEstoqueModel_1.default.criarLocaisEstoqueLote(locais_estoque);
            res.json(resultado);
        });
    }
}
exports.default = LocalEstoqueController;
