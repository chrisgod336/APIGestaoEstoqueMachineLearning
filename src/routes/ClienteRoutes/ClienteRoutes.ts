import { Router } from "express";
import ClienteController from "../../controllers/ClienteController/ClienteController";

const router = Router();

const asyncHandler = (fn: Function) => (req: any, res: any, next: any) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Criar um novo cliente
router.post("/criar", asyncHandler(ClienteController.criar));

// Buscar clientes (todos ou por ID)
router.get("/buscar", asyncHandler(ClienteController.buscar));

// Atualizar um cliente
router.put("/atualizar", asyncHandler(ClienteController.atualizar));

// Deletar um cliente
router.delete("/deletar", asyncHandler(ClienteController.deletar));

// Criar clientes em lote
router.post("/criarLote", asyncHandler(ClienteController.criarLote));

export default router;
