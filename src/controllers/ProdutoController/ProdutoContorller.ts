import { Request, Response } from "express";
import Produto from "../../models/Produto/ProdutoModel";

class ProdutoController {
    static async criar(req: Request, res: Response) {
        const { id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda } = req.body;

        const result:any = await Produto.criarProduto(id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda);
        return res.status(result.result === "success" ? 201 : 400).json(result);
    }

    static async buscar(req: Request, res: Response) {
        const { id_produto } = req.query;
        const result:any = await Produto.buscarProduto(id_produto ? Number(id_produto) : undefined);
        return res.status(result.result === "success" ? 200 : 400).json(result);
    }

    static async atualizar(req: Request, res: Response) {
        const { id_produto, id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda } = req.body;

        if (!id_produto) {
            return res.status(400).json({ result: "error", message: "ID do produto é obrigatório." });
        }

        const produto = new Produto(id_produto, id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda);
        const result:any = await produto.atualizarProduto(id_fornecedor, tx_nome, tx_marca, vr_preco_compra, vr_preco_venda);
        return res.status(result.result === "success" ? 200 : 400).json(result);
    }

    static async deletar(req: Request, res: Response) {
        const { id_produto } = req.query;

        if (!id_produto) {
            return res.status(400).json({ result: "error", message: "ID do produto é obrigatório." });
        }

        const produto = new Produto(Number(id_produto));
        const result:any = await produto.deletarProduto();
        return res.status(result.result === "success" ? 200 : 400).json(result);
    }

    static async criarLote(req: Request, res: Response) {
        const { produtos } = req.body;

        if (!Array.isArray(produtos) || produtos.length === 0) {
            return res.status(400).json({ result: "error", message: "Lista de produtos inválida." });
        }

        const result:any = await Produto.criarProdutosLote(produtos);
        return res.status(result.result === "success" ? 201 : 400).json(result);
    }
}

export default ProdutoController;
