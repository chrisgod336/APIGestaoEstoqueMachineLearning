import { Request, Response } from "express";
import VendaProduto from "../../models/Venda/VendaProdutoModel";

class VendaProdutoController {
    static async criar(req: Request, res: Response) {
        try {
            const { id_venda, id_local_estoque, id_estoque, id_produto, nu_quantidade} = req.body;
            const resultado = await VendaProduto.criarVendaProduto(id_venda, id_local_estoque, id_estoque, id_produto, nu_quantidade);
            res.status(201).json(resultado);
        } catch (error: any) {
            res.status(500).json({ result: "error", message: error.message });
        }
    }

    static async buscar(req: Request, res: Response) {
        try {
            const { id_venda, id_venda_produto } = req.query;
            const resultado = await VendaProduto.buscarVendaProduto(Number(id_venda), id_venda_produto ? Number(id_venda_produto) : undefined);
            res.status(200).json(resultado);
        } catch (error: any) {
            res.status(500).json({ result: "error", message: error.message });
        }
    }

    static async atualizar(req: Request, res: Response) {
        try {
            const { id_venda, id_venda_produto, id_local_estoque, id_estoque, id_produto, nu_quantidade} = req.body;
            const vendaProduto = new VendaProduto(Number(id_venda_produto), id_venda, 0, 0, 0); 
            const resultado = await vendaProduto.atualizarVendaProduto(id_local_estoque, id_estoque, id_produto, nu_quantidade);
            res.status(200).json(resultado);
        } catch (error: any) {
            res.status(500).json({ result: "error", message: error.message });
        }
    }

    static async deletar(req: Request, res: Response) {
        try {
            const { id_venda_produto, id_venda } = req.params;
            const vendaProduto = new VendaProduto(Number(id_venda_produto), Number(id_venda), 0, 0, 0);
            const resultado = await vendaProduto.deletarVendaProduto();
            res.status(200).json(resultado);
        } catch (error: any) {
            res.status(500).json({ result: "error", message: error.message });
        }
    }
}

export default VendaProdutoController;
