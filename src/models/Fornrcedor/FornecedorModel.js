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
const db_1 = __importDefault(require("../../services/db"));
class Fornecedor {
    constructor(id_fornecedor, tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, tx_pais, tx_uf, tx_cidade, tx_endereco) {
        this.id_fornecedor = id_fornecedor;
        this.tx_razao_social = tx_razao_social !== null && tx_razao_social !== void 0 ? tx_razao_social : "";
        this.tx_cpf_cnpj = tx_cpf_cnpj !== null && tx_cpf_cnpj !== void 0 ? tx_cpf_cnpj : "";
        this.tx_email = tx_email !== null && tx_email !== void 0 ? tx_email : "";
        this.tx_telefone = tx_telefone !== null && tx_telefone !== void 0 ? tx_telefone : "";
        this.vr_frete = vr_frete !== null && vr_frete !== void 0 ? vr_frete : 0;
        this.nu_dias_previsao_inicial_entrega = nu_dias_previsao_inicial_entrega !== null && nu_dias_previsao_inicial_entrega !== void 0 ? nu_dias_previsao_inicial_entrega : 0;
        this.nu_dias_previsao_final_entrega = nu_dias_previsao_final_entrega !== null && nu_dias_previsao_final_entrega !== void 0 ? nu_dias_previsao_final_entrega : 0;
        this.tx_pais = tx_pais !== null && tx_pais !== void 0 ? tx_pais : "";
        this.tx_uf = tx_uf !== null && tx_uf !== void 0 ? tx_uf : "";
        this.tx_cidade = tx_cidade !== null && tx_cidade !== void 0 ? tx_cidade : "";
        this.tx_endereco = tx_endereco !== null && tx_endereco !== void 0 ? tx_endereco : "";
    }
    getIdFornecedor() {
        return this.id_fornecedor;
    }
    getTxRazaoSocial() {
        return this.tx_razao_social;
    }
    getTxCnpjCpf() {
        return this.tx_cpf_cnpj;
    }
    getTxEmail() {
        return this.tx_email;
    }
    getTxTelefone() {
        return this.tx_telefone;
    }
    getVrFrete() {
        return this.vr_frete;
    }
    getNuDiasPrevisaoInicialEntrega() {
        return this.nu_dias_previsao_inicial_entrega;
    }
    getNuDiasPrevisaoFinalEntrega() {
        return this.nu_dias_previsao_final_entrega;
    }
    getTxPais() {
        return this.tx_pais;
    }
    getTxUf() {
        return this.tx_uf;
    }
    getTxCidade() {
        return this.tx_cidade;
    }
    getTxEndereco() {
        return this.tx_endereco;
    }
    static criarFornecedor(tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, tx_pais, tx_uf, tx_cidade, tx_endereco) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_insert = `
                INSERT INTO tb_fornecedor(tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, tx_pais, tx_uf, tx_cidade, tx_endereco)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id_fornecedor
            `;
                const response = yield db_1.default.query(sql_insert, [tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, tx_pais, tx_uf, tx_cidade, tx_endereco]);
                if ((response === null || response === void 0 ? void 0 : response.length) > 0) {
                    return {
                        result: 'success',
                        message: 'Fornecedor criado com sucesso',
                        data: new Fornecedor(response[0].id_fornecedor, tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, tx_pais, tx_uf, tx_cidade, tx_endereco)
                    };
                }
                else {
                    throw new Error('Erro ao tentar inserir fornecedor');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar criar fornecedor.'
                };
            }
        });
    }
    static buscarFornecedor(id_fornecedor) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_search = id_fornecedor
                    ? `SELECT * FROM tb_fornecedor WHERE id_fornecedor = $1`
                    : `SELECT * FROM tb_fornecedor ORDER BY id_fornecedor`;
                const response = yield db_1.default.query(sql_search, id_fornecedor ? [id_fornecedor] : []);
                if ((response === null || response === void 0 ? void 0 : response.length) > 0) {
                    return {
                        result: 'success',
                        message: 'Fornecedor(es) encontrado(s) com sucesso',
                        data: response
                    };
                }
                else {
                    throw new Error('Erro ao tentar buscar fornecedor(es).');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar buscar fornecedor(es).'
                };
            }
        });
    }
    atualizarFornecedor(tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, tx_pais, tx_uf, tx_cidade, tx_endereco) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_update = `
                UPDATE tb_fornecedor
                    SET tx_razao_social = $1,
                        tx_cpf_cnpj = $2,
                        tx_email = $3,
                        tx_telefone = $4,
                        vr_frete = $5,
                        nu_dias_previsao_inicial_entrega = $6,
                        nu_dias_previsao_final_entrega = $7,
                        tx_pais = $8,
                        tx_uf = $9,
                        tx_cidade = $10,
                        tx_endereco = $11
                    WHERE id_fornecedor = $12;
            `;
                const response = yield db_1.default.query(sql_update, [tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, tx_pais, tx_uf, tx_cidade, tx_endereco, this.id_fornecedor]);
                if (response) {
                    this.tx_razao_social = tx_razao_social;
                    this.tx_cpf_cnpj = tx_cpf_cnpj;
                    this.tx_email = tx_email;
                    this.tx_telefone = tx_telefone;
                    this.vr_frete = vr_frete;
                    this.nu_dias_previsao_inicial_entrega = nu_dias_previsao_inicial_entrega;
                    this.nu_dias_previsao_final_entrega = nu_dias_previsao_final_entrega;
                    this.tx_pais = tx_pais;
                    this.tx_uf = tx_uf;
                    this.tx_cidade = tx_cidade;
                    this.tx_endereco = tx_endereco;
                    return {
                        result: 'success',
                        message: 'Fornecedor atualizado com sucesso'
                    };
                }
                else {
                    throw new Error('Erro ao tentar atualizar fornecedor.');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar atualizar fornecedor.'
                };
            }
        });
    }
    deletarFornecedor() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sql_delete = `DELETE FROM tb_fornecedor WHERE id_fornecedor = $1`;
                const response = yield db_1.default.query(sql_delete, [this.id_fornecedor]);
                if (response) {
                    return {
                        result: 'success',
                        message: 'Fornecedor deletado com sucesso'
                    };
                }
                else {
                    throw new Error('Erro ao tentar deletar fornecedor.');
                }
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao tentar deletar fornecedor.'
                };
            }
        });
    }
    static criarFornecedoresLote(fornecedores) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield Promise.all(fornecedores.map(fornecedor => this.criarFornecedor(fornecedor.tx_razao_social, fornecedor.tx_cpf_cnpj, fornecedor.tx_email, fornecedor.tx_telefone, fornecedor.vr_frete, fornecedor.nu_dias_previsao_inicial_entrega, fornecedor.nu_dias_previsao_final_entrega, fornecedor.tx_pais, fornecedor.tx_uf, fornecedor.tx_cidade, fornecedor.tx_endereco)));
                return {
                    result: 'success',
                    message: `${response.length} fornecedores criados com sucesso.`,
                    data: response
                };
            }
            catch (error) {
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao criar fornecedores em lote.'
                };
            }
        });
    }
}
exports.default = Fornecedor;
