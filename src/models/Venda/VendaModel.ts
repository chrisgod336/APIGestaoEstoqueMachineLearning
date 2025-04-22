import { db } from "../../../app";

class Venda {
    private id_venda: number;
    private id_cliente: number;
    private dt_venda: string;
    private vr_venda: number;
    private status: string;

    constructor(
        id_venda: number,
        id_cliente: number,
        dt_venda?: string,
        vr_venda?: number,
        status?: string
    ) {
        this.id_venda = id_venda;
        this.id_cliente = id_cliente;
        this.dt_venda = dt_venda ?? "";
        this.vr_venda = vr_venda ?? 0;
        this.status = status ?? "ABERTA";
    }

    public getIdVenda(): number {
        return this.id_venda;
    }

    public getIdCliente(): number {
        return this.id_cliente;
    }

    public getDtVenda(): string {
        return this.dt_venda;
    }

    public getVrVenda(): number {
        return this.vr_venda;
    }

    public getStatus(): string {
        return this.status;
    }

    public static async criarVenda(id_cliente: number, dt_venda?: string): Promise<object> {
        try {
            const sql_insert = `
                INSERT INTO tb_venda(id_cliente, dt_venda, vr_venda)
                VALUES (?, ${dt_venda ? '?' : 'datetime("now")'}, 0)
            `;

            const params = dt_venda ? [id_cliente, dt_venda] : [id_cliente];
            const result = await db.run(sql_insert, params);

            if (result.lastID) {
                return {
                    result: 'success',
                    message: 'Venda criada com sucesso',
                    data: new Venda(result.lastID, id_cliente, dt_venda, 0)
                };
            }
            throw new Error('Falha ao criar venda');
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar criar venda.'
            };
        }
    }

    public static async buscarVenda(id_venda?: number): Promise<object> {
        try {
            let sql: string;
            let params: any[] = [];

            if (id_venda) {
                sql = `SELECT * FROM tb_venda WHERE id_venda = ?`;
                params = [id_venda];
            } else {
                sql = `SELECT tb_venda.*, tb_cliente.id_cliente||' - '||tb_cliente.tx_nome AS cliente 
                        FROM tb_venda 
                        INNER JOIN tb_cliente 
                        ON tb_venda.id_cliente = tb_cliente.id_cliente
                        ORDER BY id_venda
                        `;
            }

            const response = await db.all(sql, params);

            return {
                result: 'success',
                message: response.length > 0 
                    ? 'Venda(s) encontrada(s) com sucesso' 
                    : id_venda ? 'Venda não encontrada' : 'Nenhuma venda cadastrada',
                data: response.length > 0 ? response : null
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar buscar venda(s).'
            };
        }
    }

    public async atualizarVenda(id_cliente: number, dt_venda: string): Promise<object> {
        try {
            const sql_update = `
                UPDATE tb_venda
                SET id_cliente = ?,
                    dt_venda = ?
                WHERE id_venda = ?
            `;

            const result = await db.run(sql_update, [id_cliente, dt_venda, this.id_venda]);

            if (result) {
                this.id_cliente = id_cliente;
                this.dt_venda = dt_venda;
                
                return {
                    result: 'success',
                    message: 'Venda atualizada com sucesso'
                };
            }
            throw new Error('Nenhuma venda foi atualizada');
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar atualizar venda.'
            };
        }
    }

    public async deletarVenda(): Promise<object> {
        try {

            const result = await db.run(
                'DELETE FROM tb_venda_produto WHERE id_venda = ?', 
                [this.id_venda]
            );

            const result2 = await db.run(
                'DELETE FROM tb_venda WHERE id_venda = ?', 
                [this.id_venda]
            );

            return {
                result: (result&&result2) ? 'success' : 'error',
                message: (result&&result2) 
                    ? 'Venda deletada com sucesso' 
                    : 'Nenhuma venda foi deletada'
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar deletar venda.'
            };
        }
    }

    public async baixarVenda() {
        try {
            await db.run('BEGIN TRANSACTION');

            const result = await db.run(
                'UPDATE tb_venda SET status = ? WHERE id_venda = ?',
                ['BAIXADA', this.id_venda]
            );

            if (result) {

                this.status = 'BAIXADA';
                await db.run('COMMIT');
                
                return {
                    result: 'success',
                    message: 'Venda baixada com sucesso.'
                };
    
            }
            throw new Error('Erro ao tentar baixar venda.');
        } catch (error: any) {
            await db.run('ROLLBACK');
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao baixar a venda.'
            };
        }
    }

    public async extornarVenda() {
        try {
            await db.run('BEGIN TRANSACTION');

            const result = await db.run(
                'UPDATE tb_venda SET status = ? WHERE id_venda = ?',
                ['ABERTA', this.id_venda]
            );

            if (result) {

                this.status = 'ABERTA';
                await db.run('COMMIT');
                
                return {
                    result: 'success',
                    message: 'Venda extornada com sucesso.'
                };
            }
            throw new Error('Erro ao tentar extornar venda.');
        } catch (error: any) {
            await db.run('ROLLBACK');
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao extornar a venda.'
            };
        }
    }
}

export default Venda;