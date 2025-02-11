class Compra {
    private id_compra: number;
    private id_fornecedor: number;
    private id_local_estoque: number;
    private id_estoque: number;
    private dt_compra: string;
    private vr_total_compra: number;
    private vr_compra: number;
    private vr_frete: number;
    private tx_status: string;
    private dt_previsao_entrega_inicial: string;
    private dt_previsao_entrega_final: string;
    private dt_entrega: string;

    constructor(
        id_compra: number,
        id_fornecedor: number,
        id_local_estoque: number,
        id_estoque: number,
        dt_compra?: string,
        vr_total_compra?: number,
        vr_compra?: number,
        vr_frete?: number,
        tx_status?: string,
        dt_previsao_entrega_inicial?: string,
        dt_previsao_entrega_final?: string,
        dt_entrega?: string
    ) {
        this.id_compra = id_compra;
        this.id_fornecedor = id_fornecedor;
        this.id_local_estoque = id_local_estoque;
        this.id_estoque = id_estoque;
        this.dt_compra = dt_compra ?? "";
        this.vr_total_compra = vr_total_compra ?? 0;
        this.vr_compra = vr_compra ?? 0;
        this.vr_frete = vr_frete ?? 0;
        this.tx_status = tx_status ?? "";
        this.dt_previsao_entrega_inicial = dt_previsao_entrega_inicial ?? "";
        this.dt_previsao_entrega_final = dt_previsao_entrega_final ?? "";
        this.dt_entrega = dt_entrega ?? "";
    }

    public getIdCompra(): number {
        return this.id_compra;
    }

    public getIdFornecedor(): number {
        return this.id_fornecedor;
    }

    public getIdLocalEstoque(): number {
        return this.id_local_estoque;
    }

    public getIdEstoque(): number {
        return this.id_estoque;
    }

    public getDtCompra(): string {
        return this.dt_compra;
    }

    public getVrTotalCompra(): number {
        return this.vr_total_compra;
    }

    public getVrCompra(): number {
        return this.vr_compra;
    }

    public getVrFrete(): number {
        return this.vr_frete;
    }

    public getTxStatus(): string {
        return this.tx_status;
    }

    public getDtPrevisaoEntregaInicial(): string {
        return this.dt_previsao_entrega_inicial;
    }

    public getDtPrevisaoEntregaFinal(): string {
        return this.dt_previsao_entrega_final;
    }

    public getDtEntrega(): string {
        return this.dt_entrega;
    }
}
