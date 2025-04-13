import { db } from "../../../app";

class Compra {
    private id_compra: number;
    private id_fornecedor: number;
    private id_local_estoque: number;
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
        dt_compra?: string,
        tx_status?: string,
        dt_previsao_entrega_inicial?: string,
        dt_previsao_entrega_final?: string,
        vr_total_compra?: number,
        vr_compra?: number,
        vr_frete?: number,
        dt_entrega?: string
    ) {
        this.id_compra = id_compra;
        this.id_fornecedor = id_fornecedor;
        this.id_local_estoque = id_local_estoque;
        this.dt_compra = dt_compra ?? "";
        this.vr_total_compra = vr_total_compra ?? 0;
        this.vr_compra = vr_compra ?? 0;
        this.vr_frete = vr_frete ?? 0;
        this.tx_status = tx_status ?? "PENDENTE";
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

    public static async calcularPeriodoEntrega(id_fornecedor: number, dt_compra: string): Promise<object> {
        try {
            const response = await db.get(
                'SELECT nu_dias_previsao_inicial_entrega, nu_dias_previsao_final_entrega FROM tb_fornecedor WHERE id_fornecedor = ?',
                [id_fornecedor]
            );

            if (!response) {
                return {
                    result: 'error',
                    message: 'Fornecedor não encontrado'
                };
            }

            const dias_inc = response.nu_dias_previsao_inicial_entrega;
            const dias_fim = response.nu_dias_previsao_final_entrega;

            const dataCompra = new Date(dt_compra);
            if (isNaN(dataCompra.getTime())) {
                return {
                    result: 'error',
                    message: 'Data de compra inválida'
                };
            }

            const previsaoInicial = new Date(dataCompra);
            previsaoInicial.setDate(previsaoInicial.getDate() + dias_inc);

            const previsaoFinal = new Date(dataCompra);
            previsaoFinal.setDate(previsaoFinal.getDate() + dias_fim);

            return {
                result: 'success',
                previsao_inicial: previsaoInicial.toISOString().split('T')[0],
                previsao_final: previsaoFinal.toISOString().split('T')[0]
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao calcular período de entrega'
            };
        }
    }

    public static async criarCompra(
        id_fornecedor: number,
        id_local_estoque: number,
        dt_compra?: string
    ): Promise<object> {
        try {
            const dataCompra = dt_compra ?? new Date().toISOString();
            const periodo_entrega:any = await this.calcularPeriodoEntrega(id_fornecedor, dataCompra);

            const { previsao_inicial, previsao_final } = periodo_entrega;

            const result = await db.run(
                `INSERT INTO tb_compra(
                    id_fornecedor, id_local_estoque, dt_compra, 
                    tx_status, dt_previsao_entrega_inicial, dt_previsao_entrega_final, vr_total_compra, vr_compra, vr_frete
                ) VALUES (?, ?, ?, ?, ?, ?, 0, 0, 0)`,
                [
                    id_fornecedor, 
                    id_local_estoque, 
                    dataCompra, 
                    'PENDENTE', 
                    previsao_inicial, 
                    previsao_final
                ]
            );

            if (result.lastID) {
                return {
                    result: 'success',
                    message: 'Compra criada com sucesso',
                    data: new Compra(
                        result.lastID,
                        id_fornecedor,
                        id_local_estoque,
                        dataCompra,
                        'PENDENTE',
                        previsao_inicial,
                        previsao_final
                    )
                };
            }
            throw new Error('Falha ao criar compra');
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao criar compra'
            };
        }
    }

    public static async buscarCompra(id_compra?: number): Promise<object> {
        try {
            let sql: string;
            let params: any[] = [];

            if (id_compra) {
                sql = `SELECT * FROM tb_compra WHERE id_compra = ?`;
                params = [id_compra];
            } else {
                sql = `SELECT * FROM tb_compra ORDER BY id_compra`;
            }

            const response = await db.all(sql, params);

            return {
                result: 'success',
                message: response.length > 0 
                    ? 'Compra(s) encontrada(s) com sucesso' 
                    : id_compra ? 'Compra não encontrada' : 'Nenhuma compra cadastrada',
                data: response.length > 0 ? response : null
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao buscar compra(s)'
            };
        }
    }

    public async atualizarCompra(
        id_fornecedor: number,
        id_local_estoque: number,
        dt_compra: string,
        vr_frete: number
    ): Promise<object> {
        try {
            const periodo_entrega:any = await Compra.calcularPeriodoEntrega(id_fornecedor, dt_compra);

            const { previsao_inicial, previsao_final } = periodo_entrega;
            const vr_total_compra = this.vr_compra + vr_frete;

            const result = await db.run(
                `UPDATE tb_compra
                SET id_fornecedor = ?,
                    id_local_estoque = ?,
                    dt_compra = ?,
                    vr_total_compra = ?,
                    vr_frete = ?,
                    dt_previsao_entrega_inicial = ?,
                    dt_previsao_entrega_final = ?
                WHERE id_compra = ?`,
                [
                    id_fornecedor,
                    id_local_estoque,
                    dt_compra,
                    vr_total_compra,
                    vr_frete,
                    previsao_inicial,
                    previsao_final,
                    this.id_compra
                ]
            );

            if (result) {
                this.id_fornecedor = id_fornecedor;
                this.id_local_estoque = id_local_estoque;
                this.dt_compra = dt_compra;
                this.vr_total_compra = vr_total_compra;
                this.vr_frete = vr_frete;
                this.dt_previsao_entrega_inicial = previsao_inicial;
                this.dt_previsao_entrega_final = previsao_final;

                return {
                    result: 'success',
                    message: 'Compra atualizada com sucesso'
                };
            }
            throw new Error('Nenhuma compra foi atualizada');
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao atualizar compra'
            };
        }
    }

    public async deletarCompra(): Promise<object> {
        try {
            const result = await db.run(
                'DELETE FROM tb_compra WHERE id_compra = ?',
                [this.id_compra]
            );

            return {
                result: result ? 'success' : 'error',
                message: result 
                    ? 'Compra deletada com sucesso' 
                    : 'Nenhuma compra foi deletada'
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao deletar compra'
            };
        }
    }

    public async baixarCompra(dt_entrega: string): Promise<object> {
        try {
            await db.run('BEGIN TRANSACTION');

            const result = await db.run(
                'UPDATE tb_compra SET dt_entrega = ?, tx_status = ? WHERE id_compra = ?',
                [dt_entrega, 'BAIXADA', this.id_compra]
            );

            if (result) {

                this.dt_entrega = dt_entrega;
                this.tx_status = 'BAIXADA';
                await db.run('COMMIT');
                
                return {
                    result: 'success',
                    message: 'Compra baixada com sucesso'
                };
                
            }
            throw new Error('Falha ao baixar compra');
        } catch (error: any) {
            await db.run('ROLLBACK');
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao baixar compra'
            };
        }
    }

    public async extornarCompra(): Promise<object> {
        try {
            await db.run('BEGIN TRANSACTION');

            const result = await db.run(
                'UPDATE tb_compra SET dt_entrega = NULL, tx_status = ? WHERE id_compra = ?',
                ['ABERTA', this.id_compra]
            );

            if (result) {

                this.dt_entrega = '';
                this.tx_status = 'ABERTA';
                await db.run('COMMIT');
                
                return {
                    result: 'success',
                    message: 'Compra extornada com sucesso'
                };

            }
            throw new Error('Falha ao extornar compra');
        } catch (error: any) {
            await db.run('ROLLBACK');
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao extornar compra'
            };
        }
    }
}

export default Compra;