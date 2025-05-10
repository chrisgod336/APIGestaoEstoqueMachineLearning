-- DROPS DAS TABELAS (MANTER COMENTADO)
-- PRAGMA foreign_keys = OFF;

-- DROP TABLE IF EXISTS tb_compra_produto;
-- DROP TABLE IF EXISTS tb_compra;
-- DROP TABLE IF EXISTS tb_venda_produto;
-- DROP TABLE IF EXISTS tb_venda;
-- DROP TABLE IF EXISTS tb_estoque;
-- DROP TABLE IF EXISTS tb_produto;
-- DROP TABLE IF EXISTS tb_fornecedor;
-- DROP TABLE IF EXISTS tb_cliente;
-- DROP TABLE IF EXISTS tb_previsao_venda;
-- DROP TABLE IF EXISTS tb_previsao_compra;
-- DROP TABLE IF EXISTS tb_previsao_estoque;


PRAGMA foreign_keys = ON;

-- Tabela de clientes
CREATE TABLE IF NOT EXISTS tb_cliente(
  id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
  tx_nome TEXT NOT NULL,
  tx_cpf_cnpj TEXT,
  tx_email TEXT,
  tx_telefone TEXT
);

-- Tabela de fornecedores
CREATE TABLE IF NOT EXISTS tb_fornecedor(
  id_fornecedor INTEGER PRIMARY KEY AUTOINCREMENT,
  tx_razao_social TEXT NOT NULL,
  tx_cpf_cnpj TEXT,
  tx_email TEXT,
  tx_telefone TEXT,
  vr_frete REAL NOT NULL DEFAULT 0
);

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS tb_produto(
  id_produto INTEGER PRIMARY KEY AUTOINCREMENT,
  id_fornecedor INTEGER NOT NULL,
  tx_nome TEXT NOT NULL,
  tx_marca TEXT,
  vr_preco_compra REAL NOT NULL DEFAULT 0,
  vr_preco_venda REAL NOT NULL DEFAULT 0,
  CONSTRAINT fk_produto_fornecedor FOREIGN KEY (id_fornecedor) 
    REFERENCES tb_fornecedor(id_fornecedor) ON DELETE RESTRICT
);

-- Tabela de estoque
CREATE TABLE IF NOT EXISTS tb_estoque(
  id_estoque INTEGER PRIMARY KEY AUTOINCREMENT,
  id_produto INTEGER NOT NULL,
  nu_quantidade INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT fk_estoque_produto FOREIGN KEY (id_produto) 
    REFERENCES tb_produto(id_produto) ON DELETE CASCADE
);

-- Tabela de vendas
CREATE TABLE IF NOT EXISTS tb_venda(
  id_venda INTEGER PRIMARY KEY AUTOINCREMENT,
  id_cliente INTEGER NOT NULL,
  status TEXT DEFAULT 'ABERTA',
  dt_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  vr_venda REAL NOT NULL DEFAULT 0,
  CONSTRAINT fk_venda_cliente FOREIGN KEY (id_cliente) 
    REFERENCES tb_cliente(id_cliente) ON DELETE RESTRICT
);

-- Tabela de produtos vendidos
CREATE TABLE IF NOT EXISTS tb_venda_produto(
  id_venda_produto INTEGER PRIMARY KEY AUTOINCREMENT,
  id_venda INTEGER NOT NULL,
  id_produto INTEGER NOT NULL,
  nu_quantidade INTEGER NOT NULL DEFAULT 0,
  vr_total REAL NOT NULL DEFAULT 0,
  id_estoque INTEGER NOT NULL,
  CONSTRAINT fk_venda_produto_estoque FOREIGN KEY (id_estoque)
    REFERENCES tb_estoque(id_estoque) ON DELETE RESTRICT,
  CONSTRAINT fk_venda_produto_venda FOREIGN KEY (id_venda) 
    REFERENCES tb_venda(id_venda) ON DELETE CASCADE,
  CONSTRAINT fk_venda_produto_produto FOREIGN KEY (id_produto) 
    REFERENCES tb_produto(id_produto) ON DELETE RESTRICT
);

-- Tabela de compras
CREATE TABLE IF NOT EXISTS tb_compra(
  id_compra INTEGER PRIMARY KEY AUTOINCREMENT,
  id_fornecedor INTEGER NOT NULL,
  dt_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  vr_total_compra REAL NOT NULL DEFAULT 0,
  vr_compra REAL NOT NULL DEFAULT 0,
  vr_frete REAL NOT NULL DEFAULT 0,
  tx_status TEXT DEFAULT 'ABERTA',
  dt_entrega TIMESTAMP,
  CONSTRAINT fk_compra_fornecedor FOREIGN KEY (id_fornecedor) 
    REFERENCES tb_fornecedor(id_fornecedor) ON DELETE RESTRICT
);

-- Tabela de produtos comprados
CREATE TABLE IF NOT EXISTS tb_compra_produto(
  id_compra_produto INTEGER PRIMARY KEY AUTOINCREMENT,
  id_compra INTEGER NOT NULL,
  id_produto INTEGER NOT NULL,
  nu_quantidade INTEGER NOT NULL DEFAULT 0,
  vr_total REAL NOT NULL DEFAULT 0,
  id_estoque INTEGER NOT NULL,
  CONSTRAINT fk_compra_produto_compra FOREIGN KEY (id_compra) 
    REFERENCES tb_compra(id_compra) ON DELETE CASCADE,
  CONSTRAINT fk_compra_produto_estoque FOREIGN KEY (id_estoque)
    REFERENCES tb_estoque(id_estoque) ON DELETE RESTRICT,
  CONSTRAINT fk_compra_produto_produto FOREIGN KEY (id_produto) 
    REFERENCES tb_produto(id_produto)ON DELETE RESTRICT
);

--TABELAS DE PREVISAO

