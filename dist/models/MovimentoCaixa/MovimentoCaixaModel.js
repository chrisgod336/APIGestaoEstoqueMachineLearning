"use strict";
class MovimentoCaixa {
    constructor(id_movimento_caixa, id_venda, id_compra, tx_descricao, vr_movimento, dt_movimento, tx_tipo_movimento) {
        this.id_movimento_caixa = id_movimento_caixa;
        this.id_venda = id_venda;
        this.id_compra = id_compra;
        this.tx_descricao = tx_descricao !== null && tx_descricao !== void 0 ? tx_descricao : "";
        this.vr_movimento = vr_movimento !== null && vr_movimento !== void 0 ? vr_movimento : 0;
        this.dt_movimento = dt_movimento !== null && dt_movimento !== void 0 ? dt_movimento : "";
        this.tx_tipo_movimento = tx_tipo_movimento !== null && tx_tipo_movimento !== void 0 ? tx_tipo_movimento : "";
    }
    getIdMovimentoCaixa() {
        return this.id_movimento_caixa;
    }
    getIdVenda() {
        return this.id_venda;
    }
    getIdCompra() {
        return this.id_compra;
    }
    getTxDescricao() {
        return this.tx_descricao;
    }
    getVrMovimento() {
        return this.vr_movimento;
    }
    getDtMovimento() {
        return this.dt_movimento;
    }
    getTxTipoMovimento() {
        return this.tx_tipo_movimento;
    }
}
