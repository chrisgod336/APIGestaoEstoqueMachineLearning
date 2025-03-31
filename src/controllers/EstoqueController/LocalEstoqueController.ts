// import { Request, Response } from "express";
// import LocalEstoque from "../../models/Estoque/LocalEstoqueModel";

// class LocalEstoqueController {
//     static async criar(req: Request, res: Response) {
//         const { tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco } = req.body;
//         const resultado = await LocalEstoque.criarLocalEstoque(tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco);
//         res.json(resultado);
//     }

//     static async buscar(req: Request, res: Response) {
//         const { id_local_estoque } = req.query;
//         const resultado = await LocalEstoque.buscarLocalEstoque(id_local_estoque ? Number(id_local_estoque) : undefined);
//         res.json(resultado);
//     }

//     static async atualizar(req: Request, res: Response) {
//         const { id_local_estoque, tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco } = req.body;
//         if (!id_local_estoque) {
//             return res.status(400).json({ result: "error", message: "ID do local de estoque é obrigatório." });
//         }

//         const local = new LocalEstoque(id_local_estoque);
//         const resultado = await local.atualizarLocalEstoque(tx_nome, tx_pais, tx_uf, tx_cidade, tx_endereco);
//         res.json(resultado);
//     }

//     static async deletar(req: Request, res: Response) {
//         const { id_local_estoque } = req.query;
//         if (!id_local_estoque) {
//             return res.status(400).json({ result: "error", message: "ID do local de estoque é obrigatório." });
//         }

//         const local = new LocalEstoque(Number(id_local_estoque));
//         const resultado = await local.deletarLocalEstoque();
//         res.json(resultado);
//     }

//     static async criarLote(req: Request, res: Response) {
//         const { locais_estoque } = req.body;
//         if (!Array.isArray(locais_estoque) || locais_estoque.length === 0) {
//             return res.status(400).json({ result: "error", message: "Lista de locais de estoque inválida." });
//         }

//         const resultado = await LocalEstoque.criarLocaisEstoqueLote(locais_estoque);
//         res.json(resultado);
//     }
// }

// export default LocalEstoqueController;
