import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import UsuarioRoutes from './routes/UsuarioRoutes/UsuarioRoutes';
import FornecedorRoutes from './routes/FornecedorRoutes/FornecedorRoutes';
import ClienteRoutes from './routes/ClienteRoutes/ClienteRoutes';
import ProdutoRoutes from './routes/ProdutoRoutes/ProdutoRoutes';
import LocalEstoqueRoutes from './routes/EstoqueRoutes/LocalEstoqueRoutes';
import EstoqueRoutes from './routes/EstoqueRoutes/EstoqueRoutes';
import VendaRoutes from './routes/VendaRoutes/VendaRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Rota de teste
app.get("/", (req, res) => {
  res.send("API está rodando 🚀");
});

//Rotas
app.use("/usuario", UsuarioRoutes);
app.use("/fornecedor", FornecedorRoutes);
app.use("/cliente", ClienteRoutes);
app.use("/produto", ProdutoRoutes);
app.use("/localEstoque", LocalEstoqueRoutes);
app.use("/estoque", EstoqueRoutes);
app.use("/venda", VendaRoutes);

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
