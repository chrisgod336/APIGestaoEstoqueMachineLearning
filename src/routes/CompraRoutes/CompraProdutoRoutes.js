"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CompraProdutoController_1 = __importDefault(require("../../controllers/CompraController/CompraProdutoController"));
const router = express_1.default.Router();
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
router.post("/criar", asyncHandler(CompraProdutoController_1.default.criar));
router.get("/buscar", asyncHandler(CompraProdutoController_1.default.buscar));
router.put("/atualizar", asyncHandler(CompraProdutoController_1.default.atualizar));
router.delete("/deletar", asyncHandler(CompraProdutoController_1.default.deletar));
exports.default = router;
