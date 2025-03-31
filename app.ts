import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

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
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do SQLite
let db: Database;

async function setupDatabase(): Promise<Database> {
  return open({
    filename: './database.db',
    driver: sqlite3.Database
  });
}

// Middlewares
app.use(express.json());
app.use(cors());

// Função para criar as tabelas
async function createTables(database: Database): Promise<void> {
  try {
    const sqlPath = path.join(__dirname, 'init_db.sql');
    
    if (!fs.existsSync(sqlPath)) {
      throw new Error(`Arquivo SQL não encontrado em: ${sqlPath}`);
    }

    const sql = fs.readFileSync(sqlPath, 'utf-8');
    await database.exec(sql);
    console.log('✅ Tabelas criadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro no processo de criação de tabelas:', error);
    throw error;
  }
}

// Middleware para injetar o banco de dados nas rotas
declare module 'express' {
  interface Request {
    db: Database;
  }
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
async function startServer() {
  try {
    db = await setupDatabase();
    await createTables(db);
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
      console.log('📊 Banco de dados SQLite pronto para uso');
      console.log(`⏱️  Iniciado em: ${new Date().toLocaleString()}`);
    });
  } catch (error) {
    console.error('❌ Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
}

startServer();

export { app, db };