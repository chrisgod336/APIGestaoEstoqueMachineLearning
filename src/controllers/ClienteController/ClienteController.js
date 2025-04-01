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
const ClienteModel_1 = __importDefault(require("../../models/Cliente/ClienteModel"));
class ClienteController {
    // Criar cliente
    static criar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tx_nome, tx_cpf_cnpj, tx_email, tx_telefone } = req.body;
            const result = yield ClienteModel_1.default.criarCliente(tx_nome, tx_cpf_cnpj, tx_email, tx_telefone);
            return res.status(result.result === "success" ? 201 : 400).json(result);
        });
    }
    // Buscar clientes (todos ou por ID)
    static buscar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_cliente } = req.query;
            const result = yield ClienteModel_1.default.buscarCliente(id_cliente ? Number(id_cliente) : undefined);
            return res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
    // Atualizar cliente
    static atualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_cliente, tx_nome, tx_cpf_cnpj, tx_email, tx_telefone } = req.body;
            const cliente = new ClienteModel_1.default(Number(id_cliente));
            const result = yield cliente.atualizarCliente(tx_nome, tx_cpf_cnpj, tx_email, tx_telefone);
            return res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
    // Deletar cliente
    static deletar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_cliente } = req.query;
            const cliente = new ClienteModel_1.default(Number(id_cliente));
            const result = yield cliente.deletarCliente();
            return res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
    // Criar clientes em lote
    static criarLote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { clientes } = req.body;
            const result = yield ClienteModel_1.default.criarClienteLote(clientes);
            return res.status(result.result === "success" ? 201 : 400).json(result);
        });
    }
}
exports.default = ClienteController;
