import { db } from "../../../app";
class Produto {
    private id_produto: number;
    private id_fornecedor: number;
    private tx_nome: string;
    private tx_marca: string;
    private vr_preco_compra: number;
    private vr_preco_venda: number;

    constructor(
        id_produto: number,
        id_fornecedor?: number,
        tx_nome?: string,
        tx_marca?: string,
        vr_preco_compra?: number,
        vr_preco_venda?: number
    ) {
        this.id_produto = id_produto;
        this.id_fornecedor = id_fornecedor ?? 0;
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

    public static async criarProduto(
        id_fornecedor: number, 
        tx_nome: string, 
        tx_marca: string, 
        vr_preco_compra: number, 
        vr_preco_venda: number
    ): Promise<object> {
        try {
            const sql_insert = `
                INSERT INTO tb_produto(
                    id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda
                ) VALUES (?, ?, ?, ?, ?)
            `;

            const result = await db.run(sql_insert, [
                id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda
            ]);

            if (result.lastID) {
                return {
                    result: 'success',
                    message: 'Produto criado com sucesso',
                    data: new Produto(
                        result.lastID, 
                        id_fornecedor, 
                        tx_nome, 
                        tx_marca, 
                        vr_preco_compra, 
                        vr_preco_venda
                    )
                };
            }
            throw new Error('Falha ao criar produto');
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar criar produto.'
            };
        }
    }

    public static async buscarProduto(id_produto?: number): Promise<object> {
        try {
            let sql: string;
            let params: any[] = [];

            if (id_produto) {
                sql = `SELECT * FROM tb_produto WHERE id_produto = ?`;
                params = [id_produto];
            } else {
                sql = `SELECT tb_produto.*, tb_fornecedor.id_fornecedor||' - '||tb_fornecedor.tx_razao_social AS fornecedor
                       FROM tb_produto
                       INNER JOIN tb_fornecedor
                       ON tb_produto.id_fornecedor = tb_fornecedor.id_fornecedor 
                       ORDER BY id_produto`;
            }

            const response = await db.all(sql, params);

            return {
                result: 'success',
                message: response.length > 0 
                    ? 'Produto(s) encontrado(s) com sucesso' 
                    : id_produto ? 'Produto não encontrado' : 'Nenhum produto cadastrado',
                data: response.length > 0 ? response : null
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar buscar produto(s).'
            };
        }
    }

    public async atualizarProduto(
        id_fornecedor: number,
        tx_nome: string, 
        tx_marca: string, 
        vr_preco_compra: number, 
        vr_preco_venda: number
    ): Promise<object> {
        try {
            const sql_update = `
                UPDATE tb_produto
                SET id_fornecedor = ?,
                    tx_nome = ?,
                    tx_marca = ?,
                    vr_preco_compra = ?,
                    vr_preco_venda = ?
                WHERE id_produto = ?
            `;

            const result = await db.run(sql_update, [
                id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda,
                this.id_produto
            ]);

            if (result) {
                this.id_fornecedor = id_fornecedor;
                this.tx_nome = tx_nome;
                this.tx_marca = tx_marca;
                this.vr_preco_compra = vr_preco_compra;
                this.vr_preco_venda = vr_preco_venda;
                
                return {
                    result: 'success',
                    message: 'Produto atualizado com sucesso'
                };
            }
            throw new Error('Nenhum produto foi atualizado');
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar atualizar produto.'
            };
        }
    }

    public async deletarProduto(): Promise<object> {
        try {
            const result = await db.run(
                'DELETE FROM tb_produto WHERE id_produto = ?', 
                [this.id_produto]
            );

            return {
                result: result ? 'success' : 'error',
                message: result 
                    ? 'Produto deletado com sucesso' 
                    : 'Nenhum produto foi deletado'
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar deletar produto.'
            };
        }
    }
}

export default Produto;