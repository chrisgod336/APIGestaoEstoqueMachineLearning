class MovimentoCaixa {
    private id_movimento_caixa: number;
    private id_venda: number;
    private id_compra: number;
    private tx_descricao: string;
    private vr_movimento: number;
    private dt_movimento: string;
    private tx_tipo_movimento: string;

    constructor(
        id_movimento_caixa: number,
        id_venda: number,
        id_compra: number,
        tx_descricao?: string,
        vr_movimento?: number,
        dt_movimento?: string,
        tx_tipo_movimento?: string
    ) {
        this.id_movimento_caixa = id_movimento_caixa;
        this.id_venda = id_venda;
        this.id_compra = id_compra;
        this.tx_descricao = tx_descricao ?? "";
        this.vr_movimento = vr_movimento ?? 0;
        this.dt_movimento = dt_movimento ?? "";
        this.tx_tipo_movimento = tx_tipo_movimento ?? "";
    }

    public getIdMovimentoCaixa(): number {
        return this.id_movimento_caixa;
    }

    public getIdVenda(): number {
        return this.id_venda;
    }

    public getIdCompra(): number {
        return this.id_compra;
    }

    public getTxDescricao(): string {
        return this.tx_descricao;
    }

    public getVrMovimento(): number {
        return this.vr_movimento;
    }

    public getDtMovimento(): string {
        return this.dt_movimento;
    }

    public getTxTipoMovimento(): string {
        return this.tx_tipo_movimento;
    }
}
