import express from "express";
import CompraController from "../../controllers/CompraController/CompraController";

const router = express.Router();

const asyncHandler = (fn: Function) => (req: any, res: any, next: any) =>
    Promise.resolve(fn(req, res, next)).catch(next);

router.post("/criar", asyncHandler(CompraController.criar));
router.get("/buscar", asyncHandler(CompraController.buscar));
router.put("/atualizar", asyncHandler(CompraController.atualizar));
router.delete("/deletar", asyncHandler(CompraController.deletar));
router.put("/baixar", asyncHandler(CompraController.baixar));
router.put("/extornar", asyncHandler(CompraController.extornar));

export default router;
