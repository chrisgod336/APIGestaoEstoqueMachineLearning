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
const ClienteRoutes_1 = __importDefault(require("./routes/ClienteRoutes/ClienteRoutes"));
const ProdutoRoutes_1 = __importDefault(require("./routes/ProdutoRoutes/ProdutoRoutes"));
const LocalEstoqueRoutes_1 = __importDefault(require("./routes/EstoqueRoutes/LocalEstoqueRoutes"));
const EstoqueRoutes_1 = __importDefault(require("./routes/EstoqueRoutes/EstoqueRoutes"));
const VendaRoutes_1 = __importDefault(require("./routes/VendaRoutes/VendaRoutes"));
const VendaProdutoRoutes_1 = __importDefault(require("./routes/VendaRoutes/VendaProdutoRoutes"));
const CompraRoutes_1 = __importDefault(require("./routes/CompraRoutes/CompraRoutes"));
const CompraProdutoRoutes_1 = __importDefault(require("./routes/CompraRoutes/CompraProdutoRoutes"));
const MovimentoCaixaRoutes_1 = __importDefault(require("./routes/MovimentoCaixaRoutes/MovimentoCaixaRoutes"));
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
app.use("/cliente", ClienteRoutes_1.default);
app.use("/produto", ProdutoRoutes_1.default);
app.use("/localEstoque", LocalEstoqueRoutes_1.default);
app.use("/estoque", EstoqueRoutes_1.default);
app.use("/venda", VendaRoutes_1.default);
app.use("/vendaProduto", VendaProdutoRoutes_1.default);
app.use("/compra", CompraRoutes_1.default);
app.use("/compraProdutos", CompraProdutoRoutes_1.default);
app.use("/movimentoCaixa", MovimentoCaixaRoutes_1.default);
// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
