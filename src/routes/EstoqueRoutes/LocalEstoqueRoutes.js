"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LocalEstoqueController_1 = __importDefault(require("../../controllers/EstoqueController/LocalEstoqueController"));
const router = (0, express_1.Router)();
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
router.post("/criar", asyncHandler(LocalEstoqueController_1.default.criar));
router.get("/buscar", asyncHandler(LocalEstoqueController_1.default.buscar));
router.put("/atualizar", asyncHandler(LocalEstoqueController_1.default.atualizar));
router.delete("/deletar", asyncHandler(LocalEstoqueController_1.default.deletar));
router.post("/criarLote", asyncHandler(LocalEstoqueController_1.default.criarLote));
exports.default = router;
