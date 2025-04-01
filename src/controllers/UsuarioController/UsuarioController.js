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
const UsuarioModel_1 = __importDefault(require("../../models/Usuario/UsuarioModel"));
class UsuarioController {
    // Login
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tx_email, tx_senha } = req.body;
            const result = yield UsuarioModel_1.default.loginUsuario(tx_email, tx_senha);
            return res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
    // Criar usuário
    static criar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tx_nome, tx_email, tx_senha } = req.body;
            const result = yield UsuarioModel_1.default.criarUsuario(tx_nome, tx_email, tx_senha);
            return res.status(result.result === "success" ? 201 : 400).json(result);
        });
    }
    // Buscar usuários (todos ou por ID)
    static buscar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario } = req.query;
            const result = yield UsuarioModel_1.default.buscarUsuario(id_usuario ? Number(id_usuario) : undefined);
            return res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
    // Atualizar usuário
    static atualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario, tx_nome, tx_email, tx_senha } = req.body;
            const usuario = new UsuarioModel_1.default(Number(id_usuario));
            const result = yield usuario.atualizarUsuario(tx_nome, tx_email, tx_senha);
            return res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
    // Deletar usuário
    static deletar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario } = req.query;
            const usuario = new UsuarioModel_1.default(Number(id_usuario));
            const result = yield usuario.deletarUsuario();
            return res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
}
exports.default = UsuarioController;
