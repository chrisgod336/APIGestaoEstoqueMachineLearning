"use strict";
class CompraProduto {
    constructor(id_compra_produto, id_compra, id_produto, nu_quantidade, vr_total) {
        this.id_compra_produto = id_compra_produto;
        this.id_compra = id_compra;
        this.id_produto = id_produto;
        this.nu_quantidade = nu_quantidade !== null && nu_quantidade !== void 0 ? nu_quantidade : 0;
        this.vr_total = vr_total !== null && vr_total !== void 0 ? vr_total : 0;
    }
    getIdCompraProduto() {
        return this.id_compra_produto;
    }
    getIdCompra() {
        return this.id_compra;
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
