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
const FornecedorModel_1 = __importDefault(require("../../models/Fornrcedor/FornecedorModel"));
class FornecedorController {
    // Criar fornecedor
    static criar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, tx_pais, tx_uf, tx_cidade, tx_endereco } = req.body;
            const result = yield FornecedorModel_1.default.criarFornecedor(tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, tx_pais, tx_uf, tx_cidade, tx_endereco);
            return res.status(result.result === "success" ? 201 : 400).json(result);
        });
    }
    // Buscar fornecedores (todos ou por ID)
    static buscar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_fornecedor } = req.query;
            const result = yield FornecedorModel_1.default.buscarFornecedor(id_fornecedor ? Number(id_fornecedor) : undefined);
            return res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
    // Atualizar fornecedor
    static atualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_fornecedor, tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, tx_pais, tx_uf, tx_cidade, tx_endereco } = req.body;
            const fornecedor = new FornecedorModel_1.default(Number(id_fornecedor));
            const result = yield fornecedor.atualizarFornecedor(tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, tx_pais, tx_uf, tx_cidade, tx_endereco);
            return res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
    // Deletar fornecedor
    static deletar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_fornecedor } = req.query;
            const fornecedor = new FornecedorModel_1.default(Number(id_fornecedor));
            const result = yield fornecedor.deletarFornecedor();
            return res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
    // Criar fornecedores em lote
    static criarLote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fornecedores } = req.body;
            const result = yield FornecedorModel_1.default.criarFornecedoresLote(fornecedores);
            return res.status(result.result === "success" ? 201 : 400).json(result);
        });
    }
}
exports.default = FornecedorController;
