import { Request, Response } from "express";
import CompraProduto from "../../models/Compra/CompraProdutoModel";

class CompraProdutoController {
    
    static async criar(req: Request, res: Response) {
        try {
            const { id_compra, id_local_estoque, id_estoque, id_produto, nu_quantidade } = req.body;
            const result:any = await CompraProduto.criarCompraProduto(id_compra, id_local_estoque, id_estoque, id_produto, nu_quantidade);
            return res.status(result.result === 'success' ? 201 : 400).json(result);
        } catch (error: any) {
            return res.status(500).json({ result: 'error', message: error.message || 'Erro ao criar compra produto.' });
        }
    }

    static async buscar(req: Request, res: Response) {
        try {
            const { id_compra, id_compra_produto } = req.query;
            const result:any = await CompraProduto.buscarCompraProduto(Number(id_compra), id_compra_produto ? Number(id_compra_produto) : undefined);
            return res.status(result.result === 'success' ? 200 : 400).json(result);
        } catch (error: any) {
            return res.status(500).json({ result: 'error', message: error.message || 'Erro ao buscar compra produto.' });
        }
    }

    static async atualizar(req: Request, res: Response) {
        try {
            const { id_compra, id_compra_produto, id_local_estoque, id_estoque, id_produto, nu_quantidade } = req.body;
            
            const compraProduto = new CompraProduto(Number(id_compra_produto), id_compra, id_local_estoque, id_estoque, id_produto, nu_quantidade);
            const result:any = await compraProduto.atualizarCompraProduto(id_local_estoque, id_estoque, id_produto, nu_quantidade);
            
            return res.status(result.result === 'success' ? 200 : 400).json(result);
        } catch (error: any) {
            return res.status(500).json({ result: 'error', message: error.message || 'Erro ao atualizar compra produto.' });
        }
    }

    static async deletar(req: Request, res: Response) {
        try {
            const { id_compra, id_compra_produto } = req.query;
            
            const compraProduto = new CompraProduto(Number(id_compra_produto), Number(id_compra), 0, 0, 0);
            const result:any = await compraProduto.deletarCompraProduto();
            
            return res.status(result.result === 'success' ? 200 : 400).json(result);
        } catch (error: any) {
            return res.status(500).json({ result: 'error', message: error.message || 'Erro ao deletar compra produto.' });
        }
    }
}

export default CompraProdutoController;