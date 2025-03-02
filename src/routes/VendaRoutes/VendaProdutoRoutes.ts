import express from "express";
import VendaProdutoController from "../../controllers/VendaController/VendaProdutoController";

const router = express.Router();

const asyncHandler = (fn: Function) => (req: any, res: any, next: any) =>
    Promise.resolve(fn(req, res, next)).catch(next);

router.post("/criar", asyncHandler(VendaProdutoController.criar));
router.get("/buscar", asyncHandler(VendaProdutoController.buscar));
router.put("/atualizar", asyncHandler(VendaProdutoController.atualizar));
router.delete("/deletar", asyncHandler(VendaProdutoController.deletar));

export default router;
