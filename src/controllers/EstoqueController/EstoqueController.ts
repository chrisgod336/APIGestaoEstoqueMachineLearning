import { Request, Response } from "express";
import Estoque from "../../models/Estoque/EstoqueModel";

class EstoqueController {
    static async criarEstoque(req: Request, res: Response) {
        const { id_produto, nu_quantidade} = req.body;
        const result:any = await Estoque.criarEstoque(id_produto, nu_quantidade);
        res.status(result.result === "success" ? 201 : 400).json(result);
    }

    static async buscarEstoque(req: Request, res: Response) {
        const { id_estoque } = req.query;
        const result:any = await Estoque.buscarEstoque(id_estoque ? Number(id_estoque) : undefined);
        res.status(result.result === "success" ? 200 : 400).json(result);
    }

    static async atualizarEstoque(req: Request, res: Response) {
        const { id_estoque ,id_produto, nu_quantidade } = req.body;
        const estoque = new Estoque(Number(id_estoque));
        const result:any = await estoque.atualizarEstoque( id_produto, nu_quantidade );
        res.status(result.result === "success" ? 200 : 400).json(result);
    }

    static async deletarEstoque(req: Request, res: Response) {
        const { id_estoque } = req.query;
        const estoque = new Estoque(Number(id_estoque));
        const result:any = await estoque.deletarEstoque();
        res.status(result.result === "success" ? 200 : 400).json(result);
    }

    static async countProduto(req: Request, res: Response) {
        const { id_produto } = req.query;
        const result:any = await Estoque.countProduto(Number(id_produto));
        res.status(result.result === "success" ? 200 : 400).json(result);
    }
}

export default EstoqueController;