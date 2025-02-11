"use strict";
class Compra {
    constructor(id_compra, id_fornecedor, id_local_estoque, id_estoque, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_previsao_entrega_inicial, dt_previsao_entrega_final, dt_entrega) {
        this.id_compra = id_compra;
        this.id_fornecedor = id_fornecedor;
        this.id_local_estoque = id_local_estoque;
        this.id_estoque = id_estoque;
        this.dt_compra = dt_compra !== null && dt_compra !== void 0 ? dt_compra : "";
        this.vr_total_compra = vr_total_compra !== null && vr_total_compra !== void 0 ? vr_total_compra : 0;
        this.vr_compra = vr_compra !== null && vr_compra !== void 0 ? vr_compra : 0;
        this.vr_frete = vr_frete !== null && vr_frete !== void 0 ? vr_frete : 0;
        this.tx_status = tx_status !== null && tx_status !== void 0 ? tx_status : "";
        this.dt_previsao_entrega_inicial = dt_previsao_entrega_inicial !== null && dt_previsao_entrega_inicial !== void 0 ? dt_previsao_entrega_inicial : "";
        this.dt_previsao_entrega_final = dt_previsao_entrega_final !== null && dt_previsao_entrega_final !== void 0 ? dt_previsao_entrega_final : "";
        this.dt_entrega = dt_entrega !== null && dt_entrega !== void 0 ? dt_entrega : "";
    }
    getIdCompra() {
        return this.id_compra;
    }
    getIdFornecedor() {
        return this.id_fornecedor;
    }
    getIdLocalEstoque() {
        return this.id_local_estoque;
    }
    getIdEstoque() {
        return this.id_estoque;
    }
    getDtCompra() {
        return this.dt_compra;
    }
    getVrTotalCompra() {
        return this.vr_total_compra;
    }
    getVrCompra() {
        return this.vr_compra;
    }
    getVrFrete() {
        return this.vr_frete;
    }
    getTxStatus() {
        return this.tx_status;
    }
    getDtPrevisaoEntregaInicial() {
        return this.dt_previsao_entrega_inicial;
    }
    getDtPrevisaoEntregaFinal() {
        return this.dt_previsao_entrega_final;
    }
    getDtEntrega() {
        return this.dt_entrega;
    }
}
