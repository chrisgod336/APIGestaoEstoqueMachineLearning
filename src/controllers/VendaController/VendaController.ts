import { Request, Response } from "express";
import Venda from "../../models/Venda/VendaModel";

class VendaController {
    static async criar(req: Request, res: Response) {
        const { id_cliente, dt_venda } = req.body;
        const result: any = await Venda.criarVenda(id_cliente, dt_venda);
        return res.status(result.result === "success" ? 201 : 400).json(result);
    }

    static async buscar(req: Request, res: Response) {
        const { id_venda } = req.query;
        const result: any = await Venda.buscarVenda(id_venda ? Number(id_venda) : undefined);
        return res.status(result.result === "success" ? 200 : 400).json(result);
    }

    static async atualizar(req: Request, res: Response) {
        const { id_venda, id_cliente, dt_venda, vr_venda } = req.body;

        if (!id_venda) {
            return res.status(400).json({ result: "error", message: "ID da venda é obrigatório." });
        }

        const venda = new Venda(id_venda, id_cliente, dt_venda, vr_venda);
        const result: any = await venda.atualizarVenda(id_cliente, dt_venda, vr_venda);
        return res.status(result.result === "success" ? 200 : 400).json(result);
    }

    static async deletar(req: Request, res: Response) {
        const { id_venda } = req.query;

        if (!id_venda) {
            return res.status(400).json({ result: "error", message: "ID da venda é obrigatório." });
        }

        const venda = new Venda(Number(id_venda), 0);
        const result: any = await venda.deletarVenda();
        return res.status(result.result === "success" ? 200 : 400).json(result);
    }

    static async baixar(req: Request, res: Response) {
        const { id_venda } = req.body;

        if (!id_venda) {
            return res.status(400).json({ result: "error", message: "ID da venda é obrigatório." });
        }

        const venda = new Venda(id_venda, 0);
        const result: any = await venda.baixarVenda();
        return res.status(result.result === "success" ? 200 : 400).json(result);
    }

    static async extornar(req: Request, res: Response) {
        const { id_venda } = req.body;

        if (!id_venda) {
            return res.status(400).json({ result: "error", message: "ID da venda é obrigatório." });
        }

        const venda = new Venda(id_venda, 0);
        const result: any = await venda.extornarVenda();
        return res.status(result.result === "success" ? 200 : 400).json(result);
    }
}

export default VendaController;
