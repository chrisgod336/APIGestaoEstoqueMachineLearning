
// class Cliente {
//     private id_cliente: number;
//     private tx_nome: string;
//     private tx_cpf_cnpj: string;
//     private tx_email: string;
//     private tx_telefone: string;

//     constructor(
//         id_cliente: number,
//         tx_nome?: string,
//         tx_cpf_cnpj?: string,
//         tx_email?: string,
//         tx_telefone?: string
//     ) {
//         this.id_cliente = id_cliente;
//         this.tx_nome = tx_nome ?? "";
//         this.tx_cpf_cnpj = tx_cpf_cnpj ?? "";
//         this.tx_email = tx_email ?? "";
//         this.tx_telefone = tx_telefone ?? "";
//     }

//     public getIdCliente(): number {
//         return this.id_cliente;
//     }

//     public getTxNome(): string {
//         return this.tx_nome;
//     }

//     public getTxCpfCnpj(): string {
//         return this.tx_cpf_cnpj;
//     }

//     public getTxEmail(): string {
//         return this.tx_email;
//     }

//     public getTxTelefone(): string {
//         return this.tx_telefone;
//     }

//     public static async criarCliente(tx_nome: string, tx_cpf_cnpj: string, tx_email: string, tx_telefone:string): Promise<object> {
//         try {
//             const sql_insert = `
//                 INSERT INTO tb_cliente(tx_nome, tx_cpf_cnpj, tx_email, tx_telefone) VALUES ($1, $2, $3, $4) RETURNING id_cliente
//             `;

//             const response:any = await pool.query(sql_insert, [tx_nome, tx_cpf_cnpj, tx_email, tx_telefone]);

//             if (response?.length > 0) {

//                 return {
//                     result: 'success',
//                     message: 'Cliente criado com sucesso',
//                     data: new Cliente(response[0].id_cliente, tx_nome, tx_cpf_cnpj, tx_email, tx_telefone)
//                 };
//             } else {
//                 throw new Error('Erro ao tentar inserir cliente');
//             }
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar criar cliente.'
//             };
//         }
//     }

//     public static async buscarCliente(id_cliente?: number): Promise<object> {
//         try {
//             const sql_search = id_cliente
//                 ? `SELECT * FROM tb_cliente WHERE id_cliente = $1`
//                 : `SELECT * FROM tb_cliente ORDER BY id_cliente`;
//             const response:any = await pool.query(sql_search, id_cliente ? [id_cliente] : []);

//             if(response?.length > 0){
//                 return {
//                     result: 'success',
//                     message: 'Cliente(s) encontrado(s) com sucesso',
//                     data: response
//                 };
//             }else{
//                 throw new Error('Erro ao tentar buscar cliente(s).');
//             }
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar buscar cliente(s).'
//             };
//         }
//     }

//     public async atualizarCliente(tx_nome: string, tx_cpf_cnpj: string, tx_email: string, tx_telefone:string): Promise<object> {
//         try {
//             const sql_update = `
//                 UPDATE tb_cliente
//                     SET tx_nome = $1,
//                         tx_cpf_cnpj = $2,
//                         tx_email = $3,
//                         tx_telefone = $4
//                     WHERE id_cliente = $5;
//             `;

//             const response:any = await pool.query(sql_update, [tx_nome, tx_cpf_cnpj, tx_email, tx_telefone, this.id_cliente]);
//             if(response){
//                 this.tx_nome = tx_nome;
//                 this.tx_cpf_cnpj = tx_cpf_cnpj;
//                 this.tx_email = tx_email;
//                 this.tx_telefone = tx_telefone;
    
//                 return {
//                     result: 'success',
//                     message: 'Cliente atualizado com sucesso'
//                 };
//             }else{
//                 throw new Error('Erro ao tentar atualizar cliente.');
//             }

//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar atualizar cliente.'
//             };
//         }
//     }

//     public async deletarCliente(): Promise<object> {
//         try {
//             const sql_delete = `DELETE FROM tb_cliente WHERE id_cliente = $1`;
//             const response:any = await pool.query(sql_delete, [this.id_cliente]);

//             if(response){
//                 return {
//                     result: 'success',
//                     message: 'Cliente deletado com sucesso'
//                 };
//             }else{
//                 throw new Error('Erro ao tentar deletar cliente.');
//             }
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao tentar deletar cliente.'
//             };
//         }
//     }

//     public static async criarClienteLote(clientes: Array<{ 
//         tx_nome: string, 
//         tx_cpf_cnpj: string, 
//         tx_email: string, 
//         tx_telefone: string
//     }>): Promise<object> {
//         try {
//             const response = await Promise.all(
//                 clientes.map(cliente => 
//                     this.criarCliente(
//                         cliente.tx_nome, 
//                         cliente.tx_cpf_cnpj, 
//                         cliente.tx_email, 
//                         cliente.tx_telefone
//                     )
//                 )
//             );
    
//             return {
//                 result: 'success',
//                 message: `${response.length} clientes criados com sucesso.`,
//                 data: response
//             };
//         } catch (error: any) {
//             return {
//                 result: 'error',
//                 message: error?.message ?? 'Erro ao criar clientes em lote.'
//             };
//         }
//     }
// }

// export default Cliente;