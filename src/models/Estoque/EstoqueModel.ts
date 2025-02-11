class Estoque {
    private id_estoque: number;
    private id_local_estoque: number;
    private id_produto: number;
    private nu_quantidade: number;
    private nu_quantidade_minima: number;
    private nu_quantidade_reposicao: number;
    private lo_reposicao_automatica: boolean;

    constructor(
        id_estoque: number,
        id_local_estoque: number,
        id_produto: number,
        nu_quantidade?: number,
        nu_quantidade_minima?: number,
        nu_quantidade_reposicao?: number,
        lo_reposicao_automatica?: boolean
    ) {
        this.id_estoque = id_estoque;
        this.id_local_estoque = id_local_estoque;
        this.id_produto = id_produto;
        this.nu_quantidade = nu_quantidade ?? 0;
        this.nu_quantidade_minima = nu_quantidade_minima ?? 0;
        this.nu_quantidade_reposicao = nu_quantidade_reposicao ?? 0;
        this.lo_reposicao_automatica = lo_reposicao_automatica ?? false;
    }

    public getIdEstoque(): number {
        return this.id_estoque;
    }

    public getIdLocalEstoque(): number {
        return this.id_local_estoque;
    }

    public getIdProduto(): number {
        return this.id_produto;
    }

    public getNuQuantidade(): number {
        return this.nu_quantidade;
    }

    public getNuQuantidadeMinima(): number {
        return this.nu_quantidade_minima;
    }

    public getNuQuantidadeReposicao(): number {
        return this.nu_quantidade_reposicao;
    }

    public getLoReposicaoAutomatica(): boolean {
        return this.lo_reposicao_automatica;
    }
}
