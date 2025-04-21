"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ClienteController_1 = __importDefault(require("../../controllers/ClienteController/ClienteController"));
const router = (0, express_1.Router)();
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
// Criar um novo cliente
router.post("/criar", asyncHandler(ClienteController_1.default.criar));
// Buscar clientes (todos ou por ID)
router.get("/buscar", asyncHandler(ClienteController_1.default.buscar));
// Atualizar um cliente
router.put("/atualizar", asyncHandler(ClienteController_1.default.atualizar));
// Deletar um cliente
router.delete("/deletar", asyncHandler(ClienteController_1.default.deletar));
exports.default = router;
