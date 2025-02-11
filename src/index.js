"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const UsuarioRoutes_1 = __importDefault(require("./routes/UsuarioRoutes/UsuarioRoutes"));
const FornecedorRoutes_1 = __importDefault(require("./routes/FornecedorRoutes/FornecedorRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Rota de teste
app.get("/", (req, res) => {
    res.send("API está rodando 🚀");
});
//Rotas
app.use("/usuario", UsuarioRoutes_1.default);
app.use("/fornecedor", FornecedorRoutes_1.default);
// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
