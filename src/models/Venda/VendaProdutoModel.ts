class VendaProduto {
    private id_venda_produto: number;
    private id_venda: number;
    private id_produto: number;
    private nu_quantidade: number;
    private vr_total: number;

    constructor(
        id_venda_produto: number,
        id_venda: number,
        id_produto: number,
        nu_quantidade?: number,
        vr_total?: number
    ) {
        this.id_venda_produto = id_venda_produto;
        this.id_venda = id_venda;
        this.id_produto = id_produto;
        this.nu_quantidade = nu_quantidade ?? 0;
        this.vr_total = vr_total ?? 0;
    }

    public getIdVendaProduto(): number {
        return this.id_venda_produto;
    }

    public getIdVenda(): number {
        return this.id_venda;
    }

    public getIdProduto(): number {
        return this.id_produto;
    }

    public getNuQuantidade(): number {
        return this.nu_quantidade;
    }

    public getVrTotal(): number {
        return this.vr_total;
    }
}
