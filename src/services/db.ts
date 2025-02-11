import { Pool } from "pg";
import dotenv from 'dotenv';
dotenv.config();

interface DataBaseResponse {
    result: string;
    message: string;
    data: Array<object>;
}

// Carrega as variáveis de ambiente
const result = dotenv.config();
if (result.error) {
  throw new Error("Erro ao carregar as variáveis de ambiente: " + result.error);
}

const pool = new Pool({
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  max: 10, // Número máximo de conexões no pool
  idleTimeoutMillis: 30000, // Tempo limite para conexões inativas
});

const query = async (text: string, params?: any[]) => {
    const client = await pool.connect();
    try {
      const res = await client.query(text, params);
      return res.rows;
    } catch (err) {
      console.error("Erro na consulta:", err);
      throw err;
    } finally {
      client.release(); 
    }
  };

export { pool, query };