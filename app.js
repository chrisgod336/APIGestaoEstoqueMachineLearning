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
exports.db = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
// Importação de rotas
// import UsuarioRoutes from './src/routes/UsuarioRoutes/UsuarioRoutes';
// import FornecedorRoutes from './src/routes/FornecedorRoutes/FornecedorRoutes';
// import ClienteRoutes from './src/routes/ClienteRoutes/ClienteRoutes';
// import ProdutoRoutes from './src/routes/ProdutoRoutes/ProdutoRoutes';
// import LocalEstoqueRoutes from './src/routes/EstoqueRoutes/LocalEstoqueRoutes';
// import EstoqueRoutes from './src/routes/EstoqueRoutes/EstoqueRoutes';
// import VendaRoutes from './src/routes/VendaRoutes/VendaRoutes';
// import VendaProdutoRoutes from './src/routes/VendaRoutes/VendaProdutoRoutes';
// import CompraRoutes from './src/routes/CompraRoutes/CompraRoutes';
// import CompraProdutoRoutes from './src/routes/CompraRoutes/CompraProdutoRoutes';
// import MovimentoCaixaRoutes from './src/routes/MovimentoCaixaRoutes/MovimentoCaixaRoutes';
// Configuração inicial
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const PORT = process.env.PORT || 3000;
// Configuração do SQLite
let db;
function setupDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, sqlite_1.open)({
            filename: './database.db',
            driver: sqlite3_1.default.Database
        });
    });
}
// Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Função para criar as tabelas
function createTables(database) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sqlPath = path_1.default.join(__dirname, 'init_db.sql');
            if (!fs_1.default.existsSync(sqlPath)) {
                throw new Error(`Arquivo SQL não encontrado em: ${sqlPath}`);
            }
            const sql = fs_1.default.readFileSync(sqlPath, 'utf-8');
            yield database.exec(sql);
            console.log('✅ Tabelas criadas com sucesso!');
        }
        catch (error) {
            console.error('❌ Erro no processo de criação de tabelas:', error);
            throw error;
        }
    });
}
// Rota de teste
app.get('/', (req, res) => {
    res.send('API com SQLite está rodando 🚀');
});
// Configuração das rotas
// app.use("/usuario", UsuarioRoutes);
// app.use("/fornecedor", FornecedorRoutes);
// app.use("/cliente", ClienteRoutes);
// app.use("/produto", ProdutoRoutes);
// app.use("/localEstoque", LocalEstoqueRoutes);
// app.use("/estoque", EstoqueRoutes);
// app.use("/venda", VendaRoutes);
// app.use("/vendaProduto", VendaProdutoRoutes);
// app.use("/compra", CompraRoutes);
// app.use("/compraProdutos", CompraProdutoRoutes);
// app.use("/movimentoCaixa", MovimentoCaixaRoutes);
// Inicialização do servidor
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            exports.db = db = yield setupDatabase();
            yield createTables(db);
            app.listen(PORT, () => {
                console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
                console.log('📊 Banco de dados SQLite pronto para uso');
                console.log(`⏱️  Iniciado em: ${new Date().toLocaleString()}`);
            });
        }
        catch (error) {
            console.error('❌ Falha ao iniciar o servidor:', error);
            process.exit(1);
        }
    });
}
startServer();
