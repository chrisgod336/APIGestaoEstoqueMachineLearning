"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MovimentoCaixaController_1 = __importDefault(require("../../controllers/MovimentoCaixaController/MovimentoCaixaController"));
const router = (0, express_1.Router)();
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
router.get("/buscar", asyncHandler(MovimentoCaixaController_1.default.buscar));
exports.default = router;
