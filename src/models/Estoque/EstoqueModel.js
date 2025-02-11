"use strict";
class Estoque {
    constructor(id_estoque, id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_reposicao, lo_reposicao_automatica) {
        this.id_estoque = id_estoque;
        this.id_local_estoque = id_local_estoque;
        this.id_produto = id_produto;
        this.nu_quantidade = nu_quantidade !== null && nu_quantidade !== void 0 ? nu_quantidade : 0;
        this.nu_quantidade_minima = nu_quantidade_minima !== null && nu_quantidade_minima !== void 0 ? nu_quantidade_minima : 0;
        this.nu_quantidade_reposicao = nu_quantidade_reposicao !== null && nu_quantidade_reposicao !== void 0 ? nu_quantidade_reposicao : 0;
        this.lo_reposicao_automatica = lo_reposicao_automatica !== null && lo_reposicao_automatica !== void 0 ? lo_reposicao_automatica : false;
    }
    getIdEstoque() {
        return this.id_estoque;
    }
    getIdLocalEstoque() {
        return this.id_local_estoque;
    }
    getIdProduto() {
        return this.id_produto;
    }
    getNuQuantidade() {
        return this.nu_quantidade;
    }
    getNuQuantidadeMinima() {
        return this.nu_quantidade_minima;
    }
    getNuQuantidadeReposicao() {
        return this.nu_quantidade_reposicao;
    }
    getLoReposicaoAutomatica() {
        return this.lo_reposicao_automatica;
    }
}
