"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FornecedorControllers_1 = __importDefault(require("../../controllers/FornecedorController/FornecedorControllers"));
const router = (0, express_1.Router)();
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
router.post("/criar", asyncHandler(FornecedorControllers_1.default.criar));
router.get("/buscar", asyncHandler(FornecedorControllers_1.default.buscar));
router.put("/atualizar", asyncHandler(FornecedorControllers_1.default.atualizar));
router.delete("/deletar", asyncHandler(FornecedorControllers_1.default.deletar));
exports.default = router;
