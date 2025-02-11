class LocalEstoque {
    private id_local_estoque: number;
    private tx_nome: string;
    private tx_pais: string;
    private tx_uf: string;
    private tx_cidade: string;
    private tx_endereco: string;

    constructor(
        id_local_estoque: number,
        tx_nome?: string,
        tx_pais?: string,
        tx_uf?: string,
        tx_cidade?: string,
        tx_endereco?: string
    ) {
        this.id_local_estoque = id_local_estoque;
        this.tx_nome = tx_nome ?? "";
        this.tx_pais = tx_pais ?? "";
        this.tx_uf = tx_uf ?? "";
        this.tx_cidade = tx_cidade ?? "";
        this.tx_endereco = tx_endereco ?? "";
    }

    public getIdLocalEstoque(): number {
        return this.id_local_estoque;
    }

    public getTxNome(): string {
        return this.tx_nome;
    }

    public getTxPais(): string {
        return this.tx_pais;
    }

    public getTxUf(): string {
        return this.tx_uf;
    }

    public getTxCidade(): string {
        return this.tx_cidade;
    }

    public getTxEndereco(): string {
        return this.tx_endereco;
    }
}
