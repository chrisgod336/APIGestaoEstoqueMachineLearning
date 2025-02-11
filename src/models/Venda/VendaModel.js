"use strict";
class Venda {
    constructor(id_venda, id_cliente, id_local_esotque, id_estoque, dt_venda, vr_venda) {
        this.id_venda = id_venda;
        this.id_cliente = id_cliente;
        this.id_local_esotque = id_local_esotque;
        this.id_estoque = id_estoque;
        this.dt_venda = dt_venda !== null && dt_venda !== void 0 ? dt_venda : "";
        this.vr_venda = vr_venda !== null && vr_venda !== void 0 ? vr_venda : 0;
    }
    getIdVenda() {
        return this.id_venda;
    }
    getIdCliente() {
        return this.id_cliente;
    }
    getIdLocalEstoque() {
        return this.id_local_esotque;
    }
    getIdEstoque() {
        return this.id_estoque;
    }
    getDtVenda() {
        return this.dt_venda;
    }
    getVrVenda() {
        return this.vr_venda;
    }
}
