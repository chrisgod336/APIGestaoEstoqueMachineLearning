import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import UsuarioRoutes from './routes/UsuarioRoutes/UsuarioRoutes';
import FornecedorRoutes from './routes/FornecedorRoutes/FornecedorRoutes';

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

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
