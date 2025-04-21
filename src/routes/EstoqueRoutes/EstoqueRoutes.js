"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EstoqueController_1 = __importDefault(require("../../controllers/EstoqueController/EstoqueController"));
const router = (0, express_1.Router)();
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
router.post("/criar", asyncHandler(EstoqueController_1.default.criarEstoque));
router.get("/buscar", asyncHandler(EstoqueController_1.default.buscarEstoque));
router.put("/atualizar", asyncHandler(EstoqueController_1.default.atualizarEstoque));
router.delete("/deletar", asyncHandler(EstoqueController_1.default.deletarEstoque));
router.get("/countProduto", asyncHandler(EstoqueController_1.default.countProduto));
exports.default = router;
