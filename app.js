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
const FornecedorRoutes_1 = __importDefault(require("./src/routes/FornecedorRoutes/FornecedorRoutes"));
const ClienteRoutes_1 = __importDefault(require("./src/routes/ClienteRoutes/ClienteRoutes"));
const ProdutoRoutes_1 = __importDefault(require("./src/routes/ProdutoRoutes/ProdutoRoutes"));
const EstoqueRoutes_1 = __importDefault(require("./src/routes/EstoqueRoutes/EstoqueRoutes"));
const VendaRoutes_1 = __importDefault(require("./src/routes/VendaRoutes/VendaRoutes"));
const VendaProdutoRoutes_1 = __importDefault(require("./src/routes/VendaRoutes/VendaProdutoRoutes"));
const CompraRoutes_1 = __importDefault(require("./src/routes/CompraRoutes/CompraRoutes"));
const CompraProdutoRoutes_1 = __importDefault(require("./src/routes/CompraRoutes/CompraProdutoRoutes"));
// Configuração inicial
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const PORT = process.env.PORT || 3000;
// Configuração do SQLite
let db;
function setupDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const database = yield (0, sqlite_1.open)({
            filename: './database.db',
            driver: sqlite3_1.default.Database
        });
        yield database.exec('PRAGMA journal_mode = WAL;');
        return database;
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
            console.log('Tabelas criadas com sucesso!');
        }
        catch (error) {
            console.error('Erro no processo de criação de tabelas:', error);
            throw error;
        }
    });
}
// Rota de teste
app.get('/', (req, res) => {
    res.send('API com SQLite está rodando');
});
// Configuração das rotas
app.use("/fornecedor", FornecedorRoutes_1.default);
app.use("/cliente", ClienteRoutes_1.default);
app.use("/produto", ProdutoRoutes_1.default);
app.use("/estoque", EstoqueRoutes_1.default);
app.use("/venda", VendaRoutes_1.default);
app.use("/vendaProduto", VendaProdutoRoutes_1.default);
app.use("/compra", CompraRoutes_1.default);
app.use("/compraProduto", CompraProdutoRoutes_1.default);
// Inicialização do servidor
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            exports.db = db = yield setupDatabase();
            yield createTables(db);
            app.listen(PORT, () => {
                console.log(`Servidor rodando em http://localhost:${PORT}`);
            });
        }
        catch (error) {
            console.error('Falha ao iniciar o servidor:', error);
            process.exit(1);
        }
    });
}
startServer();
