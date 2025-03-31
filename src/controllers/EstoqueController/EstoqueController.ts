// import { Request, Response } from "express";
// import Estoque from "../../models/Estoque/EstoqueModel";

// class EstoqueController {
//     static async criarEstoque(req: Request, res: Response) {
//         const { id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica } = req.body;
//         const result:any = await Estoque.criarEstoque(id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica);
//         res.status(result.result === "success" ? 201 : 400).json(result);
//     }

//     static async buscarEstoque(req: Request, res: Response) {
//         const { id_local_estoque, id_estoque } = req.query;
//         const result:any = await Estoque.buscarEstoque(Number(id_local_estoque), id_estoque ? Number(id_estoque) : undefined);
//         res.status(result.result === "success" ? 200 : 400).json(result);
//     }

//     static async atualizarEstoque(req: Request, res: Response) {
//         const { id_estoque } = req.body;
//         const { id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica } = req.body;
//         const estoque = new Estoque(Number(id_estoque));
//         const result:any = await estoque.atualizarEstoque(id_local_estoque, id_produto, nu_quantidade, nu_quantidade_minima, nu_quantidade_maxima, lo_reposicao_automatica);
//         res.status(result.result === "success" ? 200 : 400).json(result);
//     }

//     static async deletarEstoque(req: Request, res: Response) {
//         const { id_estoque } = req.query;
//         const estoque = new Estoque(Number(id_estoque));
//         const result:any = await estoque.deletarEstoque();
//         res.status(result.result === "success" ? 200 : 400).json(result);
//     }

//     static async atualizarEstoquesLote(req: Request, res: Response) {
//         const { estoques } = req.body;
//         const result:any = await Estoque.atualizarEstoquesLote(estoques);
//         res.status(result.result === "success" ? 200 : 400).json(result);
//     }

//     static async movimentarEstoque(req: Request, res: Response) {
//         const { id_local_estoque_ori, id_local_estoque_dest, id_produto, nu_quantidade_mov } = req.body;
//         const result:any = await Estoque.movimentarEstoque(id_local_estoque_ori, id_local_estoque_dest, id_produto, nu_quantidade_mov);
//         res.status(result.result === "success" ? 200 : 400).json(result);
//     }
// }

// export default EstoqueController;