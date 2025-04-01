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
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../../app");
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
                INSERT INTO tb_fornecedor(
                    tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, 
                    vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, 
                    tx_pais, tx_uf, tx_cidade, tx_endereco
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
                const result = yield app_1.db.run(sql_insert, [
                    tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone,
                    vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega,
                    tx_pais, tx_uf, tx_cidade, tx_endereco
                ]);
                if (result.lastID) {
                    return {
                        result: 'success',
                        message: 'Fornecedor criado com sucesso',
                        data: new Fornecedor(result.lastID, tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, tx_pais, tx_uf, tx_cidade, tx_endereco)
                    };
                }
                throw new Error('Falha ao criar fornecedor');
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
                let sql;
                let params = [];
                if (id_fornecedor) {
                    sql = `SELECT * FROM tb_fornecedor WHERE id_fornecedor = ?`;
                    params = [id_fornecedor];
                }
                else {
                    sql = `SELECT * FROM tb_fornecedor ORDER BY id_fornecedor`;
                }
                const response = yield app_1.db.all(sql, params);
                return {
                    result: 'success',
                    message: response.length > 0
                        ? 'Fornecedor(es) encontrado(s) com sucesso'
                        : id_fornecedor ? 'Fornecedor não encontrado' : 'Nenhum fornecedor cadastrado',
                    data: response.length > 0 ? response : null
                };
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
                SET tx_razao_social = ?,
                    tx_cpf_cnpj = ?,
                    tx_email = ?,
                    tx_telefone = ?,
                    vr_frete = ?,
                    nu_dias_previsao_inicial_entrega = ?,
                    nu_dias_previsao_final_entrega = ?,
                    tx_pais = ?,
                    tx_uf = ?,
                    tx_cidade = ?,
                    tx_endereco = ?
                WHERE id_fornecedor = ?
            `;
                const result = yield app_1.db.run(sql_update, [
                    tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone,
                    vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega,
                    tx_pais, tx_uf, tx_cidade, tx_endereco,
                    this.id_fornecedor
                ]);
                if (result) {
                    Object.assign(this, {
                        tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone,
                        vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega,
                        tx_pais, tx_uf, tx_cidade, tx_endereco
                    });
                    return {
                        result: 'success',
                        message: 'Fornecedor atualizado com sucesso'
                    };
                }
                throw new Error('Nenhum fornecedor foi atualizado');
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
                const result = yield app_1.db.run('DELETE FROM tb_fornecedor WHERE id_fornecedor = ?', [this.id_fornecedor]);
                return {
                    result: result ? 'success' : 'error',
                    message: result
                        ? 'Fornecedor deletado com sucesso'
                        : 'Nenhum fornecedor foi deletado'
                };
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
                // Inicia uma transação para melhor performance
                yield app_1.db.run('BEGIN TRANSACTION');
                const results = [];
                for (const fornecedor of fornecedores) {
                    const result = yield app_1.db.run(`INSERT INTO tb_fornecedor(
                        tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone, 
                        vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, 
                        tx_pais, tx_uf, tx_cidade, tx_endereco
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                        fornecedor.tx_razao_social, fornecedor.tx_cpf_cnpj, fornecedor.tx_email, fornecedor.tx_telefone,
                        fornecedor.vr_frete, fornecedor.nu_dias_previsao_inicial_entrega, fornecedor.nu_dias_previsao_final_entrega,
                        fornecedor.tx_pais, fornecedor.tx_uf, fornecedor.tx_cidade, fornecedor.tx_endereco
                    ]);
                    results.push(result.lastID);
                }
                yield app_1.db.run('COMMIT');
                return {
                    result: 'success',
                    message: `${fornecedores.length} fornecedores criados com sucesso.`,
                    data: results
                };
            }
            catch (error) {
                yield app_1.db.run('ROLLBACK');
                return {
                    result: 'error',
                    message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Erro ao criar fornecedores em lote.'
                };
            }
        });
    }
}
exports.default = Fornecedor;
