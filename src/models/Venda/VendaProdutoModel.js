"use strict";
class VendaProduto {
    constructor(id_venda_produto, id_venda, id_produto, nu_quantidade, vr_total) {
        this.id_venda_produto = id_venda_produto;
        this.id_venda = id_venda;
        this.id_produto = id_produto;
        this.nu_quantidade = nu_quantidade !== null && nu_quantidade !== void 0 ? nu_quantidade : 0;
        this.vr_total = vr_total !== null && vr_total !== void 0 ? vr_total : 0;
    }
    getIdVendaProduto() {
        return this.id_venda_produto;
    }
    getIdVenda() {
        return this.id_venda;
    }
    getIdProduto() {
        return this.id_produto;
    }
    getNuQuantidade() {
        return this.nu_quantidade;
    }
    getVrTotal() {
        return this.vr_total;
    }
}
