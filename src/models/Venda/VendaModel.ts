class Venda {
    private id_venda: number;
    private id_cliente: number;
    private id_local_esotque: number;
    private id_estoque: number;
    private dt_venda: string;
    private vr_venda: number;

    constructor(
        id_venda: number,
        id_cliente: number,
        id_local_esotque: number,
        id_estoque: number,
        dt_venda?: string,
        vr_venda?: number
    ) {
        this.id_venda = id_venda;
        this.id_cliente = id_cliente;
        this.id_local_esotque = id_local_esotque;
        this.id_estoque = id_estoque;
        this.dt_venda = dt_venda ?? "";
        this.vr_venda = vr_venda ?? 0;
    }

    public getIdVenda(): number {
        return this.id_venda;
    }

    public getIdCliente(): number {
        return this.id_cliente;
    }

    public getIdLocalEstoque(): number {
        return this.id_local_esotque;
    }

    public getIdEstoque(): number {
        return this.id_estoque;
    }

    public getDtVenda(): string {
        return this.dt_venda;
    }

    public getVrVenda(): number {
        return this.vr_venda;
    }
}
