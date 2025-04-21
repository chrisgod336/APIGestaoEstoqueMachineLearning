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