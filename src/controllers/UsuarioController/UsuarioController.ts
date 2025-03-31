// import { Request, Response } from "express";
// import Usuario from "../../models/Usuario/UsuarioModel";

// class UsuarioController {
  
//   // Login
//   static async login(req: Request, res: Response) {
//     const { tx_email, tx_senha } = req.body;
//     const result:any = await Usuario.loginUsuario(tx_email, tx_senha);
//     return res.status(result.result === "success" ? 200 : 400).json(result);
//   }

//   // Criar usuário
//   static async criar(req: Request, res: Response) {
//     const { tx_nome, tx_email, tx_senha } = req.body;
//     const result:any = await Usuario.criarUsuario(tx_nome, tx_email, tx_senha);
//     return res.status(result.result === "success" ? 201 : 400).json(result);
//   }

//   // Buscar usuários (todos ou por ID)
//   static async buscar(req: Request, res: Response) {
//     const { id_usuario } = req.query;
//     const result:any = await Usuario.buscarUsuario(id_usuario ? Number(id_usuario) : undefined);
//     return res.status(result.result === "success" ? 200 : 400).json(result);
//   }

//   // Atualizar usuário
//   static async atualizar(req: Request, res: Response) {
//     const { id_usuario, tx_nome, tx_email, tx_senha } = req.body;

//     const usuario = new Usuario(Number(id_usuario));
//     const result:any = await usuario.atualizarUsuario(tx_nome, tx_email, tx_senha);
//     return res.status(result.result === "success" ? 200 : 400).json(result);
//   }

//   // Deletar usuário
//   static async deletar(req: Request, res: Response) {
//     const { id_usuario } = req.query;

//     const usuario = new Usuario(Number(id_usuario));
//     const result:any = await usuario.deletarUsuario();
//     return res.status(result.result === "success" ? 200 : 400).json(result);
//   }
// }

// export default UsuarioController;