CREATE TABLE IF NOT EXISTS tb_previsao_venda(
	mes INTEGER NOT NULL,
	ano INTEGER NOT NULL,
	id_produto INTEGER NOT NULL,
	nu_quantidade INTEGER NOT NULL,
  vr_total NUMERIC(18,2) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS tb_previsao_compra(
	mes INTEGER NOT NULL,
	ano INTEGER NOT NULL,
	id_produto INTEGER NOT NULL,
	nu_quantidade INTEGER NOT NULL,
  vr_total NUMERIC(18,2) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS tb_previsao_estoque(
	mes INTEGER NOT NULL,
	ano INTEGER NOT NULL,
	id_produto INTEGER NOT NULL,
	nu_quantidade INTEGER NOT NULL,
  vr_total NUMERIC(18,2) DEFAULT 0
);

-- --INSERTS VENDAS

-- -- SCRIPT GERADO AUTOMATICAMENTE PARA VENDAS ATÉ MAIO 2025
-- -- Total: 65 meses (1 venda por mês com todos os 15 produtos)

-- -- Venda 1 - January 2020
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (1, 'FINALIZADA', '2020-01-10 08:52:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 1, 171, (SELECT 171 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 2, 100, (SELECT 100 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 3, 112, (SELECT 112 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 4, 156, (SELECT 156 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 5, 176, (SELECT 176 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 6, 147, (SELECT 147 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 7, 124, (SELECT 124 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 8, 126, (SELECT 126 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 9, 116, (SELECT 116 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 10, 172, (SELECT 172 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 11, 102, (SELECT 102 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 12, 131, (SELECT 131 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 13, 175, (SELECT 175 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 14, 153, (SELECT 153 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 15, 154, (SELECT 154 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 1) WHERE id_venda = 1;

-- -- Venda 2 - February 2020
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (2, 'FINALIZADA', '2020-02-07 09:30:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (2, 1, 182, (SELECT 182 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (2, 2, 106, (SELECT 106 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (2, 3, 113, (SELECT 113 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (2, 4, 138, (SELECT 138 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (2, 5, 196, (SELECT 196 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (2, 6, 100, (SELECT 100 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (2, 7, 170, (SELECT 170 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (2, 8, 184, (SELECT 184 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (2, 9, 112, (SELECT 112 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (2, 10, 128, (SELECT 128 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (2, 11, 185, (SELECT 185 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (2, 12, 119, (SELECT 119 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (2, 13, 130, (SELECT 130 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (2, 14, 145, (SELECT 145 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (2, 15, 184, (SELECT 184 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 2) WHERE id_venda = 2;

-- -- Venda 3 - March 2020
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (3, 'FINALIZADA', '2020-03-22 11:49:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 1, 175, (SELECT 175 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 2, 171, (SELECT 171 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 3, 149, (SELECT 149 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 4, 153, (SELECT 153 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 5, 107, (SELECT 107 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 6, 106, (SELECT 106 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 7, 180, (SELECT 180 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 8, 104, (SELECT 104 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 9, 188, (SELECT 188 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 10, 105, (SELECT 105 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 11, 172, (SELECT 172 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 12, 145, (SELECT 145 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 13, 158, (SELECT 158 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 14, 116, (SELECT 116 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 15, 196, (SELECT 196 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 3) WHERE id_venda = 3;

-- -- Venda 4 - April 2020
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (4, 'FINALIZADA', '2020-04-04 11:19:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (4, 1, 117, (SELECT 117 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (4, 2, 151, (SELECT 151 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (4, 3, 175, (SELECT 175 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (4, 4, 185, (SELECT 185 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (4, 5, 100, (SELECT 100 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (4, 6, 116, (SELECT 116 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (4, 7, 115, (SELECT 115 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (4, 8, 123, (SELECT 123 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (4, 9, 135, (SELECT 135 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (4, 10, 171, (SELECT 171 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (4, 11, 118, (SELECT 118 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (4, 12, 111, (SELECT 111 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (4, 13, 164, (SELECT 164 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (4, 14, 120, (SELECT 120 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (4, 15, 136, (SELECT 136 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 4) WHERE id_venda = 4;

-- -- Venda 5 - May 2020
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (5, 'FINALIZADA', '2020-05-21 09:08:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 1, 191, (SELECT 191 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 2, 185, (SELECT 185 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 3, 182, (SELECT 182 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 4, 174, (SELECT 174 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 5, 148, (SELECT 148 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 6, 193, (SELECT 193 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 7, 120, (SELECT 120 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 8, 132, (SELECT 132 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 9, 117, (SELECT 117 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 10, 156, (SELECT 156 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 11, 185, (SELECT 185 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 12, 137, (SELECT 137 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 13, 132, (SELECT 132 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 14, 193, (SELECT 193 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 15, 155, (SELECT 155 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 5) WHERE id_venda = 5;

-- -- Venda 6 - June 2020
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (1, 'FINALIZADA', '2020-06-27 09:18:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (6, 1, 190, (SELECT 190 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (6, 2, 105, (SELECT 105 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (6, 3, 157, (SELECT 157 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (6, 4, 141, (SELECT 141 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (6, 5, 106, (SELECT 106 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (6, 6, 137, (SELECT 137 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (6, 7, 187, (SELECT 187 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (6, 8, 136, (SELECT 136 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (6, 9, 118, (SELECT 118 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (6, 10, 195, (SELECT 195 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (6, 11, 158, (SELECT 158 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (6, 12, 158, (SELECT 158 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (6, 13, 125, (SELECT 125 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (6, 14, 100, (SELECT 100 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (6, 15, 172, (SELECT 172 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 6) WHERE id_venda = 6;

-- -- Venda 7 - July 2020
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (2, 'FINALIZADA', '2020-07-13 15:10:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 1, 170, (SELECT 170 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 2, 178, (SELECT 178 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 3, 183, (SELECT 183 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 4, 157, (SELECT 157 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 5, 132, (SELECT 132 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 6, 188, (SELECT 188 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 7, 165, (SELECT 165 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 8, 196, (SELECT 196 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 9, 135, (SELECT 135 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 10, 185, (SELECT 185 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 11, 199, (SELECT 199 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 12, 176, (SELECT 176 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 13, 191, (SELECT 191 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 14, 198, (SELECT 198 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 15, 148, (SELECT 148 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 7) WHERE id_venda = 7;

-- -- Venda 8 - August 2020
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (3, 'FINALIZADA', '2020-08-04 08:28:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 1, 199, (SELECT 199 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 2, 101, (SELECT 101 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 3, 105, (SELECT 105 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 4, 101, (SELECT 101 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 5, 176, (SELECT 176 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 6, 148, (SELECT 148 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 7, 162, (SELECT 162 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 8, 132, (SELECT 132 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 9, 195, (SELECT 195 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 10, 118, (SELECT 118 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 11, 143, (SELECT 143 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 12, 197, (SELECT 197 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 13, 153, (SELECT 153 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 14, 134, (SELECT 134 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 15, 132, (SELECT 132 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 8) WHERE id_venda = 8;

-- -- Venda 9 - September 2020
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (4, 'FINALIZADA', '2020-09-24 18:47:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (9, 1, 100, (SELECT 100 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (9, 2, 168, (SELECT 168 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (9, 3, 120, (SELECT 120 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (9, 4, 118, (SELECT 118 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (9, 5, 172, (SELECT 172 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (9, 6, 179, (SELECT 179 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (9, 7, 188, (SELECT 188 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (9, 8, 173, (SELECT 173 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (9, 9, 165, (SELECT 165 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (9, 10, 128, (SELECT 128 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (9, 11, 160, (SELECT 160 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (9, 12, 126, (SELECT 126 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (9, 13, 118, (SELECT 118 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (9, 14, 151, (SELECT 151 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (9, 15, 162, (SELECT 162 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 9) WHERE id_venda = 9;

-- -- Venda 10 - October 2020
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (5, 'FINALIZADA', '2020-10-11 11:44:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (10, 1, 132, (SELECT 132 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (10, 2, 150, (SELECT 150 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (10, 3, 154, (SELECT 154 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (10, 4, 148, (SELECT 148 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (10, 5, 181, (SELECT 181 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (10, 6, 167, (SELECT 167 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (10, 7, 150, (SELECT 150 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (10, 8, 130, (SELECT 130 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (10, 9, 198, (SELECT 198 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (10, 10, 164, (SELECT 164 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (10, 11, 114, (SELECT 114 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (10, 12, 149, (SELECT 149 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (10, 13, 144, (SELECT 144 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (10, 14, 158, (SELECT 158 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (10, 15, 161, (SELECT 161 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 10) WHERE id_venda = 10;

-- -- Venda 11 - November 2020
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (1, 'FINALIZADA', '2020-11-13 12:57:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 1, 122, (SELECT 122 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 2, 143, (SELECT 143 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 3, 177, (SELECT 177 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 4, 199, (SELECT 199 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 5, 148, (SELECT 148 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 6, 174, (SELECT 174 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 7, 112, (SELECT 112 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 8, 150, (SELECT 150 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 9, 105, (SELECT 105 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 10, 156, (SELECT 156 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 11, 116, (SELECT 116 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 12, 199, (SELECT 199 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 13, 148, (SELECT 148 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 14, 182, (SELECT 182 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 15, 144, (SELECT 144 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 11) WHERE id_venda = 11;

-- -- Venda 12 - December 2020
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (2, 'FINALIZADA', '2020-12-19 18:37:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (12, 1, 153, (SELECT 153 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (12, 2, 145, (SELECT 145 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (12, 3, 149, (SELECT 149 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (12, 4, 112, (SELECT 112 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (12, 5, 142, (SELECT 142 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (12, 6, 101, (SELECT 101 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (12, 7, 164, (SELECT 164 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (12, 8, 186, (SELECT 186 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (12, 9, 155, (SELECT 155 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (12, 10, 186, (SELECT 186 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (12, 11, 151, (SELECT 151 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (12, 12, 182, (SELECT 182 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (12, 13, 162, (SELECT 162 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (12, 14, 118, (SELECT 118 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (12, 15, 165, (SELECT 165 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 12) WHERE id_venda = 12;

-- -- Venda 13 - January 2021
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (3, 'FINALIZADA', '2021-01-07 08:00:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (13, 1, 116, (SELECT 116 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (13, 2, 118, (SELECT 118 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (13, 3, 143, (SELECT 143 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (13, 4, 190, (SELECT 190 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (13, 5, 169, (SELECT 169 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (13, 6, 171, (SELECT 171 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (13, 7, 142, (SELECT 142 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (13, 8, 124, (SELECT 124 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (13, 9, 115, (SELECT 115 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (13, 10, 173, (SELECT 173 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (13, 11, 146, (SELECT 146 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (13, 12, 153, (SELECT 153 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (13, 13, 122, (SELECT 122 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (13, 14, 198, (SELECT 198 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (13, 15, 193, (SELECT 193 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 13) WHERE id_venda = 13;

-- -- Venda 14 - February 2021
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (4, 'FINALIZADA', '2021-02-08 10:10:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (14, 1, 129, (SELECT 129 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (14, 2, 114, (SELECT 114 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (14, 3, 139, (SELECT 139 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (14, 4, 123, (SELECT 123 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (14, 5, 116, (SELECT 116 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (14, 6, 160, (SELECT 160 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (14, 7, 171, (SELECT 171 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (14, 8, 140, (SELECT 140 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (14, 9, 134, (SELECT 134 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (14, 10, 129, (SELECT 129 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (14, 11, 126, (SELECT 126 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (14, 12, 157, (SELECT 157 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (14, 13, 188, (SELECT 188 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (14, 14, 174, (SELECT 174 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (14, 15, 198, (SELECT 198 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 14) WHERE id_venda = 14;

-- -- Venda 15 - March 2021
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (5, 'FINALIZADA', '2021-03-26 08:54:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (15, 1, 165, (SELECT 165 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (15, 2, 145, (SELECT 145 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (15, 3, 116, (SELECT 116 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (15, 4, 166, (SELECT 166 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (15, 5, 100, (SELECT 100 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (15, 6, 158, (SELECT 158 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (15, 7, 101, (SELECT 101 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (15, 8, 167, (SELECT 167 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (15, 9, 190, (SELECT 190 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (15, 10, 103, (SELECT 103 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (15, 11, 186, (SELECT 186 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (15, 12, 198, (SELECT 198 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (15, 13, 187, (SELECT 187 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (15, 14, 176, (SELECT 176 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (15, 15, 129, (SELECT 129 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 15) WHERE id_venda = 15;

-- -- Venda 16 - April 2021
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (1, 'FINALIZADA', '2021-04-23 18:31:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 1, 131, (SELECT 131 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 2, 153, (SELECT 153 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 3, 154, (SELECT 154 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 4, 192, (SELECT 192 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 5, 112, (SELECT 112 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 6, 116, (SELECT 116 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 7, 198, (SELECT 198 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 8, 104, (SELECT 104 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 9, 160, (SELECT 160 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 10, 147, (SELECT 147 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 11, 165, (SELECT 165 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 12, 200, (SELECT 200 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 13, 174, (SELECT 174 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 14, 156, (SELECT 156 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 15, 137, (SELECT 137 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 16) WHERE id_venda = 16;

-- -- Venda 17 - May 2021
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (2, 'FINALIZADA', '2021-05-23 10:46:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (17, 1, 132, (SELECT 132 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (17, 2, 117, (SELECT 117 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (17, 3, 109, (SELECT 109 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (17, 4, 119, (SELECT 119 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (17, 5, 191, (SELECT 191 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (17, 6, 168, (SELECT 168 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (17, 7, 101, (SELECT 101 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (17, 8, 160, (SELECT 160 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (17, 9, 112, (SELECT 112 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (17, 10, 132, (SELECT 132 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (17, 11, 153, (SELECT 153 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (17, 12, 164, (SELECT 164 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (17, 13, 130, (SELECT 130 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (17, 14, 159, (SELECT 159 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (17, 15, 161, (SELECT 161 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 17) WHERE id_venda = 17;

-- -- Venda 18 - June 2021
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (3, 'FINALIZADA', '2021-06-03 11:55:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (18, 1, 103, (SELECT 103 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (18, 2, 127, (SELECT 127 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (18, 3, 196, (SELECT 196 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (18, 4, 143, (SELECT 143 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (18, 5, 129, (SELECT 129 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (18, 6, 199, (SELECT 199 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (18, 7, 133, (SELECT 133 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (18, 8, 188, (SELECT 188 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (18, 9, 189, (SELECT 189 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (18, 10, 144, (SELECT 144 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (18, 11, 189, (SELECT 189 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (18, 12, 139, (SELECT 139 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (18, 13, 117, (SELECT 117 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (18, 14, 181, (SELECT 181 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (18, 15, 125, (SELECT 125 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 18) WHERE id_venda = 18;

-- -- Venda 19 - July 2021
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (4, 'FINALIZADA', '2021-07-24 13:41:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (19, 1, 157, (SELECT 157 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (19, 2, 150, (SELECT 150 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (19, 3, 130, (SELECT 130 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (19, 4, 161, (SELECT 161 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (19, 5, 118, (SELECT 118 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (19, 6, 125, (SELECT 125 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (19, 7, 131, (SELECT 131 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (19, 8, 171, (SELECT 171 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (19, 9, 183, (SELECT 183 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (19, 10, 104, (SELECT 104 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (19, 11, 170, (SELECT 170 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (19, 12, 168, (SELECT 168 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (19, 13, 198, (SELECT 198 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (19, 14, 103, (SELECT 103 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (19, 15, 107, (SELECT 107 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 19) WHERE id_venda = 19;

-- -- Venda 20 - August 2021
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (5, 'FINALIZADA', '2021-08-06 12:15:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (20, 1, 144, (SELECT 144 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (20, 2, 131, (SELECT 131 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (20, 3, 153, (SELECT 153 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (20, 4, 138, (SELECT 138 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (20, 5, 108, (SELECT 108 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (20, 6, 158, (SELECT 158 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (20, 7, 144, (SELECT 144 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (20, 8, 188, (SELECT 188 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (20, 9, 162, (SELECT 162 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (20, 10, 125, (SELECT 125 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (20, 11, 107, (SELECT 107 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (20, 12, 158, (SELECT 158 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (20, 13, 198, (SELECT 198 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (20, 14, 129, (SELECT 129 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (20, 15, 186, (SELECT 186 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 20) WHERE id_venda = 20;

-- -- Venda 21 - September 2021
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (1, 'FINALIZADA', '2021-09-25 15:40:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (21, 1, 108, (SELECT 108 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (21, 2, 181, (SELECT 181 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (21, 3, 159, (SELECT 159 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (21, 4, 154, (SELECT 154 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (21, 5, 168, (SELECT 168 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (21, 6, 120, (SELECT 120 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (21, 7, 153, (SELECT 153 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (21, 8, 112, (SELECT 112 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (21, 9, 100, (SELECT 100 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (21, 10, 107, (SELECT 107 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (21, 11, 172, (SELECT 172 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (21, 12, 121, (SELECT 121 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (21, 13, 181, (SELECT 181 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (21, 14, 183, (SELECT 183 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (21, 15, 172, (SELECT 172 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 21) WHERE id_venda = 21;

-- -- Venda 22 - October 2021
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (2, 'FINALIZADA', '2021-10-11 18:03:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (22, 1, 129, (SELECT 129 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (22, 2, 134, (SELECT 134 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (22, 3, 130, (SELECT 130 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (22, 4, 105, (SELECT 105 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (22, 5, 126, (SELECT 126 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (22, 6, 134, (SELECT 134 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (22, 7, 171, (SELECT 171 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (22, 8, 156, (SELECT 156 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (22, 9, 190, (SELECT 190 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (22, 10, 153, (SELECT 153 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (22, 11, 187, (SELECT 187 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (22, 12, 183, (SELECT 183 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (22, 13, 163, (SELECT 163 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (22, 14, 132, (SELECT 132 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (22, 15, 179, (SELECT 179 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 22) WHERE id_venda = 22;

-- -- Venda 23 - November 2021
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (3, 'FINALIZADA', '2021-11-16 17:59:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (23, 1, 136, (SELECT 136 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (23, 2, 177, (SELECT 177 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (23, 3, 143, (SELECT 143 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (23, 4, 113, (SELECT 113 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (23, 5, 186, (SELECT 186 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (23, 6, 186, (SELECT 186 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (23, 7, 101, (SELECT 101 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (23, 8, 108, (SELECT 108 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (23, 9, 198, (SELECT 198 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (23, 10, 178, (SELECT 178 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (23, 11, 139, (SELECT 139 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (23, 12, 163, (SELECT 163 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (23, 13, 114, (SELECT 114 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (23, 14, 115, (SELECT 115 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (23, 15, 193, (SELECT 193 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 23) WHERE id_venda = 23;

-- -- Venda 24 - December 2021
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (4, 'FINALIZADA', '2021-12-16 11:02:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (24, 1, 188, (SELECT 188 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (24, 2, 112, (SELECT 112 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (24, 3, 171, (SELECT 171 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (24, 4, 152, (SELECT 152 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (24, 5, 148, (SELECT 148 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (24, 6, 145, (SELECT 145 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (24, 7, 127, (SELECT 127 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (24, 8, 126, (SELECT 126 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (24, 9, 199, (SELECT 199 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (24, 10, 167, (SELECT 167 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (24, 11, 169, (SELECT 169 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (24, 12, 117, (SELECT 117 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (24, 13, 187, (SELECT 187 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (24, 14, 127, (SELECT 127 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (24, 15, 170, (SELECT 170 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 24) WHERE id_venda = 24;

-- -- Venda 25 - January 2022
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (5, 'FINALIZADA', '2022-01-01 15:40:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (25, 1, 125, (SELECT 125 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (25, 2, 140, (SELECT 140 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (25, 3, 189, (SELECT 189 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (25, 4, 146, (SELECT 146 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (25, 5, 112, (SELECT 112 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (25, 6, 180, (SELECT 180 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (25, 7, 189, (SELECT 189 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (25, 8, 143, (SELECT 143 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (25, 9, 134, (SELECT 134 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (25, 10, 149, (SELECT 149 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (25, 11, 112, (SELECT 112 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (25, 12, 117, (SELECT 117 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (25, 13, 192, (SELECT 192 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (25, 14, 180, (SELECT 180 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (25, 15, 157, (SELECT 157 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 25) WHERE id_venda = 25;

-- -- Venda 26 - February 2022
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (1, 'FINALIZADA', '2022-02-07 15:11:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (26, 1, 200, (SELECT 200 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (26, 2, 111, (SELECT 111 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (26, 3, 121, (SELECT 121 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (26, 4, 137, (SELECT 137 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (26, 5, 120, (SELECT 120 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (26, 6, 182, (SELECT 182 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (26, 7, 133, (SELECT 133 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (26, 8, 153, (SELECT 153 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (26, 9, 160, (SELECT 160 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (26, 10, 115, (SELECT 115 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (26, 11, 159, (SELECT 159 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (26, 12, 100, (SELECT 100 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (26, 13, 113, (SELECT 113 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (26, 14, 157, (SELECT 157 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (26, 15, 191, (SELECT 191 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 26) WHERE id_venda = 26;

-- -- Venda 27 - March 2022
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (2, 'FINALIZADA', '2022-03-23 15:27:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (27, 1, 185, (SELECT 185 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (27, 2, 168, (SELECT 168 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (27, 3, 163, (SELECT 163 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (27, 4, 170, (SELECT 170 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (27, 5, 147, (SELECT 147 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (27, 6, 134, (SELECT 134 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (27, 7, 100, (SELECT 100 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (27, 8, 115, (SELECT 115 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (27, 9, 181, (SELECT 181 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (27, 10, 196, (SELECT 196 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (27, 11, 178, (SELECT 178 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (27, 12, 138, (SELECT 138 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (27, 13, 133, (SELECT 133 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (27, 14, 114, (SELECT 114 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (27, 15, 184, (SELECT 184 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 27) WHERE id_venda = 27;

-- -- Venda 28 - April 2022
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (3, 'FINALIZADA', '2022-04-11 11:33:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (28, 1, 148, (SELECT 148 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (28, 2, 170, (SELECT 170 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (28, 3, 165, (SELECT 165 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (28, 4, 168, (SELECT 168 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (28, 5, 103, (SELECT 103 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (28, 6, 170, (SELECT 170 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (28, 7, 186, (SELECT 186 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (28, 8, 197, (SELECT 197 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (28, 9, 152, (SELECT 152 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (28, 10, 120, (SELECT 120 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (28, 11, 125, (SELECT 125 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (28, 12, 138, (SELECT 138 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (28, 13, 158, (SELECT 158 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (28, 14, 122, (SELECT 122 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (28, 15, 105, (SELECT 105 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 28) WHERE id_venda = 28;

-- -- Venda 29 - May 2022
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (4, 'FINALIZADA', '2022-05-19 10:39:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 1, 181, (SELECT 181 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 2, 147, (SELECT 147 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 3, 186, (SELECT 186 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 4, 147, (SELECT 147 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 5, 138, (SELECT 138 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 6, 135, (SELECT 135 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 7, 117, (SELECT 117 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 8, 126, (SELECT 126 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 9, 104, (SELECT 104 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 10, 139, (SELECT 139 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 11, 157, (SELECT 157 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 12, 160, (SELECT 160 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 13, 132, (SELECT 132 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 14, 169, (SELECT 169 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 15, 148, (SELECT 148 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 29) WHERE id_venda = 29;

-- -- Venda 30 - June 2022
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (5, 'FINALIZADA', '2022-06-19 12:53:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (30, 1, 178, (SELECT 178 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (30, 2, 105, (SELECT 105 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (30, 3, 196, (SELECT 196 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (30, 4, 111, (SELECT 111 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (30, 5, 194, (SELECT 194 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (30, 6, 195, (SELECT 195 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (30, 7, 169, (SELECT 169 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (30, 8, 121, (SELECT 121 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (30, 9, 186, (SELECT 186 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (30, 10, 146, (SELECT 146 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (30, 11, 187, (SELECT 187 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (30, 12, 128, (SELECT 128 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (30, 13, 100, (SELECT 100 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (30, 14, 199, (SELECT 199 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (30, 15, 200, (SELECT 200 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 30) WHERE id_venda = 30;

-- -- Venda 31 - July 2022
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (1, 'FINALIZADA', '2022-07-14 14:45:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (31, 1, 169, (SELECT 169 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (31, 2, 130, (SELECT 130 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (31, 3, 114, (SELECT 114 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (31, 4, 129, (SELECT 129 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (31, 5, 188, (SELECT 188 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (31, 6, 148, (SELECT 148 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (31, 7, 184, (SELECT 184 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (31, 8, 145, (SELECT 145 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (31, 9, 200, (SELECT 200 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (31, 10, 178, (SELECT 178 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (31, 11, 176, (SELECT 176 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (31, 12, 178, (SELECT 178 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (31, 13, 141, (SELECT 141 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (31, 14, 153, (SELECT 153 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (31, 15, 150, (SELECT 150 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 31) WHERE id_venda = 31;

-- -- Venda 32 - August 2022
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (2, 'FINALIZADA', '2022-08-12 18:08:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (32, 1, 152, (SELECT 152 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (32, 2, 150, (SELECT 150 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (32, 3, 144, (SELECT 144 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (32, 4, 164, (SELECT 164 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (32, 5, 140, (SELECT 140 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (32, 6, 149, (SELECT 149 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (32, 7, 103, (SELECT 103 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (32, 8, 156, (SELECT 156 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (32, 9, 146, (SELECT 146 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (32, 10, 111, (SELECT 111 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (32, 11, 187, (SELECT 187 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (32, 12, 175, (SELECT 175 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (32, 13, 189, (SELECT 189 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (32, 14, 106, (SELECT 106 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (32, 15, 151, (SELECT 151 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 32) WHERE id_venda = 32;

-- -- Venda 33 - September 2022
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (3, 'FINALIZADA', '2022-09-04 15:47:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (33, 1, 109, (SELECT 109 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (33, 2, 115, (SELECT 115 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (33, 3, 137, (SELECT 137 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (33, 4, 185, (SELECT 185 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (33, 5, 186, (SELECT 186 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (33, 6, 196, (SELECT 196 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (33, 7, 128, (SELECT 128 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (33, 8, 117, (SELECT 117 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (33, 9, 161, (SELECT 161 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (33, 10, 153, (SELECT 153 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (33, 11, 183, (SELECT 183 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (33, 12, 125, (SELECT 125 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (33, 13, 186, (SELECT 186 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (33, 14, 124, (SELECT 124 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (33, 15, 181, (SELECT 181 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 33) WHERE id_venda = 33;

-- -- Venda 34 - October 2022
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (4, 'FINALIZADA', '2022-10-25 09:41:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (34, 1, 135, (SELECT 135 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (34, 2, 169, (SELECT 169 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (34, 3, 185, (SELECT 185 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (34, 4, 158, (SELECT 158 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (34, 5, 144, (SELECT 144 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (34, 6, 135, (SELECT 135 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (34, 7, 121, (SELECT 121 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (34, 8, 126, (SELECT 126 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (34, 9, 167, (SELECT 167 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (34, 10, 139, (SELECT 139 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (34, 11, 135, (SELECT 135 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (34, 12, 196, (SELECT 196 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (34, 13, 191, (SELECT 191 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (34, 14, 120, (SELECT 120 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (34, 15, 130, (SELECT 130 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 34) WHERE id_venda = 34;

-- -- Venda 35 - November 2022
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (5, 'FINALIZADA', '2022-11-18 15:38:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 1, 131, (SELECT 131 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 2, 168, (SELECT 168 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 3, 117, (SELECT 117 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 4, 172, (SELECT 172 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 5, 196, (SELECT 196 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 6, 142, (SELECT 142 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 7, 167, (SELECT 167 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 8, 150, (SELECT 150 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 9, 143, (SELECT 143 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 10, 195, (SELECT 195 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 11, 101, (SELECT 101 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 12, 183, (SELECT 183 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 13, 113, (SELECT 113 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 14, 155, (SELECT 155 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 15, 117, (SELECT 117 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 35) WHERE id_venda = 35;

-- -- Venda 36 - December 2022
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (1, 'FINALIZADA', '2022-12-11 17:51:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (36, 1, 134, (SELECT 134 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (36, 2, 158, (SELECT 158 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (36, 3, 186, (SELECT 186 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (36, 4, 154, (SELECT 154 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (36, 5, 166, (SELECT 166 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (36, 6, 104, (SELECT 104 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (36, 7, 133, (SELECT 133 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (36, 8, 185, (SELECT 185 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (36, 9, 149, (SELECT 149 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (36, 10, 185, (SELECT 185 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (36, 11, 182, (SELECT 182 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (36, 12, 116, (SELECT 116 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (36, 13, 141, (SELECT 141 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (36, 14, 119, (SELECT 119 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (36, 15, 102, (SELECT 102 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 36) WHERE id_venda = 36;

-- -- Venda 37 - January 2023
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (2, 'FINALIZADA', '2023-01-21 16:54:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (37, 1, 146, (SELECT 146 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (37, 2, 115, (SELECT 115 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (37, 3, 155, (SELECT 155 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (37, 4, 149, (SELECT 149 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (37, 5, 164, (SELECT 164 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (37, 6, 158, (SELECT 158 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (37, 7, 121, (SELECT 121 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (37, 8, 143, (SELECT 143 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (37, 9, 168, (SELECT 168 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (37, 10, 132, (SELECT 132 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (37, 11, 122, (SELECT 122 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (37, 12, 152, (SELECT 152 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (37, 13, 140, (SELECT 140 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (37, 14, 153, (SELECT 153 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (37, 15, 167, (SELECT 167 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 37) WHERE id_venda = 37;

-- -- Venda 38 - February 2023
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (3, 'FINALIZADA', '2023-02-01 11:15:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (38, 1, 136, (SELECT 136 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (38, 2, 119, (SELECT 119 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (38, 3, 146, (SELECT 146 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (38, 4, 157, (SELECT 157 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (38, 5, 168, (SELECT 168 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (38, 6, 141, (SELECT 141 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (38, 7, 134, (SELECT 134 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (38, 8, 177, (SELECT 177 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (38, 9, 113, (SELECT 113 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (38, 10, 189, (SELECT 189 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (38, 11, 109, (SELECT 109 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (38, 12, 184, (SELECT 184 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (38, 13, 147, (SELECT 147 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (38, 14, 161, (SELECT 161 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (38, 15, 194, (SELECT 194 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 38) WHERE id_venda = 38;

-- -- Venda 39 - March 2023
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (4, 'FINALIZADA', '2023-03-26 16:40:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 1, 138, (SELECT 138 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 2, 109, (SELECT 109 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 3, 101, (SELECT 101 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 4, 124, (SELECT 124 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 5, 139, (SELECT 139 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 6, 162, (SELECT 162 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 7, 114, (SELECT 114 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 8, 178, (SELECT 178 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 9, 108, (SELECT 108 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 10, 164, (SELECT 164 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 11, 137, (SELECT 137 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 12, 148, (SELECT 148 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 13, 104, (SELECT 104 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 14, 182, (SELECT 182 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 15, 183, (SELECT 183 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 39) WHERE id_venda = 39;

-- -- Venda 40 - April 2023
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (5, 'FINALIZADA', '2023-04-05 16:31:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (40, 1, 139, (SELECT 139 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (40, 2, 113, (SELECT 113 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (40, 3, 138, (SELECT 138 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (40, 4, 183, (SELECT 183 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (40, 5, 183, (SELECT 183 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (40, 6, 146, (SELECT 146 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (40, 7, 188, (SELECT 188 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (40, 8, 116, (SELECT 116 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (40, 9, 160, (SELECT 160 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (40, 10, 108, (SELECT 108 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (40, 11, 123, (SELECT 123 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (40, 12, 165, (SELECT 165 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (40, 13, 156, (SELECT 156 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (40, 14, 175, (SELECT 175 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (40, 15, 191, (SELECT 191 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 40) WHERE id_venda = 40;

-- -- Venda 41 - May 2023
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (1, 'FINALIZADA', '2023-05-27 10:36:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (41, 1, 191, (SELECT 191 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (41, 2, 196, (SELECT 196 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (41, 3, 155, (SELECT 155 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (41, 4, 195, (SELECT 195 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (41, 5, 178, (SELECT 178 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (41, 6, 182, (SELECT 182 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (41, 7, 111, (SELECT 111 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (41, 8, 144, (SELECT 144 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (41, 9, 111, (SELECT 111 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (41, 10, 132, (SELECT 132 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (41, 11, 195, (SELECT 195 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (41, 12, 104, (SELECT 104 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (41, 13, 184, (SELECT 184 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (41, 14, 104, (SELECT 104 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (41, 15, 122, (SELECT 122 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 41) WHERE id_venda = 41;

-- -- Venda 42 - June 2023
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (2, 'FINALIZADA', '2023-06-25 11:12:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (42, 1, 150, (SELECT 150 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (42, 2, 127, (SELECT 127 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (42, 3, 175, (SELECT 175 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (42, 4, 120, (SELECT 120 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (42, 5, 132, (SELECT 132 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (42, 6, 124, (SELECT 124 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (42, 7, 144, (SELECT 144 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (42, 8, 101, (SELECT 101 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (42, 9, 135, (SELECT 135 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (42, 10, 122, (SELECT 122 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (42, 11, 141, (SELECT 141 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (42, 12, 129, (SELECT 129 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (42, 13, 187, (SELECT 187 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (42, 14, 100, (SELECT 100 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (42, 15, 196, (SELECT 196 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 42) WHERE id_venda = 42;

-- -- Venda 43 - July 2023
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (3, 'FINALIZADA', '2023-07-28 18:23:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 1, 116, (SELECT 116 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 2, 180, (SELECT 180 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 3, 126, (SELECT 126 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 4, 189, (SELECT 189 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 5, 186, (SELECT 186 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 6, 193, (SELECT 193 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 7, 137, (SELECT 137 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 8, 136, (SELECT 136 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 9, 195, (SELECT 195 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 10, 200, (SELECT 200 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 11, 168, (SELECT 168 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 12, 148, (SELECT 148 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 13, 137, (SELECT 137 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 14, 159, (SELECT 159 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 15, 154, (SELECT 154 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 43) WHERE id_venda = 43;

-- -- Venda 44 - August 2023
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (4, 'FINALIZADA', '2023-08-01 13:22:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (44, 1, 119, (SELECT 119 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (44, 2, 131, (SELECT 131 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (44, 3, 162, (SELECT 162 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (44, 4, 132, (SELECT 132 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (44, 5, 109, (SELECT 109 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (44, 6, 193, (SELECT 193 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (44, 7, 174, (SELECT 174 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (44, 8, 138, (SELECT 138 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (44, 9, 186, (SELECT 186 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (44, 10, 195, (SELECT 195 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (44, 11, 138, (SELECT 138 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (44, 12, 192, (SELECT 192 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (44, 13, 175, (SELECT 175 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (44, 14, 130, (SELECT 130 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (44, 15, 170, (SELECT 170 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 44) WHERE id_venda = 44;

-- -- Venda 45 - September 2023
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (5, 'FINALIZADA', '2023-09-16 14:22:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (45, 1, 127, (SELECT 127 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (45, 2, 147, (SELECT 147 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (45, 3, 104, (SELECT 104 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (45, 4, 188, (SELECT 188 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (45, 5, 100, (SELECT 100 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (45, 6, 115, (SELECT 115 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (45, 7, 185, (SELECT 185 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (45, 8, 138, (SELECT 138 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (45, 9, 126, (SELECT 126 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (45, 10, 101, (SELECT 101 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (45, 11, 139, (SELECT 139 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (45, 12, 115, (SELECT 115 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (45, 13, 179, (SELECT 179 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (45, 14, 134, (SELECT 134 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (45, 15, 112, (SELECT 112 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 45) WHERE id_venda = 45;

-- -- Venda 46 - October 2023
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (1, 'FINALIZADA', '2023-10-01 08:49:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 1, 169, (SELECT 169 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 2, 186, (SELECT 186 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 3, 143, (SELECT 143 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 4, 105, (SELECT 105 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 5, 175, (SELECT 175 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 6, 176, (SELECT 176 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 7, 138, (SELECT 138 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 8, 174, (SELECT 174 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 9, 197, (SELECT 197 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 10, 177, (SELECT 177 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 11, 198, (SELECT 198 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 12, 195, (SELECT 195 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 13, 189, (SELECT 189 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 14, 144, (SELECT 144 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 15, 127, (SELECT 127 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 46) WHERE id_venda = 46;

-- -- Venda 47 - November 2023
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (2, 'FINALIZADA', '2023-11-14 08:55:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (47, 1, 170, (SELECT 170 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (47, 2, 174, (SELECT 174 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (47, 3, 178, (SELECT 178 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (47, 4, 117, (SELECT 117 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (47, 5, 102, (SELECT 102 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (47, 6, 135, (SELECT 135 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (47, 7, 175, (SELECT 175 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (47, 8, 103, (SELECT 103 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (47, 9, 149, (SELECT 149 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (47, 10, 107, (SELECT 107 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (47, 11, 195, (SELECT 195 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (47, 12, 192, (SELECT 192 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (47, 13, 175, (SELECT 175 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (47, 14, 115, (SELECT 115 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (47, 15, 172, (SELECT 172 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 47) WHERE id_venda = 47;

-- -- Venda 48 - December 2023
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (3, 'FINALIZADA', '2023-12-13 08:52:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 1, 152, (SELECT 152 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 2, 200, (SELECT 200 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 3, 168, (SELECT 168 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 4, 118, (SELECT 118 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 5, 173, (SELECT 173 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 6, 195, (SELECT 195 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 7, 111, (SELECT 111 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 8, 113, (SELECT 113 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 9, 133, (SELECT 133 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 10, 167, (SELECT 167 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 11, 160, (SELECT 160 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 12, 198, (SELECT 198 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 13, 192, (SELECT 192 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 14, 178, (SELECT 178 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 15, 173, (SELECT 173 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 48) WHERE id_venda = 48;

-- -- Venda 49 - January 2024
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (4, 'FINALIZADA', '2024-01-16 13:16:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (49, 1, 143, (SELECT 143 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (49, 2, 138, (SELECT 138 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (49, 3, 147, (SELECT 147 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (49, 4, 145, (SELECT 145 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (49, 5, 181, (SELECT 181 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (49, 6, 109, (SELECT 109 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (49, 7, 109, (SELECT 109 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (49, 8, 197, (SELECT 197 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (49, 9, 191, (SELECT 191 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (49, 10, 178, (SELECT 178 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (49, 11, 196, (SELECT 196 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (49, 12, 194, (SELECT 194 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (49, 13, 138, (SELECT 138 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (49, 14, 117, (SELECT 117 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (49, 15, 148, (SELECT 148 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 49) WHERE id_venda = 49;

-- -- Venda 50 - February 2024
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (5, 'FINALIZADA', '2024-02-20 09:17:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (50, 1, 103, (SELECT 103 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (50, 2, 181, (SELECT 181 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (50, 3, 125, (SELECT 125 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (50, 4, 113, (SELECT 113 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (50, 5, 111, (SELECT 111 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (50, 6, 198, (SELECT 198 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (50, 7, 196, (SELECT 196 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (50, 8, 105, (SELECT 105 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (50, 9, 164, (SELECT 164 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (50, 10, 166, (SELECT 166 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (50, 11, 131, (SELECT 131 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (50, 12, 102, (SELECT 102 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (50, 13, 140, (SELECT 140 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (50, 14, 114, (SELECT 114 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (50, 15, 105, (SELECT 105 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 50) WHERE id_venda = 50;

-- -- Venda 51 - March 2024
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (1, 'FINALIZADA', '2024-03-18 15:45:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (51, 1, 139, (SELECT 139 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (51, 2, 107, (SELECT 107 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (51, 3, 154, (SELECT 154 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (51, 4, 197, (SELECT 197 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (51, 5, 182, (SELECT 182 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (51, 6, 145, (SELECT 145 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (51, 7, 142, (SELECT 142 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (51, 8, 134, (SELECT 134 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (51, 9, 135, (SELECT 135 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (51, 10, 143, (SELECT 143 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (51, 11, 139, (SELECT 139 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (51, 12, 167, (SELECT 167 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (51, 13, 150, (SELECT 150 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (51, 14, 120, (SELECT 120 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (51, 15, 180, (SELECT 180 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 51) WHERE id_venda = 51;

-- -- Venda 52 - April 2024
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (2, 'FINALIZADA', '2024-04-07 14:15:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 1, 169, (SELECT 169 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 2, 124, (SELECT 124 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 3, 173, (SELECT 173 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 4, 137, (SELECT 137 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 5, 162, (SELECT 162 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 6, 169, (SELECT 169 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 7, 123, (SELECT 123 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 8, 132, (SELECT 132 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 9, 146, (SELECT 146 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 10, 138, (SELECT 138 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 11, 187, (SELECT 187 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 12, 112, (SELECT 112 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 13, 170, (SELECT 170 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 14, 136, (SELECT 136 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 15, 179, (SELECT 179 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 52) WHERE id_venda = 52;

-- -- Venda 53 - May 2024
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (3, 'FINALIZADA', '2024-05-18 12:12:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (53, 1, 189, (SELECT 189 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (53, 2, 136, (SELECT 136 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (53, 3, 189, (SELECT 189 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (53, 4, 180, (SELECT 180 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (53, 5, 150, (SELECT 150 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (53, 6, 156, (SELECT 156 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (53, 7, 115, (SELECT 115 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (53, 8, 101, (SELECT 101 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (53, 9, 189, (SELECT 189 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (53, 10, 132, (SELECT 132 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (53, 11, 110, (SELECT 110 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (53, 12, 158, (SELECT 158 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (53, 13, 139, (SELECT 139 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (53, 14, 181, (SELECT 181 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (53, 15, 108, (SELECT 108 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 53) WHERE id_venda = 53;

-- -- Venda 54 - June 2024
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (4, 'FINALIZADA', '2024-06-13 12:26:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (54, 1, 180, (SELECT 180 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (54, 2, 168, (SELECT 168 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (54, 3, 150, (SELECT 150 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (54, 4, 107, (SELECT 107 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (54, 5, 106, (SELECT 106 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (54, 6, 116, (SELECT 116 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (54, 7, 161, (SELECT 161 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (54, 8, 171, (SELECT 171 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (54, 9, 100, (SELECT 100 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (54, 10, 149, (SELECT 149 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (54, 11, 103, (SELECT 103 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (54, 12, 141, (SELECT 141 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (54, 13, 141, (SELECT 141 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (54, 14, 109, (SELECT 109 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (54, 15, 128, (SELECT 128 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 54) WHERE id_venda = 54;

-- -- Venda 55 - July 2024
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (5, 'FINALIZADA', '2024-07-03 15:54:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (55, 1, 182, (SELECT 182 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (55, 2, 136, (SELECT 136 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (55, 3, 131, (SELECT 131 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (55, 4, 113, (SELECT 113 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (55, 5, 138, (SELECT 138 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (55, 6, 135, (SELECT 135 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (55, 7, 150, (SELECT 150 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (55, 8, 121, (SELECT 121 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (55, 9, 175, (SELECT 175 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (55, 10, 154, (SELECT 154 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (55, 11, 176, (SELECT 176 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (55, 12, 118, (SELECT 118 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (55, 13, 146, (SELECT 146 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (55, 14, 200, (SELECT 200 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (55, 15, 142, (SELECT 142 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 55) WHERE id_venda = 55;

-- -- Venda 56 - August 2024
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (1, 'FINALIZADA', '2024-08-08 13:01:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 1, 155, (SELECT 155 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 2, 107, (SELECT 107 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 3, 169, (SELECT 169 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 4, 134, (SELECT 134 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 5, 131, (SELECT 131 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 6, 155, (SELECT 155 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 7, 173, (SELECT 173 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 8, 170, (SELECT 170 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 9, 113, (SELECT 113 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 10, 182, (SELECT 182 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 11, 109, (SELECT 109 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 12, 156, (SELECT 156 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 13, 188, (SELECT 188 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 14, 176, (SELECT 176 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 15, 162, (SELECT 162 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 56) WHERE id_venda = 56;

-- -- Venda 57 - September 2024
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (2, 'FINALIZADA', '2024-09-05 12:38:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (57, 1, 141, (SELECT 141 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (57, 2, 117, (SELECT 117 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (57, 3, 163, (SELECT 163 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (57, 4, 191, (SELECT 191 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (57, 5, 180, (SELECT 180 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (57, 6, 178, (SELECT 178 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (57, 7, 119, (SELECT 119 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (57, 8, 127, (SELECT 127 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (57, 9, 195, (SELECT 195 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (57, 10, 174, (SELECT 174 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (57, 11, 124, (SELECT 124 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (57, 12, 108, (SELECT 108 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (57, 13, 193, (SELECT 193 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (57, 14, 131, (SELECT 131 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (57, 15, 180, (SELECT 180 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 57) WHERE id_venda = 57;

-- -- Venda 58 - October 2024
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (3, 'FINALIZADA', '2024-10-16 10:02:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (58, 1, 102, (SELECT 102 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (58, 2, 100, (SELECT 100 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (58, 3, 100, (SELECT 100 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (58, 4, 158, (SELECT 158 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (58, 5, 100, (SELECT 100 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (58, 6, 167, (SELECT 167 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (58, 7, 154, (SELECT 154 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (58, 8, 124, (SELECT 124 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (58, 9, 138, (SELECT 138 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (58, 10, 110, (SELECT 110 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (58, 11, 149, (SELECT 149 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (58, 12, 115, (SELECT 115 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (58, 13, 148, (SELECT 148 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (58, 14, 125, (SELECT 125 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (58, 15, 104, (SELECT 104 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 58) WHERE id_venda = 58;

-- -- Venda 59 - November 2024
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (4, 'FINALIZADA', '2024-11-26 15:29:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 1, 168, (SELECT 168 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 2, 186, (SELECT 186 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 3, 190, (SELECT 190 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 4, 146, (SELECT 146 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 5, 149, (SELECT 149 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 6, 139, (SELECT 139 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 7, 188, (SELECT 188 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 8, 170, (SELECT 170 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 9, 196, (SELECT 196 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 10, 134, (SELECT 134 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 11, 148, (SELECT 148 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 12, 163, (SELECT 163 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 13, 140, (SELECT 140 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 14, 189, (SELECT 189 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 15, 106, (SELECT 106 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 59) WHERE id_venda = 59;

-- -- Venda 60 - December 2024
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (5, 'FINALIZADA', '2024-12-18 17:58:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (60, 1, 171, (SELECT 171 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (60, 2, 125, (SELECT 125 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (60, 3, 187, (SELECT 187 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (60, 4, 115, (SELECT 115 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (60, 5, 106, (SELECT 106 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (60, 6, 141, (SELECT 141 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (60, 7, 144, (SELECT 144 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (60, 8, 154, (SELECT 154 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (60, 9, 165, (SELECT 165 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (60, 10, 185, (SELECT 185 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (60, 11, 182, (SELECT 182 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (60, 12, 123, (SELECT 123 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (60, 13, 176, (SELECT 176 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (60, 14, 193, (SELECT 193 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (60, 15, 188, (SELECT 188 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 60) WHERE id_venda = 60;

-- -- Venda 61 - January 2025
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (1, 'FINALIZADA', '2025-01-03 09:58:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (61, 1, 161, (SELECT 161 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (61, 2, 135, (SELECT 135 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (61, 3, 125, (SELECT 125 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (61, 4, 123, (SELECT 123 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (61, 5, 165, (SELECT 165 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (61, 6, 131, (SELECT 131 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (61, 7, 126, (SELECT 126 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (61, 8, 160, (SELECT 160 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (61, 9, 103, (SELECT 103 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (61, 10, 178, (SELECT 178 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (61, 11, 147, (SELECT 147 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (61, 12, 152, (SELECT 152 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (61, 13, 181, (SELECT 181 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (61, 14, 190, (SELECT 190 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (61, 15, 196, (SELECT 196 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 61) WHERE id_venda = 61;

-- -- Venda 62 - February 2025
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (2, 'FINALIZADA', '2025-02-24 10:13:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (62, 1, 188, (SELECT 188 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (62, 2, 176, (SELECT 176 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (62, 3, 172, (SELECT 172 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (62, 4, 136, (SELECT 136 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (62, 5, 172, (SELECT 172 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (62, 6, 115, (SELECT 115 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (62, 7, 143, (SELECT 143 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (62, 8, 151, (SELECT 151 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (62, 9, 134, (SELECT 134 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (62, 10, 107, (SELECT 107 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (62, 11, 154, (SELECT 154 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (62, 12, 194, (SELECT 194 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (62, 13, 143, (SELECT 143 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (62, 14, 200, (SELECT 200 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (62, 15, 122, (SELECT 122 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 62) WHERE id_venda = 62;

-- -- Venda 63 - March 2025
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (3, 'FINALIZADA', '2025-03-27 10:05:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (63, 1, 197, (SELECT 197 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (63, 2, 197, (SELECT 197 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (63, 3, 109, (SELECT 109 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (63, 4, 171, (SELECT 171 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (63, 5, 136, (SELECT 136 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (63, 6, 178, (SELECT 178 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (63, 7, 169, (SELECT 169 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (63, 8, 173, (SELECT 173 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (63, 9, 157, (SELECT 157 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (63, 10, 110, (SELECT 110 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (63, 11, 117, (SELECT 117 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (63, 12, 137, (SELECT 137 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (63, 13, 151, (SELECT 151 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (63, 14, 159, (SELECT 159 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (63, 15, 190, (SELECT 190 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 63) WHERE id_venda = 63;

-- -- Venda 64 - April 2025
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (4, 'FINALIZADA', '2025-04-07 12:07:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (64, 1, 189, (SELECT 189 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (64, 2, 119, (SELECT 119 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (64, 3, 127, (SELECT 127 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (64, 4, 128, (SELECT 128 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (64, 5, 159, (SELECT 159 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (64, 6, 169, (SELECT 169 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (64, 7, 191, (SELECT 191 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (64, 8, 106, (SELECT 106 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (64, 9, 191, (SELECT 191 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (64, 10, 192, (SELECT 192 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (64, 11, 150, (SELECT 150 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (64, 12, 154, (SELECT 154 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (64, 13, 180, (SELECT 180 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (64, 14, 124, (SELECT 124 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (64, 15, 197, (SELECT 197 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 64) WHERE id_venda = 64;

-- -- Venda 65 - May 2025
-- INSERT INTO tb_venda (id_cliente, status, dt_venda, vr_venda) VALUES (5, 'FINALIZADA', '2025-05-23 17:09:00', 0);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (65, 1, 190, (SELECT 190 * vr_preco_venda FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (65, 2, 102, (SELECT 102 * vr_preco_venda FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (65, 3, 198, (SELECT 198 * vr_preco_venda FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (65, 4, 135, (SELECT 135 * vr_preco_venda FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (65, 5, 126, (SELECT 126 * vr_preco_venda FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (65, 6, 109, (SELECT 109 * vr_preco_venda FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (65, 7, 148, (SELECT 148 * vr_preco_venda FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (65, 8, 162, (SELECT 162 * vr_preco_venda FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (65, 9, 126, (SELECT 126 * vr_preco_venda FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (65, 10, 172, (SELECT 172 * vr_preco_venda FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (65, 11, 139, (SELECT 139 * vr_preco_venda FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (65, 12, 120, (SELECT 120 * vr_preco_venda FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (65, 13, 116, (SELECT 116 * vr_preco_venda FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (65, 14, 191, (SELECT 191 * vr_preco_venda FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_venda_produto (id_venda, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (65, 15, 168, (SELECT 168 * vr_preco_venda FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_venda SET vr_venda = (SELECT SUM(vr_total) FROM tb_venda_produto WHERE id_venda = 65) WHERE id_venda = 65;

-- -- FIM DO SCRIPT - Total de vendas geradas: 65
-- -- Período coberto: Janeiro 2020 a Maio 2025

--INSERTS COMPRAS

-- SCRIPT GERADO AUTOMATICAMENTE PARA COMPRAS ATÉ MAIO 2025
-- Total: 65 meses (1 compra por mês com vários produtos)

-- Compra 1 - January 2020
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (1, '2020-01-27 14:57:00', 0, 0, 100.22, 'FINALIZADA', '2020-02-03 14:57:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 1, 123, (SELECT 123 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 2, 153, (SELECT 153 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 3, 125, (SELECT 125 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 4, 137, (SELECT 137 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 5, 109, (SELECT 109 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 8, 193, (SELECT 193 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 9, 106, (SELECT 106 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 12, 103, (SELECT 103 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (1, 14, 186, (SELECT 186 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 1), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 1) + 100.22 WHERE id_compra = 1;

-- -- Compra 2 - February 2020
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (2, '2020-02-01 13:44:00', 0, 0, 88.12, 'FINALIZADA', '2020-02-04 13:44:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (2, 2, 154, (SELECT 154 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (2, 3, 156, (SELECT 156 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (2, 4, 198, (SELECT 198 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (2, 8, 131, (SELECT 131 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (2, 10, 151, (SELECT 151 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (2, 12, 112, (SELECT 112 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 2), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 2) + 88.12 WHERE id_compra = 2;

-- -- Compra 3 - March 2020
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (3, '2020-03-25 13:39:00', 0, 0, 155.22, 'FINALIZADA', '2020-03-28 13:39:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 1, 101, (SELECT 101 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 2, 184, (SELECT 184 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 5, 151, (SELECT 151 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 6, 185, (SELECT 185 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 9, 119, (SELECT 119 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 11, 124, (SELECT 124 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 12, 115, (SELECT 115 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 13, 131, (SELECT 131 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (3, 15, 171, (SELECT 171 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 3), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 3) + 155.22 WHERE id_compra = 3;

-- -- Compra 4 - April 2020
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (4, '2020-04-22 16:42:00', 0, 0, 165.65, 'FINALIZADA', '2020-04-29 16:42:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (4, 1, 122, (SELECT 122 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (4, 4, 157, (SELECT 157 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (4, 7, 120, (SELECT 120 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (4, 9, 182, (SELECT 182 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (4, 10, 144, (SELECT 144 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (4, 11, 156, (SELECT 156 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (4, 15, 191, (SELECT 191 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 4), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 4) + 165.65 WHERE id_compra = 4;

-- -- Compra 5 - May 2020
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (5, '2020-05-13 10:14:00', 0, 0, 121.04, 'FINALIZADA', '2020-05-22 10:14:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 2, 134, (SELECT 134 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 4, 118, (SELECT 118 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 5, 122, (SELECT 122 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 6, 197, (SELECT 197 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 10, 166, (SELECT 166 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 11, 151, (SELECT 151 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 12, 179, (SELECT 179 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 13, 190, (SELECT 190 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (5, 14, 199, (SELECT 199 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 5), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 5) + 121.04 WHERE id_compra = 5;

-- -- Compra 6 - June 2020
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (1, '2020-06-11 08:36:00', 0, 0, 192.54, 'FINALIZADA', '2020-06-19 08:36:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (6, 3, 115, (SELECT 115 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (6, 7, 171, (SELECT 171 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (6, 9, 115, (SELECT 115 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (6, 11, 110, (SELECT 110 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (6, 13, 103, (SELECT 103 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 6), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 6) + 192.54 WHERE id_compra = 6;

-- -- Compra 7 - July 2020
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (2, '2020-07-05 11:22:00', 0, 0, 179.97, 'FINALIZADA', '2020-07-12 11:22:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 1, 146, (SELECT 146 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 2, 189, (SELECT 189 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 3, 157, (SELECT 157 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 4, 166, (SELECT 166 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 8, 107, (SELECT 107 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 9, 153, (SELECT 153 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 12, 138, (SELECT 138 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 14, 144, (SELECT 144 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (7, 15, 142, (SELECT 142 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 7), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 7) + 179.97 WHERE id_compra = 7;

-- -- Compra 8 - August 2020
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (3, '2020-08-16 11:44:00', 0, 0, 76.35, 'FINALIZADA', '2020-08-22 11:44:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 1, 169, (SELECT 169 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 2, 134, (SELECT 134 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 3, 154, (SELECT 154 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 4, 177, (SELECT 177 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 5, 148, (SELECT 148 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 10, 136, (SELECT 136 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 12, 139, (SELECT 139 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 14, 176, (SELECT 176 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (8, 15, 123, (SELECT 123 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 8), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 8) + 76.35 WHERE id_compra = 8;

-- -- Compra 9 - September 2020
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (4, '2020-09-13 13:46:00', 0, 0, 186.04, 'FINALIZADA', '2020-09-21 13:46:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (9, 2, 191, (SELECT 191 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (9, 4, 163, (SELECT 163 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (9, 6, 168, (SELECT 168 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (9, 10, 158, (SELECT 158 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (9, 15, 161, (SELECT 161 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 9), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 9) + 186.04 WHERE id_compra = 9;

-- -- Compra 10 - October 2020
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (5, '2020-10-02 12:31:00', 0, 0, 164.32, 'FINALIZADA', '2020-10-07 12:31:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (10, 4, 157, (SELECT 157 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (10, 6, 144, (SELECT 144 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (10, 9, 127, (SELECT 127 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (10, 12, 114, (SELECT 114 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (10, 14, 167, (SELECT 167 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 10), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 10) + 164.32 WHERE id_compra = 10;

-- -- Compra 11 - November 2020
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (1, '2020-11-10 11:07:00', 0, 0, 107.14, 'FINALIZADA', '2020-11-14 11:07:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 1, 161, (SELECT 161 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 5, 170, (SELECT 170 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 6, 117, (SELECT 117 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 7, 116, (SELECT 116 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 8, 103, (SELECT 103 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 10, 187, (SELECT 187 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 11, 195, (SELECT 195 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 12, 175, (SELECT 175 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 13, 190, (SELECT 190 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (11, 15, 134, (SELECT 134 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 11), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 11) + 107.14 WHERE id_compra = 11;

-- -- Compra 12 - December 2020
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (2, '2020-12-24 17:54:00', 0, 0, 93.98, 'FINALIZADA', '2021-01-02 17:54:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (12, 2, 175, (SELECT 175 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (12, 4, 154, (SELECT 154 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (12, 7, 173, (SELECT 173 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (12, 12, 130, (SELECT 130 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (12, 14, 107, (SELECT 107 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (12, 15, 188, (SELECT 188 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 12), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 12) + 93.98 WHERE id_compra = 12;

-- -- Compra 13 - January 2021
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (3, '2021-01-25 09:22:00', 0, 0, 124.21, 'FINALIZADA', '2021-02-01 09:22:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (13, 1, 116, (SELECT 116 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (13, 6, 111, (SELECT 111 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (13, 11, 162, (SELECT 162 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (13, 13, 145, (SELECT 145 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (13, 15, 186, (SELECT 186 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 13), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 13) + 124.21 WHERE id_compra = 13;

-- -- Compra 14 - February 2021
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (4, '2021-02-27 08:01:00', 0, 0, 58.61, 'FINALIZADA', '2021-03-09 08:01:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (14, 1, 165, (SELECT 165 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (14, 3, 111, (SELECT 111 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (14, 4, 120, (SELECT 120 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (14, 5, 116, (SELECT 116 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (14, 6, 139, (SELECT 139 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (14, 10, 164, (SELECT 164 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (14, 13, 182, (SELECT 182 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (14, 15, 161, (SELECT 161 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 14), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 14) + 58.61 WHERE id_compra = 14;

-- -- Compra 15 - March 2021
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (5, '2021-03-03 16:46:00', 0, 0, 194.97, 'FINALIZADA', '2021-03-09 16:46:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (15, 4, 144, (SELECT 144 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (15, 5, 118, (SELECT 118 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (15, 7, 198, (SELECT 198 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (15, 9, 198, (SELECT 198 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (15, 11, 185, (SELECT 185 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (15, 12, 176, (SELECT 176 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (15, 15, 112, (SELECT 112 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 15), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 15) + 194.97 WHERE id_compra = 15;

-- -- Compra 16 - April 2021
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (1, '2021-04-19 10:29:00', 0, 0, 111.91, 'FINALIZADA', '2021-04-29 10:29:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 1, 160, (SELECT 160 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 4, 113, (SELECT 113 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 5, 164, (SELECT 164 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 6, 175, (SELECT 175 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 8, 120, (SELECT 120 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 9, 138, (SELECT 138 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 11, 163, (SELECT 163 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 12, 174, (SELECT 174 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (16, 15, 173, (SELECT 173 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 16), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 16) + 111.91 WHERE id_compra = 16;

-- -- Compra 17 - May 2021
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (2, '2021-05-17 13:50:00', 0, 0, 151.89, 'FINALIZADA', '2021-05-25 13:50:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (17, 3, 186, (SELECT 186 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (17, 8, 172, (SELECT 172 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (17, 11, 121, (SELECT 121 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (17, 12, 108, (SELECT 108 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (17, 13, 192, (SELECT 192 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 17), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 17) + 151.89 WHERE id_compra = 17;

-- -- Compra 18 - June 2021
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (3, '2021-06-22 09:41:00', 0, 0, 133.16, 'FINALIZADA', '2021-07-01 09:41:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (18, 6, 168, (SELECT 168 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (18, 7, 102, (SELECT 102 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (18, 8, 118, (SELECT 118 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (18, 9, 159, (SELECT 159 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (18, 11, 115, (SELECT 115 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (18, 13, 198, (SELECT 198 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (18, 14, 197, (SELECT 197 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 18), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 18) + 133.16 WHERE id_compra = 18;

-- -- Compra 19 - July 2021
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (4, '2021-07-07 15:43:00', 0, 0, 123.01, 'FINALIZADA', '2021-07-11 15:43:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (19, 1, 100, (SELECT 100 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (19, 2, 107, (SELECT 107 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (19, 4, 186, (SELECT 186 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (19, 5, 182, (SELECT 182 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (19, 6, 173, (SELECT 173 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (19, 9, 169, (SELECT 169 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (19, 12, 119, (SELECT 119 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (19, 14, 180, (SELECT 180 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 19), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 19) + 123.01 WHERE id_compra = 19;

-- -- Compra 20 - August 2021
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (5, '2021-08-19 17:25:00', 0, 0, 141.42, 'FINALIZADA', '2021-08-26 17:25:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (20, 1, 121, (SELECT 121 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (20, 4, 134, (SELECT 134 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (20, 5, 108, (SELECT 108 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (20, 7, 144, (SELECT 144 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (20, 8, 103, (SELECT 103 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (20, 10, 138, (SELECT 138 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (20, 12, 150, (SELECT 150 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (20, 15, 171, (SELECT 171 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 20), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 20) + 141.42 WHERE id_compra = 20;

-- -- Compra 21 - September 2021
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (1, '2021-09-25 11:35:00', 0, 0, 174.47, 'FINALIZADA', '2021-10-01 11:35:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (21, 2, 128, (SELECT 128 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (21, 3, 195, (SELECT 195 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (21, 4, 166, (SELECT 166 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (21, 6, 190, (SELECT 190 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (21, 8, 192, (SELECT 192 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (21, 9, 110, (SELECT 110 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (21, 14, 135, (SELECT 135 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (21, 15, 179, (SELECT 179 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 21), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 21) + 174.47 WHERE id_compra = 21;

-- -- Compra 22 - October 2021
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (2, '2021-10-02 14:07:00', 0, 0, 107.96, 'FINALIZADA', '2021-10-10 14:07:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (22, 3, 175, (SELECT 175 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (22, 4, 105, (SELECT 105 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (22, 9, 153, (SELECT 153 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (22, 11, 136, (SELECT 136 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (22, 15, 168, (SELECT 168 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 22), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 22) + 107.96 WHERE id_compra = 22;

-- -- Compra 23 - November 2021
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (3, '2021-11-25 09:39:00', 0, 0, 135.32, 'FINALIZADA', '2021-11-28 09:39:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (23, 2, 163, (SELECT 163 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (23, 3, 162, (SELECT 162 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (23, 5, 163, (SELECT 163 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (23, 6, 101, (SELECT 101 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (23, 8, 148, (SELECT 148 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (23, 11, 125, (SELECT 125 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (23, 12, 155, (SELECT 155 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (23, 13, 104, (SELECT 104 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 23), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 23) + 135.32 WHERE id_compra = 23;

-- -- Compra 24 - December 2021
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (4, '2021-12-20 15:35:00', 0, 0, 189.57, 'FINALIZADA', '2021-12-27 15:35:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (24, 2, 131, (SELECT 131 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (24, 6, 129, (SELECT 129 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (24, 9, 172, (SELECT 172 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (24, 12, 141, (SELECT 141 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (24, 13, 170, (SELECT 170 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 24), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 24) + 189.57 WHERE id_compra = 24;

-- -- Compra 25 - January 2022
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (5, '2022-01-18 15:50:00', 0, 0, 69.58, 'FINALIZADA', '2022-01-21 15:50:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (25, 2, 121, (SELECT 121 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (25, 7, 137, (SELECT 137 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (25, 8, 197, (SELECT 197 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (25, 9, 133, (SELECT 133 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (25, 11, 199, (SELECT 199 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (25, 14, 117, (SELECT 117 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (25, 15, 126, (SELECT 126 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 25), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 25) + 69.58 WHERE id_compra = 25;

-- -- Compra 26 - February 2022
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (1, '2022-02-05 10:48:00', 0, 0, 182.97, 'FINALIZADA', '2022-02-09 10:48:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (26, 2, 123, (SELECT 123 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (26, 3, 182, (SELECT 182 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (26, 5, 126, (SELECT 126 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (26, 6, 121, (SELECT 121 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (26, 7, 137, (SELECT 137 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (26, 8, 190, (SELECT 190 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (26, 14, 123, (SELECT 123 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (26, 15, 134, (SELECT 134 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 26), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 26) + 182.97 WHERE id_compra = 26;

-- -- Compra 27 - March 2022
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (2, '2022-03-09 17:59:00', 0, 0, 192.58, 'FINALIZADA', '2022-03-16 17:59:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (27, 2, 157, (SELECT 157 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (27, 4, 195, (SELECT 195 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (27, 5, 184, (SELECT 184 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (27, 10, 187, (SELECT 187 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (27, 11, 190, (SELECT 190 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 27), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 27) + 192.58 WHERE id_compra = 27;

-- -- Compra 28 - April 2022
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (3, '2022-04-28 11:25:00', 0, 0, 75.96, 'FINALIZADA', '2022-05-06 11:25:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (28, 2, 142, (SELECT 142 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (28, 6, 131, (SELECT 131 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (28, 9, 166, (SELECT 166 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (28, 13, 130, (SELECT 130 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (28, 14, 194, (SELECT 194 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (28, 15, 103, (SELECT 103 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 28), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 28) + 75.96 WHERE id_compra = 28;

-- -- Compra 29 - May 2022
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (4, '2022-05-22 16:13:00', 0, 0, 56.06, 'FINALIZADA', '2022-05-25 16:13:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 2, 141, (SELECT 141 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 3, 128, (SELECT 128 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 4, 188, (SELECT 188 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 5, 165, (SELECT 165 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 8, 107, (SELECT 107 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 12, 114, (SELECT 114 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 13, 122, (SELECT 122 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 14, 200, (SELECT 200 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (29, 15, 115, (SELECT 115 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 29), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 29) + 56.06 WHERE id_compra = 29;

-- -- Compra 30 - June 2022
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (5, '2022-06-14 14:25:00', 0, 0, 147.78, 'FINALIZADA', '2022-06-17 14:25:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (30, 1, 154, (SELECT 154 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (30, 2, 198, (SELECT 198 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (30, 4, 157, (SELECT 157 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (30, 5, 149, (SELECT 149 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (30, 10, 148, (SELECT 148 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (30, 15, 120, (SELECT 120 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 30), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 30) + 147.78 WHERE id_compra = 30;

-- -- Compra 31 - July 2022
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (1, '2022-07-12 13:07:00', 0, 0, 74.16, 'FINALIZADA', '2022-07-17 13:07:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (31, 2, 130, (SELECT 130 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (31, 6, 109, (SELECT 109 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (31, 9, 157, (SELECT 157 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (31, 14, 182, (SELECT 182 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (31, 15, 135, (SELECT 135 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 31), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 31) + 74.16 WHERE id_compra = 31;

-- -- Compra 32 - August 2022
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (2, '2022-08-13 17:12:00', 0, 0, 122.62, 'FINALIZADA', '2022-08-23 17:12:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (32, 1, 135, (SELECT 135 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (32, 3, 137, (SELECT 137 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (32, 8, 148, (SELECT 148 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (32, 14, 135, (SELECT 135 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (32, 15, 137, (SELECT 137 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 32), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 32) + 122.62 WHERE id_compra = 32;

-- -- Compra 33 - September 2022
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (3, '2022-09-11 11:00:00', 0, 0, 164.21, 'FINALIZADA', '2022-09-17 11:00:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (33, 2, 115, (SELECT 115 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (33, 4, 172, (SELECT 172 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (33, 7, 151, (SELECT 151 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (33, 8, 153, (SELECT 153 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (33, 10, 124, (SELECT 124 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (33, 12, 101, (SELECT 101 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (33, 14, 178, (SELECT 178 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 33), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 33) + 164.21 WHERE id_compra = 33;

-- -- Compra 34 - October 2022
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (4, '2022-10-10 15:04:00', 0, 0, 127.92, 'FINALIZADA', '2022-10-13 15:04:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (34, 1, 186, (SELECT 186 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (34, 2, 136, (SELECT 136 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (34, 4, 172, (SELECT 172 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (34, 7, 154, (SELECT 154 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (34, 9, 151, (SELECT 151 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (34, 10, 121, (SELECT 121 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (34, 13, 190, (SELECT 190 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (34, 14, 176, (SELECT 176 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 34), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 34) + 127.92 WHERE id_compra = 34;

-- -- Compra 35 - November 2022
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (5, '2022-11-10 15:55:00', 0, 0, 83.73, 'FINALIZADA', '2022-11-17 15:55:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 1, 161, (SELECT 161 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 2, 198, (SELECT 198 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 6, 167, (SELECT 167 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 7, 137, (SELECT 137 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 9, 190, (SELECT 190 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 10, 104, (SELECT 104 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 12, 195, (SELECT 195 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 13, 146, (SELECT 146 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (35, 14, 180, (SELECT 180 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 35), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 35) + 83.73 WHERE id_compra = 35;

-- -- Compra 36 - December 2022
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (1, '2022-12-27 10:14:00', 0, 0, 199.03, 'FINALIZADA', '2023-01-06 10:14:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (36, 7, 182, (SELECT 182 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (36, 8, 164, (SELECT 164 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (36, 11, 114, (SELECT 114 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (36, 12, 186, (SELECT 186 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (36, 13, 176, (SELECT 176 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (36, 14, 129, (SELECT 129 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (36, 15, 131, (SELECT 131 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 36), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 36) + 199.03 WHERE id_compra = 36;

-- -- Compra 37 - January 2023
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (2, '2023-01-13 16:37:00', 0, 0, 95.73, 'FINALIZADA', '2023-01-23 16:37:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (37, 1, 181, (SELECT 181 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (37, 2, 110, (SELECT 110 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (37, 4, 126, (SELECT 126 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (37, 5, 190, (SELECT 190 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (37, 10, 177, (SELECT 177 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (37, 11, 182, (SELECT 182 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (37, 13, 117, (SELECT 117 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (37, 14, 170, (SELECT 170 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 37), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 37) + 95.73 WHERE id_compra = 37;

-- -- Compra 38 - February 2023
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (3, '2023-02-18 18:34:00', 0, 0, 174.94, 'FINALIZADA', '2023-02-21 18:34:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (38, 1, 174, (SELECT 174 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (38, 3, 199, (SELECT 199 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (38, 4, 118, (SELECT 118 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (38, 5, 148, (SELECT 148 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (38, 7, 135, (SELECT 135 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (38, 12, 104, (SELECT 104 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (38, 15, 135, (SELECT 135 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 38), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 38) + 174.94 WHERE id_compra = 38;

-- -- Compra 39 - March 2023
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (4, '2023-03-24 10:42:00', 0, 0, 117.48, 'FINALIZADA', '2023-03-27 10:42:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 2, 123, (SELECT 123 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 3, 158, (SELECT 158 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 4, 105, (SELECT 105 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 7, 103, (SELECT 103 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 8, 119, (SELECT 119 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 9, 187, (SELECT 187 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 11, 124, (SELECT 124 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 13, 186, (SELECT 186 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (39, 14, 152, (SELECT 152 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 39), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 39) + 117.48 WHERE id_compra = 39;

-- -- Compra 40 - April 2023
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (5, '2023-04-23 09:24:00', 0, 0, 51.45, 'FINALIZADA', '2023-05-03 09:24:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (40, 2, 197, (SELECT 197 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (40, 6, 169, (SELECT 169 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (40, 7, 123, (SELECT 123 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (40, 12, 144, (SELECT 144 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (40, 13, 181, (SELECT 181 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 40), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 40) + 51.45 WHERE id_compra = 40;

-- -- Compra 41 - May 2023
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (1, '2023-05-08 13:51:00', 0, 0, 81.38, 'FINALIZADA', '2023-05-18 13:51:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (41, 1, 130, (SELECT 130 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (41, 3, 192, (SELECT 192 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (41, 4, 174, (SELECT 174 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (41, 6, 199, (SELECT 199 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (41, 7, 151, (SELECT 151 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (41, 8, 198, (SELECT 198 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (41, 11, 163, (SELECT 163 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (41, 14, 113, (SELECT 113 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 41), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 41) + 81.38 WHERE id_compra = 41;

-- -- Compra 42 - June 2023
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (2, '2023-06-06 16:16:00', 0, 0, 143.78, 'FINALIZADA', '2023-06-16 16:16:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (42, 5, 101, (SELECT 101 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (42, 6, 118, (SELECT 118 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (42, 10, 110, (SELECT 110 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (42, 14, 191, (SELECT 191 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (42, 15, 200, (SELECT 200 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 42), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 42) + 143.78 WHERE id_compra = 42;

-- -- Compra 43 - July 2023
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (3, '2023-07-26 16:50:00', 0, 0, 118.49, 'FINALIZADA', '2023-08-01 16:50:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 4, 102, (SELECT 102 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 5, 194, (SELECT 194 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 6, 195, (SELECT 195 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 8, 157, (SELECT 157 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 10, 191, (SELECT 191 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 11, 195, (SELECT 195 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 12, 191, (SELECT 191 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 13, 177, (SELECT 177 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (43, 14, 162, (SELECT 162 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 43), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 43) + 118.49 WHERE id_compra = 43;

-- -- Compra 44 - August 2023
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (4, '2023-08-23 16:26:00', 0, 0, 50.87, 'FINALIZADA', '2023-08-27 16:26:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (44, 3, 119, (SELECT 119 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (44, 4, 156, (SELECT 156 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (44, 5, 101, (SELECT 101 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (44, 7, 119, (SELECT 119 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (44, 8, 196, (SELECT 196 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (44, 9, 187, (SELECT 187 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (44, 15, 180, (SELECT 180 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 44), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 44) + 50.87 WHERE id_compra = 44;

-- -- Compra 45 - September 2023
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (5, '2023-09-02 11:11:00', 0, 0, 57.69, 'FINALIZADA', '2023-09-05 11:11:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (45, 2, 111, (SELECT 111 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (45, 4, 142, (SELECT 142 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (45, 5, 160, (SELECT 160 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (45, 6, 142, (SELECT 142 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (45, 9, 139, (SELECT 139 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (45, 13, 185, (SELECT 185 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 45), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 45) + 57.69 WHERE id_compra = 45;

-- -- Compra 46 - October 2023
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (1, '2023-10-07 16:54:00', 0, 0, 86.22, 'FINALIZADA', '2023-10-11 16:54:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 1, 190, (SELECT 190 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 3, 189, (SELECT 189 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 4, 179, (SELECT 179 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 6, 164, (SELECT 164 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 7, 109, (SELECT 109 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 9, 166, (SELECT 166 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 11, 103, (SELECT 103 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 12, 165, (SELECT 165 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 13, 155, (SELECT 155 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (46, 15, 129, (SELECT 129 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 46), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 46) + 86.22 WHERE id_compra = 46;

-- -- Compra 47 - November 2023
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (2, '2023-11-18 08:25:00', 0, 0, 155.53, 'FINALIZADA', '2023-11-28 08:25:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (47, 3, 172, (SELECT 172 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (47, 5, 180, (SELECT 180 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (47, 8, 154, (SELECT 154 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (47, 9, 155, (SELECT 155 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (47, 10, 139, (SELECT 139 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (47, 13, 114, (SELECT 114 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (47, 15, 105, (SELECT 105 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 47), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 47) + 155.53 WHERE id_compra = 47;

-- -- Compra 48 - December 2023
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (3, '2023-12-22 16:53:00', 0, 0, 112.86, 'FINALIZADA', '2023-12-31 16:53:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 1, 164, (SELECT 164 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 2, 166, (SELECT 166 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 3, 196, (SELECT 196 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 4, 126, (SELECT 126 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 5, 118, (SELECT 118 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 6, 101, (SELECT 101 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 7, 154, (SELECT 154 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 9, 114, (SELECT 114 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 10, 160, (SELECT 160 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (48, 11, 132, (SELECT 132 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 48), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 48) + 112.86 WHERE id_compra = 48;

-- -- Compra 49 - January 2024
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (4, '2024-01-24 10:40:00', 0, 0, 155.77, 'FINALIZADA', '2024-01-31 10:40:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (49, 1, 132, (SELECT 132 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (49, 3, 120, (SELECT 120 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (49, 4, 123, (SELECT 123 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (49, 10, 158, (SELECT 158 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (49, 11, 111, (SELECT 111 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (49, 13, 133, (SELECT 133 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (49, 14, 117, (SELECT 117 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (49, 15, 123, (SELECT 123 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 49), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 49) + 155.77 WHERE id_compra = 49;

-- -- Compra 50 - February 2024
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (5, '2024-02-17 15:04:00', 0, 0, 131.12, 'FINALIZADA', '2024-02-21 15:04:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (50, 2, 198, (SELECT 198 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (50, 6, 101, (SELECT 101 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (50, 8, 190, (SELECT 190 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (50, 9, 158, (SELECT 158 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (50, 11, 133, (SELECT 133 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (50, 13, 154, (SELECT 154 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (50, 14, 172, (SELECT 172 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 50), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 50) + 131.12 WHERE id_compra = 50;

-- -- Compra 51 - March 2024
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (1, '2024-03-13 14:40:00', 0, 0, 144.15, 'FINALIZADA', '2024-03-22 14:40:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (51, 1, 109, (SELECT 109 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (51, 5, 171, (SELECT 171 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (51, 10, 146, (SELECT 146 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (51, 13, 176, (SELECT 176 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (51, 14, 168, (SELECT 168 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 51), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 51) + 144.15 WHERE id_compra = 51;

-- -- Compra 52 - April 2024
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (2, '2024-04-25 18:20:00', 0, 0, 128.73, 'FINALIZADA', '2024-05-05 18:20:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 1, 116, (SELECT 116 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 2, 165, (SELECT 165 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 3, 146, (SELECT 146 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 4, 134, (SELECT 134 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 7, 199, (SELECT 199 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 9, 105, (SELECT 105 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 10, 108, (SELECT 108 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 11, 179, (SELECT 179 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 12, 146, (SELECT 146 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (52, 14, 100, (SELECT 100 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 52), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 52) + 128.73 WHERE id_compra = 52;

-- -- Compra 53 - May 2024
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (3, '2024-05-13 13:34:00', 0, 0, 52.00, 'FINALIZADA', '2024-05-22 13:34:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (53, 4, 164, (SELECT 164 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (53, 6, 126, (SELECT 126 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (53, 7, 169, (SELECT 169 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (53, 8, 127, (SELECT 127 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (53, 9, 169, (SELECT 169 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (53, 12, 189, (SELECT 189 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (53, 13, 105, (SELECT 105 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (53, 14, 161, (SELECT 161 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 53), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 53) + 52.00 WHERE id_compra = 53;

-- -- Compra 54 - June 2024
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (4, '2024-06-03 08:02:00', 0, 0, 106.02, 'FINALIZADA', '2024-06-08 08:02:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (54, 2, 154, (SELECT 154 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (54, 5, 143, (SELECT 143 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (54, 8, 126, (SELECT 126 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (54, 9, 146, (SELECT 146 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (54, 11, 124, (SELECT 124 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (54, 13, 196, (SELECT 196 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (54, 14, 153, (SELECT 153 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 54), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 54) + 106.02 WHERE id_compra = 54;

-- -- Compra 55 - July 2024
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (5, '2024-07-14 09:58:00', 0, 0, 111.54, 'FINALIZADA', '2024-07-20 09:58:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (55, 2, 167, (SELECT 167 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (55, 3, 156, (SELECT 156 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (55, 4, 177, (SELECT 177 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (55, 10, 124, (SELECT 124 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (55, 11, 102, (SELECT 102 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (55, 12, 132, (SELECT 132 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (55, 13, 164, (SELECT 164 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (55, 15, 105, (SELECT 105 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 55), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 55) + 111.54 WHERE id_compra = 55;

-- -- Compra 56 - August 2024
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (1, '2024-08-14 18:08:00', 0, 0, 188.99, 'FINALIZADA', '2024-08-17 18:08:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 2, 127, (SELECT 127 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 3, 197, (SELECT 197 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 4, 127, (SELECT 127 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 5, 116, (SELECT 116 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 6, 167, (SELECT 167 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 9, 133, (SELECT 133 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 12, 123, (SELECT 123 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 13, 133, (SELECT 133 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (56, 14, 124, (SELECT 124 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 56), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 56) + 188.99 WHERE id_compra = 56;

-- -- Compra 57 - September 2024
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (2, '2024-09-19 15:12:00', 0, 0, 175.06, 'FINALIZADA', '2024-09-23 15:12:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (57, 1, 146, (SELECT 146 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (57, 2, 178, (SELECT 178 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (57, 3, 167, (SELECT 167 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (57, 4, 196, (SELECT 196 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (57, 9, 121, (SELECT 121 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 57), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 57) + 175.06 WHERE id_compra = 57;

-- -- Compra 58 - October 2024
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (3, '2024-10-25 12:37:00', 0, 0, 139.85, 'FINALIZADA', '2024-11-01 12:37:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (58, 1, 140, (SELECT 140 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (58, 2, 184, (SELECT 184 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (58, 3, 179, (SELECT 179 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (58, 4, 180, (SELECT 180 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (58, 5, 152, (SELECT 152 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (58, 7, 106, (SELECT 106 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (58, 9, 197, (SELECT 197 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (58, 13, 109, (SELECT 109 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 58), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 58) + 139.85 WHERE id_compra = 58;

-- -- Compra 59 - November 2024
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (4, '2024-11-14 14:23:00', 0, 0, 123.25, 'FINALIZADA', '2024-11-21 14:23:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 1, 111, (SELECT 111 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 4, 120, (SELECT 120 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 7, 170, (SELECT 170 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 8, 135, (SELECT 135 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 9, 154, (SELECT 154 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 11, 175, (SELECT 175 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 12, 155, (SELECT 155 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 14, 173, (SELECT 173 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (59, 15, 167, (SELECT 167 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 59), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 59) + 123.25 WHERE id_compra = 59;

-- -- Compra 60 - December 2024
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (5, '2024-12-20 16:27:00', 0, 0, 181.15, 'FINALIZADA', '2024-12-29 16:27:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (60, 2, 164, (SELECT 164 * vr_preco_compra FROM tb_produto WHERE id_produto = 2), 2);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (60, 4, 130, (SELECT 130 * vr_preco_compra FROM tb_produto WHERE id_produto = 4), 4);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (60, 10, 149, (SELECT 149 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (60, 11, 105, (SELECT 105 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (60, 12, 160, (SELECT 160 * vr_preco_compra FROM tb_produto WHERE id_produto = 12), 12);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 60), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 60) + 181.15 WHERE id_compra = 60;

-- -- Compra 61 - January 2025
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (1, '2025-01-22 11:38:00', 0, 0, 83.40, 'FINALIZADA', '2025-01-27 11:38:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (61, 3, 163, (SELECT 163 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (61, 6, 130, (SELECT 130 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (61, 8, 109, (SELECT 109 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (61, 11, 148, (SELECT 148 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (61, 13, 124, (SELECT 124 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (61, 14, 161, (SELECT 161 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 61), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 61) + 83.40 WHERE id_compra = 61;

-- -- Compra 62 - February 2025
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (2, '2025-02-21 15:27:00', 0, 0, 102.27, 'FINALIZADA', '2025-03-01 15:27:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (62, 3, 174, (SELECT 174 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (62, 6, 147, (SELECT 147 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (62, 7, 107, (SELECT 107 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (62, 8, 140, (SELECT 140 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (62, 15, 200, (SELECT 200 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 62), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 62) + 102.27 WHERE id_compra = 62;

-- -- Compra 63 - March 2025
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (3, '2025-03-13 11:22:00', 0, 0, 151.40, 'FINALIZADA', '2025-03-19 11:22:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (63, 1, 200, (SELECT 200 * vr_preco_compra FROM tb_produto WHERE id_produto = 1), 1);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (63, 3, 153, (SELECT 153 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (63, 5, 195, (SELECT 195 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (63, 7, 153, (SELECT 153 * vr_preco_compra FROM tb_produto WHERE id_produto = 7), 7);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (63, 13, 180, (SELECT 180 * vr_preco_compra FROM tb_produto WHERE id_produto = 13), 13);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (63, 15, 137, (SELECT 137 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 63), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 63) + 151.40 WHERE id_compra = 63;

-- -- Compra 64 - April 2025
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (4, '2025-04-23 11:24:00', 0, 0, 124.30, 'FINALIZADA', '2025-05-02 11:24:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (64, 6, 146, (SELECT 146 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (64, 9, 172, (SELECT 172 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (64, 10, 181, (SELECT 181 * vr_preco_compra FROM tb_produto WHERE id_produto = 10), 10);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (64, 11, 153, (SELECT 153 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (64, 14, 169, (SELECT 169 * vr_preco_compra FROM tb_produto WHERE id_produto = 14), 14);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (64, 15, 145, (SELECT 145 * vr_preco_compra FROM tb_produto WHERE id_produto = 15), 15);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 64), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 64) + 124.30 WHERE id_compra = 64;

-- -- Compra 65 - May 2025
-- INSERT INTO tb_compra (id_fornecedor, dt_compra, vr_total_compra, vr_compra, vr_frete, tx_status, dt_entrega) VALUES (5, '2025-05-16 09:53:00', 0, 0, 80.59, 'FINALIZADA', '2025-05-20 09:53:00');
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (65, 3, 139, (SELECT 139 * vr_preco_compra FROM tb_produto WHERE id_produto = 3), 3);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (65, 5, 100, (SELECT 100 * vr_preco_compra FROM tb_produto WHERE id_produto = 5), 5);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (65, 6, 114, (SELECT 114 * vr_preco_compra FROM tb_produto WHERE id_produto = 6), 6);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (65, 8, 123, (SELECT 123 * vr_preco_compra FROM tb_produto WHERE id_produto = 8), 8);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (65, 9, 186, (SELECT 186 * vr_preco_compra FROM tb_produto WHERE id_produto = 9), 9);
-- INSERT INTO tb_compra_produto (id_compra, id_produto, nu_quantidade, vr_total, id_estoque) VALUES (65, 11, 158, (SELECT 158 * vr_preco_compra FROM tb_produto WHERE id_produto = 11), 11);
-- UPDATE tb_compra SET vr_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 65), vr_total_compra = (SELECT SUM(vr_total) FROM tb_compra_produto WHERE id_compra = 65) + 80.59 WHERE id_compra = 65;

-- -- FIM DO SCRIPT - Total de compras geradas: 65
-- -- Período coberto: Janeiro 2020 a Maio 2025
-- -- Fornecedores utilizados: IDs 1, 2, 3, 4, 5