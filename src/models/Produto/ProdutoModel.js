"use strict";
class Produto {
    constructor(id_produto, id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda) {
        this.id_produto = id_produto;
        this.id_fornecedor = id_fornecedor;
        this.tx_nome = tx_nome !== null && tx_nome !== void 0 ? tx_nome : "";
        this.tx_marca = tx_marca !== null && tx_marca !== void 0 ? tx_marca : "";
        this.vr_preco_compra = vr_preco_compra !== null && vr_preco_compra !== void 0 ? vr_preco_compra : 0;
        this.vr_preco_venda = vr_preco_venda !== null && vr_preco_venda !== void 0 ? vr_preco_venda : 0;
    }
    getIdProduto() {
        return this.id_produto;
    }
    getIdFornecedor() {
        return this.id_fornecedor;
    }
    getTxNome() {
        return this.tx_nome;
    }
    getTxMarca() {
        return this.tx_marca;
    }
    getVrPrecoCompra() {
        return this.vr_preco_compra;
    }
    getVrPrecoVenda() {
        return this.vr_preco_venda;
    }
}
