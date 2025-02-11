class Cliente {
    private id_cliente: number;
    private tx_nome: string;
    private tx_cpf_cnpj: string;
    private tx_email: string;
    private tx_telefone: string;

    constructor(
        id_cliente: number,
        tx_nome?: string,
        tx_cpf_cnpj?: string,
        tx_email?: string,
        tx_telefone?: string
    ) {
        this.id_cliente = id_cliente;
        this.tx_nome = tx_nome ?? "";
        this.tx_cpf_cnpj = tx_cpf_cnpj ?? "";
        this.tx_email = tx_email ?? "";
        this.tx_telefone = tx_telefone ?? "";
    }

    public getIdCliente(): number {
        return this.id_cliente;
    }

    public getTxNome(): string {
        return this.tx_nome;
    }

    public getTxCpfCnpj(): string {
        return this.tx_cpf_cnpj;
    }

    public getTxEmail(): string {
        return this.tx_email;
    }

    public getTxTelefone(): string {
        return this.tx_telefone;
    }
}
