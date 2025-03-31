"use strict";
// import pool from "../../services/db";
// class Estoque {
//     private id_estoque: number;
//     private id_local_estoque: number;
//     private id_produto: number;
//     private nu_quantidade: number;
//     private nu_quantidade_minima: number;
//     private nu_quantidade_maxima: number;
//     private lo_reposicao_automatica: boolean;
//     constructor(
//         id_estoque: number,
//         id_local_estoque?: number,
//         id_produto?: number,
//         nu_quantidade?: number,
//         nu_quantidade_minima?: number,
//         nu_quantidade_maxima?: number,
//         lo_reposicao_automatica?: boolean
//     ) {
//         this.id_estoque = id_estoque;
//         this.id_local_estoque = id_local_estoque??0;
//         this.id_produto = id_produto??0;
//         this.nu_quantidade = nu_quantidade ?? 0;
//         this.nu_quantidade_minima = nu_quantidade_minima ?? 0;
//         this.nu_quantidade_maxima = nu_quantidade_maxima ?? 0;
//         this.lo_reposicao_automatica = lo_reposicao_automatica ?? false;
//     }
//     public getIdEstoque(): number {
//         return this.id_estoque;
//     }
//     public getIdLocalEstoque(): number {
//         return this.id_local_estoque;
//     }
//     public getIdProduto(): number {
//         return this.id_produto;
//     }
//     public getNuQuantidade(): number {
//         return this.nu_quantidade;
//     }
//     public getNuQuantidadeMinima(): number {
//         return this.nu_quantidade_minima;
//     }
//     public getNuQuantidadeMaxima(): number {
//         return this.nu_quantidade_maxima;
//     }
//     public getLoReposicaoAutomatica(): boolean {
//         return this.lo_reposicao_automatica;
//     }
//     public static async criarEstoque(id_local_estoque:number, id_produto:number, nu_quantidade:number, nu_quantidade_minima:number, nu_quantidade_maxima:number, lo_reposicao_automatica:boolean): Promise<object> {
//         try {
//             const sql_insert = `
//                 INSERT INTO tb_estoque(id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica)
//                 VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_estoque
//             `;
//             const response:any = await pool.query(sql_insert, [id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica]);
//             if (response?.length > 0) {
//                 return {
//                     result: 'success',
//                     message: 'Estoque criado com sucesso',
//                     data: new Estoque(response[0].id_estoque, id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica)
//                 };
//             } else {
//                 throw new Error('Erro ao tentar inserir estoque');
//             }
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar criar estoque.'
//             };
//         }
//     }
//     public static async buscarEstoque(id_local_estoque: number, id_estoque?: number): Promise<object> {
//         try {
//             const sql_search = id_estoque
//                 ? `SELECT * FROM tb_estoque WHERE id_local_estoque = $1 AND id_estoque = $2`
//                 : `SELECT * FROM tb_estoque WHERE id_local_estoque = $1 ORDER BY id_estoque`;
//             const response:any = await pool.query(sql_search, id_estoque ? [id_local_estoque, id_estoque] : [id_local_estoque]);
//             if(response?.length > 0){
//                 return {
//                     result: 'success',
//                     message: 'Estoque(s) encontrado(s) com sucesso',
//                     data: response
//                 };
//             }else{
//                 throw new Error('Erro ao tentar buscar estoque(s).');
//             }
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar buscar estoque(s).'
//             };
//         }
//     }
//     public async atualizarEstoque(id_local_estoque:number, id_produto:number, nu_quantidade:number, nu_quantidade_minima:number, nu_quantidade_maxima:number, lo_reposicao_automatica:boolean): Promise<object> {
//         try {
//             const sql_update = `
//                 UPDATE tb_estoque
//                     SET id_local_estoque = $1,
//                     id_produto = $2,
//                     nu_quantidade = $3,
//                     nu_quantidade_minima = $4,
//                     nu_quantidade_maxima = $5,
//                     lo_reposicao_automatica = $6
//                     WHERE id_estoque = $7;
//             `;
//             const response:any = await pool.query(sql_update, [id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica, this.id_estoque]);
//             if(response){
//                 this.id_local_estoque = id_local_estoque;
//                 this.id_produto = id_produto;
//                 this.nu_quantidade = nu_quantidade;
//                 this.nu_quantidade_minima = nu_quantidade_minima;
//                 this.nu_quantidade_maxima = nu_quantidade_maxima;
//                 this.lo_reposicao_automatica = lo_reposicao_automatica;
//                 return {
//                     result: 'success',
//                     message: 'Estoque atualizado com sucesso'
//                 };
//             }else{
//                 throw new Error('Erro ao tentar atualizar estoque.');
//             }
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar atualizar estoque.'
//             };
//         }
//     }
//     public async deletarEstoque(): Promise<object> {
//         try {
//             const sql_delete = `DELETE FROM tb_estoque WHERE id_estoque = $1`;
//             const response:any = await pool.query(sql_delete, [this.id_estoque]);
//             if(response){
//                 return {
//                     result: 'success',
//                     message: 'Estoque deletado com sucesso'
//                 };
//             }else{
//                 throw new Error('Erro ao tentar deletar estoque.');
//             }
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar deletar estoque.'
//             };
//         }
//     }
//     public static async atualizarEstoquesLote(estoques: Array<{id_local_estoque:number, id_produto:number, nu_quantidade:number, nu_quantidade_minima:number, nu_quantidade_maxima:number, lo_reposicao_automatica:boolean}>): Promise<object> {
//         try {
//             const response = await Promise.all(
//                 estoques.map(async estoque => {
//                     const sql_search = `SELECT id_estoque FROM tb_estoque WHERE id_local_estoque = $1 AND id_produto = $2`;
//                     const response_search:any = await pool.query(sql_search, [estoque.id_local_estoque, estoque.id_produto]);
//                     if(response_search.length > 0 && response_search[0]?.id_estoque > 0){
//                         const id_estoque = response_search[0]?.id_estoque;
//                         const stq = new Estoque(id_estoque);
//                         const res = await stq.atualizarEstoque(
//                             estoque.id_local_estoque,
//                             estoque.id_produto,
//                             estoque.nu_quantidade,
//                             estoque.nu_quantidade_minima,
//                             estoque.nu_quantidade_maxima,
//                             estoque.lo_reposicao_automatica
//                         );
//                         return res;
//                     }else{
//                         const res = await Estoque.criarEstoque(
//                             estoque.id_local_estoque,
//                             estoque.id_produto,
//                             estoque.nu_quantidade,
//                             estoque.nu_quantidade_minima,
//                             estoque.nu_quantidade_maxima,
//                             estoque.lo_reposicao_automatica
//                         );
//                         return res;
//                     }
//                 })
//             );
//             return {
//                 result: 'success',
//                 message: `${response.length} estoques atualizados com sucesso.`,
//                 data: response
//             };
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao atualizar estoque em lote.'
//             };
//         }
//     }
//     public static async movimentarEstoque(id_local_estoque_ori:number, id_local_estoque_dest:number, id_produto:number, nu_quantidade_mov:number): Promise<object> {
//         try {
//             const sql_search = `SELECT id_estoque, id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica 
//             FROM tb_estoque WHERE id_local_estoque = $1 AND id_produto = $2`;
//             const res:any = await pool.query(sql_search, [id_local_estoque_ori, id_produto]);
//             if(res.length == 0 || res[0]?.id_estoque <= 0){
//                 throw new Error('Estoque de origem não encontrado.');
//             }
//             const EstoqueOri = new Estoque(res[0]?.id_estoque);
//             const res1:any = await EstoqueOri.atualizarEstoque(
//                 res[0]?.id_local_estoque,
//                 res[0]?.id_produto,
//                 (res[0]?.nu_quantidade - nu_quantidade_mov),
//                 res[0]?.nu_quantidade_minima,
//                 res[0]?.nu_quantidade_maxima,
//                 res[0]?.lo_reposicao_automatica
//             );
//             if(res1.result == "success"){
//                 const sql_search = `SELECT id_estoque, id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica
//                  FROM tb_estoque WHERE id_local_estoque = $1 AND id_produto = $2`;
//                 const res2:any = await pool.query(sql_search, [id_local_estoque_dest, id_produto]);
//                 if(res2.length > 0 && res2[0].id_estoque > 0){
//                     const estoqueDest = new Estoque(res2[0].id_estoque);
//                     const res3:any = await estoqueDest.atualizarEstoque(
//                         res2[0].id_local_estoque,
//                         res2[0].id_produto,
//                         (res2[0].nu_quantidade + nu_quantidade_mov),
//                         res2[0].nu_quantidade_minima,
//                         res2[0].nu_quantidade_maxima,
//                         res2[0].lo_reposicao_automatica
//                     );
//                     if(res3.result == "error"){
//                         throw new Error(res3.message);
//                     }
//                 }else{
//                     const res3:any = await Estoque.criarEstoque(
//                         id_local_estoque_dest,
//                         id_produto,
//                         nu_quantidade_mov,
//                         0,
//                         0,
//                         true
//                     );
//                     if(res3.result == "error"){
//                         throw new Error(res3.message);
//                     }
//                 }
//             }else{
//                 throw new Error('Erro ao atualizar estoque de origem.');
//             }
//             return {
//                 result: 'success',
//                 message: `Estoque movimentado com sucesso.`,
//             };
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao movimentar estoque.'
//             };
//         }
//     }
// }
// export default Estoque;
