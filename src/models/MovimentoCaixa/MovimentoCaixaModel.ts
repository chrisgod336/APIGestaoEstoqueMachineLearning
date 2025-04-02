import { db } from "../../../app";

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

    public static async buscaMovimentoCaixa(): Promise<object> {
        try {
            const sql_search = `SELECT * FROM tb_movimento_caixa ORDER BY id_movimento_caixa DESC`;
            const response = await db.all(sql_search);

            return {
                result: 'success',
                message: response.length > 0 
                    ? 'Movimentações encontradas com sucesso' 
                    : 'Nenhuma movimentação encontrada',
                data: response.length > 0 ? response : null
            };
        } catch(error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar buscar movimentações.'
            };
        }
    }

    public static async criarMovimentoCaixa(
        tx_descricao: string, 
        vr_movimento: number, 
        tx_tipo_movimento: string, 
        id_venda?: number, 
        id_compra?: number, 
        dt_movimento?: string
    ): Promise<object> {
        try {
            const sql_insert = `
                INSERT INTO tb_movimento_caixa(
                    tx_descricao, vr_movimento, tx_tipo_movimento, 
                    dt_movimento, id_venda, id_compra
                ) VALUES (?, ?, ?, ${dt_movimento ? '?' : 'datetime("now")'}, ?, ?)
            `;

            const params = [
                tx_descricao, 
                vr_movimento, 
                tx_tipo_movimento,
                ...(dt_movimento ? [dt_movimento] : []),
                id_venda ?? 0,
                id_compra ?? 0
            ];

            const result = await db.run(sql_insert, params);

            if (result.lastID) {
                return {
                    result: 'success',
                    message: 'Movimentação de caixa realizada com sucesso',
                    data: new MovimentoCaixa(
                        result.lastID,
                        id_venda ?? 0,
                        id_compra ?? 0,
                        tx_descricao,
                        vr_movimento,
                        dt_movimento ?? new Date().toISOString(),
                        tx_tipo_movimento
                    )
                };
            }
            throw new Error('Falha ao criar movimentação');
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar criar movimentação.'
            };
        }
    }

    public static async deletarMovimentoCaixa(id_venda?: number, id_compra?: number): Promise<object> {
        try {
            const sql_delete = id_venda 
                ? `DELETE FROM tb_movimento_caixa WHERE id_venda = ?`
                : `DELETE FROM tb_movimento_caixa WHERE id_compra = ?`;
            
            const id = id_venda ?? id_compra;
            const result = await db.run(sql_delete, [id]);

            return {
                result: result ? 'success' : 'error',
                message: result 
                    ? 'Movimentação deletada com sucesso' 
                    : 'Nenhuma movimentação foi deletada'
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar deletar movimentação.'
            };
        }
    }
}

export default MovimentoCaixa;