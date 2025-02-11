"use strict";
class Cliente {
    constructor(id_cliente, tx_nome, tx_cpf_cnpj, tx_email, tx_telefone) {
        this.id_cliente = id_cliente;
        this.tx_nome = tx_nome !== null && tx_nome !== void 0 ? tx_nome : "";
        this.tx_cpf_cnpj = tx_cpf_cnpj !== null && tx_cpf_cnpj !== void 0 ? tx_cpf_cnpj : "";
        this.tx_email = tx_email !== null && tx_email !== void 0 ? tx_email : "";
        this.tx_telefone = tx_telefone !== null && tx_telefone !== void 0 ? tx_telefone : "";
    }
    getIdCliente() {
        return this.id_cliente;
    }
    getTxNome() {
        return this.tx_nome;
    }
    getTxCpfCnpj() {
        return this.tx_cpf_cnpj;
    }
    getTxEmail() {
        return this.tx_email;
    }
    getTxTelefone() {
        return this.tx_telefone;
    }
}
