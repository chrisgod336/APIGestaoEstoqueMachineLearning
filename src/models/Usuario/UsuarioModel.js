"use strict";
// import pool from "../../services/db";
// class Usuario {
//     private id_usuario: number;
//     private tx_nome: string;
//     private tx_email: string;
//     private tx_senha: string;
//     constructor(id_usuario: number, tx_nome?: string, tx_email?: string, tx_senha?: string) {
//         this.id_usuario = id_usuario;
//         this.tx_nome = tx_nome ?? '';
//         this.tx_email = tx_email ?? '';
//         this.tx_senha = tx_senha ?? '';
//     }
//     public getIdUsuario(): number {
//         return this.id_usuario;
//     }
//     public getTxNome(): string {
//         return this.tx_nome;
//     }
//     public getTxEmail(): string {
//         return this.tx_email;
//     }
//     public getTxSenha(): string {
//         return this.tx_senha;
//     }
//     public static async loginUsuario(tx_email: string, tx_senha: string): Promise<object> {
//         try {
//             const sql_search = `SELECT * FROM tb_usuario WHERE tx_email = $1 AND tx_senha = $2`;
//             const response:any = await pool.query(sql_search, [tx_email, tx_senha]);
//             if (response?.length > 0) {
//                 return {
//                     result: 'success',
//                     message: 'Login realizado com sucesso.',
//                     data: response
//                 };
//             } else {
//                 return {
//                     result: 'error',
//                     message: 'E-mail ou senha inválidos.'
//                 };
//             }
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar logar com usuário.'
//             };
//         }
//     }
//     public static async criarUsuario(tx_nome: string, tx_email: string, tx_senha: string): Promise<object> {
//         try {
//             const sql_insert = `
//                 INSERT INTO tb_usuario(tx_nome, tx_email, tx_senha, tx_tipo_usuario)
//                 VALUES ($1, $2, $3, 'ADMIN') RETURNING id_usuario
//             `;
//             const response:any = await pool.query(sql_insert, [tx_nome, tx_email, tx_senha]);
//             if (response?.length > 0) {
//                 return {
//                     result: 'success',
//                     message: 'Usuário criado com sucesso',
//                     data: new Usuario(response[0].id_usuario, tx_nome, tx_email, tx_senha)
//                 };
//             } else {
//                 throw new Error('Erro ao tentar inserir usuário');
//             }
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar criar usuário.'
//             };
//         }
//     }
//     public static async buscarUsuario(id_usuario?: number): Promise<object> {
//         try {
//             const sql_search = id_usuario
//                 ? `SELECT * FROM tb_usuario WHERE id_usuario = $1`
//                 : `SELECT * FROM tb_usuario ORDER BY id_usuario`;
//             const response:any = await pool.query(sql_search, id_usuario ? [id_usuario] : []);
//             if(response?.length > 0){
//                 return {
//                     result: 'success',
//                     message: 'Usuário(s) encontrado(s) com sucesso',
//                     data: response
//                 };
//             }else{
//                 throw new Error('Erro ao tentar buscar usuário(s).');
//             }
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar buscar usuário(s).'
//             };
//         }
//     }
//     public async atualizarUsuario(tx_nome: string, tx_email: string, tx_senha: string): Promise<object> {
//         try {
//             const sql_update = `
//                 UPDATE tb_usuario
//                 SET tx_nome = $1, tx_email = $2, tx_senha = $3
//                 WHERE id_usuario = $4
//             `;
//             const response:any = await pool.query(sql_update, [tx_nome, tx_email, tx_senha, this.id_usuario]);
//             if(response){
//                 this.tx_nome = tx_nome;
//                 this.tx_email = tx_email;
//                 this.tx_senha = tx_senha;
//                 return {
//                     result: 'success',
//                     message: 'Usuário atualizado com sucesso'
//                 };
//             }else{
//                 throw new Error('Erro ao tentar atualizar usuário.');
//             }
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar atualizar usuário.'
//             };
//         }
//     }
//     public async deletarUsuario(): Promise<object> {
//         try {
//             const sql_delete = `DELETE FROM tb_usuario WHERE id_usuario = $1`;
//             const response:any = await pool.query(sql_delete, [this.id_usuario]);
//             if(response){
//                 return {
//                     result: 'success',
//                     message: 'Usuário deletado com sucesso'
//                 };
//             }else{
//                 throw new Error('Erro ao tentar deletar usuário.');
//             }
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar deletar usuário.'
//             };
//         }
//     }
// }
// export default Usuario;
