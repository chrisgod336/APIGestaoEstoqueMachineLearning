// import pool from "../../services/db";
// import MovimentoCaixa from "../MovimentoCaixa/MovimentoCaixaModel";

// class Venda {
//     private id_venda: number;
//     private id_cliente: number;
//     private dt_venda: string;
//     private vr_venda: number;
//     private status: string;

//     constructor(
//         id_venda: number,
//         id_cliente: number,
//         dt_venda?: string,
//         vr_venda?: number,
//         status?: string
//     ) {
//         this.id_venda = id_venda;
//         this.id_cliente = id_cliente;
//         this.dt_venda = dt_venda ?? "";
//         this.vr_venda = vr_venda ?? 0;
//         this.status = status ?? "ABERTA";
//     }

//     public getIdVenda(): number {
//         return this.id_venda;
//     }

//     public getIdCliente(): number {
//         return this.id_cliente;
//     }

//     public getDtVenda(): string {
//         return this.dt_venda;
//     }

//     public getVrVenda(): number {
//         return this.vr_venda;
//     }

//     public getStatus(): string {
//         return this.status;
//     }

//     public static async criarVenda(id_cliente: number, dt_venda?: string): Promise<object> {
//         try {

//             dt_venda = dt_venda?dt_venda:'NOW()';

//             const sql_insert = `
//                 INSERT INTO tb_venda(id_cliente, dt_venda)
//                 VALUES ($1, $2) RETURNING id_venda
//             `;

//             const response:any = await pool.query(sql_insert, [id_cliente, dt_venda]);

//             if (response?.length > 0) {

//                 return {
//                     result: 'success',
//                     message: 'Venda criada com sucesso',
//                     data: new Venda(response[0].id_venda, id_cliente, dt_venda, 0)
//                 };
//             } else {
//                 throw new Error('Erro ao tentar inserir venda');
//             }
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar criar venda.'
//             };
//         }
//     }

//     public static async buscarVenda(id_venda?: number): Promise<object> {
//         try {
//             const sql_search = id_venda
//                 ? `SELECT * FROM tb_venda WHERE id_venda = $1`
//                 : `SELECT * FROM tb_venda ORDER BY id_venda`;
//             const response:any = await pool.query(sql_search, id_venda ? [id_venda] : []);

//             if(response?.length > 0){
//                 return {
//                     result: 'success',
//                     message: 'Venda(s) encontrada(s) com sucesso',
//                     data: response
//                 };
//             }else{
//                 throw new Error('Erro ao tentar buscar venda(s).');
//             }
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar buscar venda(s).'
//             };
//         }
//     }

//     public async atualizarVenda(id_cliente:number, dt_venda:string, vr_venda:number): Promise<object> {
//         try {
//             const sql_update = `
//                 UPDATE tb_venda
//                     SET id_cliente = $1,
//                     dt_venda = $2,
//                     vr_venda = $3,
//                     WHERE id_venda = $4;
//             `;

//             const response:any = await pool.query(sql_update, [id_cliente, dt_venda, vr_venda, this.id_venda]);

//             if(response){
//                 this.id_cliente = id_cliente;
//                 this.dt_venda = dt_venda;
//                 this.vr_venda = vr_venda;
    
//                 return {
//                     result: 'success',
//                     message: 'Venda atualizada com sucesso'
//                 };
//             }else{
//                 throw new Error('Erro ao tentar atualizar venda.');
//             }

//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar atualizar venda.'
//             };
//         }
//     }

//     public async deletarVenda(): Promise<object> {
//         try {
//             const sql_delete = `DELETE FROM tb_venda WHERE id_venda = $1`;
//             const response:any = await pool.query(sql_delete, [this.id_venda]);

//             if(response){
//                 return {
//                     result: 'success',
//                     message: 'Venda deletada com sucesso'
//                 };
//             }else{
//                 throw new Error('Erro ao tentar deletar venda.');
//             }
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar deletar venda.'
//             };
//         }
//     }

//     public async baixarVenda() {
//         try {

//             const sql_update = `UPDATE tb_venda SET status  = 'BAIXADA' WHERE id_venda = $1`;
//             const response:any = await pool.query(sql_update, [this.id_venda]);

//             if(response){

//                 const movimentacao:any = await MovimentoCaixa.criarMovimentoCaixa(
//                     `Movimentação referente a venda: ${this.id_venda}`, 
//                     this.vr_venda, 
//                     'VENDA', 
//                     this.id_venda,
//                     0
//                 );

//                 if(movimentacao?.result === 'success'){

//                     this.status = 'BAIXADA';

//                     return {
//                         result: 'success',
//                         message: `Venda baixada com sucesso.`
//                     };
//                 }else{
//                     throw new Error(movimentacao?.message??'Erro ao tentar baixar venda.');
//                 }
                
//             }else{
//                 throw new Error('Erro ao tentar baixar venda.');
//             }

//         }catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao baixar a vendas.'
//             };
//         }
//     }

//     public async extornarVenda() {
//         try {

//             const sql_update = `UPDATE tb_venda SET status  = 'ABERTA' WHERE id_venda = $1`;
//             const response:any = await pool.query(sql_update, [this.id_venda]);

//             if(response){

//                 const movimentacao:any = await MovimentoCaixa.deletarMovimentoCaixa(this.id_venda, 0);

//                 if(movimentacao?.result === 'success'){

//                     this.status = 'ABERTA';

//                     return {
//                         result: 'success',
//                         message: `Venda extornada com sucesso.`
//                     };
//                 }else{
//                     throw new Error(movimentacao?.message??'Erro ao tentar extornar venda.');
//                 }
                
//             }else{
//                 throw new Error('Erro ao tentar extornar venda.');
//             }

//         }catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao extornar a venda.'
//             };
//         }
//     }

// }

// export default Venda;
