"use strict";
// import { Request, Response } from "express";
// import Cliente from "../../models/Cliente/ClienteModel";
// class ClienteController {
//   // Criar cliente
//   static async criar(req: Request, res: Response) {
//     const { tx_nome, tx_cpf_cnpj, tx_email, tx_telefone } = req.body;
//     const result: any = await Cliente.criarCliente(tx_nome, tx_cpf_cnpj, tx_email, tx_telefone);
//     return res.status(result.result === "success" ? 201 : 400).json(result);
//   }
//   // Buscar clientes (todos ou por ID)
//   static async buscar(req: Request, res: Response) {
//     const { id_cliente } = req.query;
//     const result: any = await Cliente.buscarCliente(id_cliente ? Number(id_cliente) : undefined);
//     return res.status(result.result === "success" ? 200 : 400).json(result);
//   }
//   // Atualizar cliente
//   static async atualizar(req: Request, res: Response) {
//     const { id_cliente, tx_nome, tx_cpf_cnpj, tx_email, tx_telefone } = req.body;
//     const cliente = new Cliente(Number(id_cliente));
//     const result: any = await cliente.atualizarCliente(tx_nome, tx_cpf_cnpj, tx_email, tx_telefone);
//     return res.status(result.result === "success" ? 200 : 400).json(result);
//   }
//   // Deletar cliente
//   static async deletar(req: Request, res: Response) {
//     const { id_cliente } = req.query;
//     const cliente = new Cliente(Number(id_cliente));
//     const result: any = await cliente.deletarCliente();
//     return res.status(result.result === "success" ? 200 : 400).json(result);
//   }
//   // Criar clientes em lote
//   static async criarLote(req: Request, res: Response) {
//     const { clientes } = req.body;
//     const result: any = await Cliente.criarClienteLote(clientes);
//     return res.status(result.result === "success" ? 201 : 400).json(result);
//   }
// }
// export default ClienteController;
