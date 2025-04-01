"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuarioController_1 = __importDefault(require("../../controllers/UsuarioController/UsuarioController"));
const router = (0, express_1.Router)();
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
router.post("/login", asyncHandler(UsuarioController_1.default.login));
router.post("/criar", asyncHandler(UsuarioController_1.default.criar));
router.get("/buscar", asyncHandler(UsuarioController_1.default.buscar));
router.put("/atualizar", asyncHandler(UsuarioController_1.default.atualizar));
router.delete("/deletar", asyncHandler(UsuarioController_1.default.deletar));
exports.default = router;
