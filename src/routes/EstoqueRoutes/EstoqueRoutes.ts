import { Router } from "express";
import EstoqueController from "../../controllers/EstoqueController/EstoqueController";

const router = Router();

const asyncHandler = (fn: Function) => (req: any, res: any, next: any) =>
    Promise.resolve(fn(req, res, next)).catch(next);

router.post("/criar", asyncHandler(EstoqueController.criarEstoque));
router.get("/buscar", asyncHandler(EstoqueController.buscarEstoque));
router.put("/atualizar", asyncHandler(EstoqueController.atualizarEstoque));
router.delete("/deletar", asyncHandler(EstoqueController.deletarEstoque));
router.post("/atualizarLote", asyncHandler(EstoqueController.atualizarEstoquesLote));
router.post("/movimentar", asyncHandler(EstoqueController.movimentarEstoque));

export default router;
