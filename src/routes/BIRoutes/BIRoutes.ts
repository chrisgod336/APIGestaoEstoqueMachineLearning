import { Router } from "express";
import BIController from "../../controllers/BIController/BIController";

const router = Router();

const asyncHandler = (fn: Function) => (req: any, res: any, next: any) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Criar próximos 6 meses
router.get("/getNextSixMonths", asyncHandler(BIController.getNextSixMonths));

//Calcular próximos 6 meses
router.post("/calculateNextSixMonths", asyncHandler(BIController.calculatorNextSixMonths));

export default router;
