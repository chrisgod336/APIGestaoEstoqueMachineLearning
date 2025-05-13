"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BIModel_1 = __importDefault(require("../../models/BI/BIModel"));
class BIController {
    // Buscar próximos 6 meses
    static getNextSixMonths(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit } = req.query;
            const result = yield BIModel_1.default.getNextSixMonths(Number(limit) || 0);
            return res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
    //Calcular próximos 6 meses
    static calculatorNextSixMonths(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield BIModel_1.default.calculateNextSixMonths();
            return res.status(result.result === "success" ? 200 : 400).json(result);
        });
    }
}
exports.default = BIController;
