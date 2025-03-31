// import pool from "../../services/db";
// class LocalEstoque {
//     private id_local_estoque: number;
//     private tx_nome: string;
//     private tx_pais: string;
//     private tx_uf: string;
//     private tx_cidade: string;
//     private tx_endereco: string;

//     constructor(
//         id_local_estoque: number,
//         tx_nome?: string,
//         tx_pais?: string,
//         tx_uf?: string,
//         tx_cidade?: string,
//         tx_endereco?: string
//     ) {
//         this.id_local_estoque = id_local_estoque;
//         this.tx_nome = tx_nome ?? "";
//         this.tx_pais = tx_pais ?? "";
//         this.tx_uf = tx_uf ?? "";
//         this.tx_cidade = tx_cidade ?? "";
//         this.tx_endereco = tx_endereco ?? "";
//     }

//     public getIdLocalEstoque(): number {
//         return this.id_local_estoque;
//     }

//     public getTxNome(): string {
//         return this.tx_nome;
//     }

//     public getTxPais(): string {
//         return this.tx_pais;
//     }

//     public getTxUf(): string {
//         return this.tx_uf;
//     }

//     public getTxCidade(): string {
//         return this.tx_cidade;
//     }

//     public getTxEndereco(): string {
//         return this.tx_endereco;
//     }

//     public static async criarLocalEstoque(tx_nome: string, tx_pais: string, tx_uf: string, tx_cidade: string, tx_endereco: string): Promise<object> {
//         try {
//             const sql_insert = `
//                 INSERT INTO tb_local_estoque(tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco)
//                 VALUES ($1, $2, $3, $4, $5) RETURNING id_local_estoque
//             `;

//             const response:any = await pool.query(sql_insert, [tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco]);

//             if (response?.length > 0) {

//                 return {
//                     result: 'success',
//                     message: 'Local de estoque criado com sucesso',
//                     data: new LocalEstoque(response[0].id_local_estoque, tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco)
//                 };
//             } else {
//                 throw new Error('Erro ao tentar inserir local de estoque');
//             }
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar criar local de estoque.'
//             };
//         }
//     }

//     public static async buscarLocalEstoque(id_local_estoque?: number): Promise<object> {
//         try {
//             const sql_search = id_local_estoque
//                 ? `SELECT * FROM tb_local_estoque WHERE id_local_estoque = $1`
//                 : `SELECT * FROM tb_local_estoque ORDER BY id_local_estoque`;
//             const response:any = await pool.query(sql_search, id_local_estoque ? [id_local_estoque] : []);

//             if(response?.length > 0){
//                 return {
//                     result: 'success',
//                     message: 'Local(ais) encontrado(s) com sucesso',
//                     data: response
//                 };
//             }else{
//                 throw new Error('Erro ao tentar buscar local(ais).');
//             }
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar buscar local(ais).'
//             };
//         }
//     }

//     public async atualizarLocalEstoque(tx_nome: string, tx_pais: string, tx_uf: string, tx_cidade: string, tx_endereco: string): Promise<object> {
//         try {
//             const sql_update = `
//                 UPDATE tb_local_estoque
//                     SET tx_nome = $1,
//                     tx_pais = $2,
//                     tx_uf = $3,
//                     tx_cidade = $4,
//                     tx_endereco = $5
//                     WHERE id_local_estoque = $6;
//             `;

//             const response:any = await pool.query(sql_update, [tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco, this.id_local_estoque]);

//             if(response){
//                 this.tx_nome = tx_nome;
//                 this.tx_pais = tx_pais;
//                 this.tx_uf = tx_uf;
//                 this.tx_cidade = tx_cidade;
//                 this.tx_endereco = tx_endereco;
    
//                 return {
//                     result: 'success',
//                     message: 'Local atualizado com sucesso'
//                 };
//             }else{
//                 throw new Error('Erro ao tentar atualizar local.');
//             }

//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar atualizar local.'
//             };
//         }
//     }

//     public async deletarLocalEstoque(): Promise<object> {
//         try {
//             const sql_delete = `DELETE FROM tb_local_estoque WHERE id_local_estoque = $1`;
//             const response:any = await pool.query(sql_delete, [this.id_local_estoque]);

//             if(response){
//                 return {
//                     result: 'success',
//                     message: 'Local deletado com sucesso'
//                 };
//             }else{
//                 throw new Error('Erro ao tentar deletar local.');
//             }
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar deletar local.'
//             };
//         }
//     }

//     public static async criarLocaisEstoqueLote(locais_esotque: Array<{tx_nome: string, tx_pais: string, tx_uf: string, tx_cidade: string, tx_endereco: string}>): Promise<object> {
//         try {
//             const response = await Promise.all(
//                 locais_esotque.map(local => 
//                     this.criarLocalEstoque( 
//                         local.tx_nome, 
//                         local.tx_pais, 
//                         local.tx_uf, 
//                         local.tx_cidade, 
//                         local.tx_endereco, 
//                     )
//                 )
//             );
    
//             return {
//                 result: 'success',
//                 message: `${response.length} locais criados com sucesso.`,
//                 data: response
//             };
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao criar locais em lote.'
//             };
//         }
//     }
// }

// export default LocalEstoque;
