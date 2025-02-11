class Produto {
    private id_produto: number;
    private id_fornecedor: number;
    private tx_nome: string;
    private tx_marca: string;
    private vr_preco_compra: number;
    private vr_preco_venda: number;

    constructor(
        id_produto: number,
        id_fornecedor: number,
        tx_nome?: string,
        tx_marca?: string,
        vr_preco_compra?: number,
        vr_preco_venda?: number
    ) {
        this.id_produto = id_produto;
        this.id_fornecedor = id_fornecedor;
        this.tx_nome = tx_nome ?? "";
        this.tx_marca = tx_marca ?? "";
        this.vr_preco_compra = vr_preco_compra ?? 0;
        this.vr_preco_venda = vr_preco_venda ?? 0;
    }

    public getIdProduto(): number {
        return this.id_produto;
    }

    public getIdFornecedor(): number {
        return this.id_fornecedor;
    }

    public getTxNome(): string {
        return this.tx_nome;
    }

    public getTxMarca(): string {
        return this.tx_marca;
    }

    public getVrPrecoCompra(): number {
        return this.vr_preco_compra;
    }

    public getVrPrecoVenda(): number {
        return this.vr_preco_venda;
    }
}
