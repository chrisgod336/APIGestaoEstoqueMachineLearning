"use strict";
// import pool from "../../services/db";
// class Produto {
//     private id_produto: number;
//     private id_fornecedor: number;
//     private tx_nome: string;
//     private tx_marca: string;
//     private vr_preco_compra: number;
//     private vr_preco_venda: number;
//     constructor(
//         id_produto: number,
//         id_fornecedor?: number,
//         tx_nome?: string,
//         tx_marca?: string,
//         vr_preco_compra?: number,
//         vr_preco_venda?: number
//     ) {
//         this.id_produto = id_produto;
//         this.id_fornecedor = id_fornecedor??0;
//         this.tx_nome = tx_nome ?? "";
//         this.tx_marca = tx_marca ?? "";
//         this.vr_preco_compra = vr_preco_compra ?? 0;
//         this.vr_preco_venda = vr_preco_venda ?? 0;
//     }
//     public getIdProduto(): number {
//         return this.id_produto;
//     }
//     public getIdFornecedor(): number {
//         return this.id_fornecedor;
//     }
//     public getTxNome(): string {
//         return this.tx_nome;
//     }
//     public getTxMarca(): string {
//         return this.tx_marca;
//     }
//     public getVrPrecoCompra(): number {
//         return this.vr_preco_compra;
//     }
//     public getVrPrecoVenda(): number {
//         return this.vr_preco_venda;
//     }
//     public static async criarProduto(id_fornecedor: number, tx_nome: string, tx_marca: string, vr_preco_compra: number, vr_preco_venda:number): Promise<object> {
//         try {
//             const sql_insert = `
//                 INSERT INTO tb_produto(id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda)
//                 VALUES ($1, $2, $3, $4, $5) RETURNING id_produto
//             `;
//             const response:any = await pool.query(sql_insert, [id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda]);
//             if (response?.length > 0) {
//                 return {
//                     result: 'success',
//                     message: 'Produto criado com sucesso',
//                     data: new Produto(response[0].id_produto, id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda)
//                 };
//             } else {
//                 throw new Error('Erro ao tentar inserir produto');
//             }
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar criar produto.'
//             };
//         }
//     }
//     public static async buscarProduto(id_produto?: number): Promise<object> {
//         try {
//             const sql_search = id_produto
//                 ? `SELECT * FROM tb_produto WHERE id_produto = $1`
//                 : `SELECT * FROM tb_produto ORDER BY id_produto`;
//             const response:any = await pool.query(sql_search, id_produto ? [id_produto] : []);
//             if(response?.length > 0){
//                 return {
//                     result: 'success',
//                     message: 'Produto(s) encontrado(s) com sucesso',
//                     data: response
//                 };
//             }else{
//                 throw new Error('Erro ao tentar buscar produto(s).');
//             }
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar buscar produto(s).'
//             };
//         }
//     }
//     public async atualizarProduto(id_fornecedor:number, tx_nome: string, tx_marca: string, vr_preco_compra:number, vr_preco_venda:number): Promise<object> {
//         try {
//             const sql_update = `
//                 UPDATE tb_produto
//                     SET id_fornecedor = $1,
//                     tx_nome = $2,
//                     tx_marca = $3,
//                     vr_preco_compra = $4,
//                     vr_preco_venda = $5
//                     WHERE id_produto = $6;
//             `;
//             const response:any = await pool.query(sql_update, [id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda, this.id_produto]);
//             if(response){
//                 this.id_fornecedor = id_fornecedor;
//                 this.tx_nome = tx_nome;
//                 this.tx_marca = tx_marca;
//                 this.vr_preco_compra = vr_preco_compra;
//                 this.vr_preco_venda = vr_preco_venda;
//                 return {
//                     result: 'success',
//                     message: 'Produto atualizado com sucesso'
//                 };
//             }else{
//                 throw new Error('Erro ao tentar atualizar produto.');
//             }
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar atualizar produto.'
//             };
//         }
//     }
//     public async deletarProduto(): Promise<object> {
//         try {
//             const sql_delete = `DELETE FROM tb_produto WHERE id_produto = $1`;
//             const response:any = await pool.query(sql_delete, [this.id_produto]);
//             if(response){
//                 return {
//                     result: 'success',
//                     message: 'Produto deletado com sucesso'
//                 };
//             }else{
//                 throw new Error('Erro ao tentar deletar produto.');
//             }
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar deletar produto.'
//             };
//         }
//     }
//     public static async criarProdutosLote(produtos: Array<{id_fornecedor:number, tx_nome: string, tx_marca: string, vr_preco_compra:number, vr_preco_venda:number}>): Promise<object> {
//         try {
//             const response = await Promise.all(
//                 produtos.map(produto => 
//                     this.criarProduto(
//                         produto.id_fornecedor, 
//                         produto.tx_nome, 
//                         produto.tx_marca, 
//                         produto.vr_preco_compra, 
//                         produto.vr_preco_venda
//                     )
//                 )
//             );
//             return {
//                 result: 'success',
//                 message: `${response.length} produtos criados com sucesso.`,
//                 data: response
//             };
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao criar produtos em lote.'
//             };
//         }
//     }
// }
// export default Produto;
