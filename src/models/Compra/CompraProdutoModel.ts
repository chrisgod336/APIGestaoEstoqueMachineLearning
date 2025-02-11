class CompraProduto {
    private id_compra_produto: number;
    private id_compra: number;
    private id_produto: number;
    private nu_quantidade: number;
    private vr_total: number;

    constructor(
        id_compra_produto: number,
        id_compra: number,
        id_produto: number,
        nu_quantidade?: number,
        vr_total?: number
    ) {
        this.id_compra_produto = id_compra_produto;
        this.id_compra = id_compra;
        this.id_produto = id_produto;
        this.nu_quantidade = nu_quantidade ?? 0;
        this.vr_total = vr_total ?? 0;
    }

    public getIdCompraProduto(): number {
        return this.id_compra_produto;
    }

    public getIdCompra(): number {
        return this.id_compra;
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
