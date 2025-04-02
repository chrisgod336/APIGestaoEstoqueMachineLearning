"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const VendaController_1 = __importDefault(require("../../controllers/VendaController/VendaController"));
const router = express_1.default.Router();
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
router.post("/criar", asyncHandler(VendaController_1.default.criar));
router.get("/buscar", asyncHandler(VendaController_1.default.buscar));
router.put("/atualizar", asyncHandler(VendaController_1.default.atualizar));
router.delete("/deletar", asyncHandler(VendaController_1.default.deletar));
router.put("/baixar", asyncHandler(VendaController_1.default.baixar));
router.put("/extornar", asyncHandler(VendaController_1.default.extornar));
exports.default = router;
