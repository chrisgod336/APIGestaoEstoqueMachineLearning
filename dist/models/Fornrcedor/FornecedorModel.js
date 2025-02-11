"use strict";
class Fornecedor {
    constructor(id_fornecedor, tx_razao_social, tx_cnpj_cpf, tx_email, tx_telefone, vr_frete, nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega, tx_pais, tx_uf, tx_cidade, tx_endereco) {
        this.id_fornecedor = id_fornecedor;
        this.tx_razao_social = tx_razao_social !== null && tx_razao_social !== void 0 ? tx_razao_social : "";
        this.tx_cnpj_cpf = tx_cnpj_cpf !== null && tx_cnpj_cpf !== void 0 ? tx_cnpj_cpf : "";
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
        return this.tx_cnpj_cpf;
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
}
