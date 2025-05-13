"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BIController_1 = __importDefault(require("../../controllers/BIController/BIController"));
const router = (0, express_1.Router)();
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
// Criar próximos 6 meses
router.get("/getNextSixMonths", asyncHandler(BIController_1.default.getNextSixMonths));
//Calcular próximos 6 meses
router.post("/calculateNextSixMonths", asyncHandler(BIController_1.default.calculatorNextSixMonths));
exports.default = router;
