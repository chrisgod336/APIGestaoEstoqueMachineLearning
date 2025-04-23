import { Request, Response } from "express";
import Compra from "../../models/Compra/CompraModel";

class CompraController {

    static async criar (req:Request, res:Response) {
        const { id_fornecedor, dt_compra } = req.body;
        const result:any = await Compra.criarCompra(id_fornecedor, dt_compra);
        res.status(result.result === 'success' ? 201 : 400).json(result);
    };

    static async buscar (req:Request, res:Response) {
        const { id_compra } = req.query;
        const result:any = await Compra.buscarCompra(id_compra ? Number(id_compra) : undefined);
        res.status(result.result === 'success' ? 200 : 404).json(result);
    };

    static async atualizar (req:Request, res:Response) {
        const { id_compra, id_fornecedor, dt_compra } = req.body;
        const compra = new Compra(Number(id_compra), id_fornecedor);
        const result:any = await compra.atualizarCompra(id_fornecedor, dt_compra);
        res.status(result.result === 'success' ? 200 : 400).json(result);
    };

    static async deletar (req:Request, res:Response) {
        const { id_compra } = req.query;
        const compra = new Compra(Number(id_compra), 0);
        const result:any = await compra.deletarCompra();
        res.status(result.result === 'success' ? 200 : 400).json(result);
    };

    static async baixar (req:Request, res:Response) {
        const { id_compra, dt_entrega } = req.body;
        const compra = new Compra(Number(id_compra), 0);
        const result:any = await compra.baixarCompra(dt_entrega);
        res.status(result.result === 'success' ? 200 : 400).json(result);
    };

    static async extornar (req:Request, res:Response) {
        const { id_compra } = req.body;
        const compra = new Compra(Number(id_compra), 0);
        const result:any = await compra.extornarCompra();
        res.status(result.result === 'success' ? 200 : 400).json(result);
    };
}

export default CompraController;
