-- Tabela de usuários
CREATE TABLE IF NOT EXISTS tb_usuario(
  id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
  tx_nome TEXT NOT NULL,
  tx_email TEXT NOT NULL,
  tx_senha TEXT NOT NULL,
  tx_tipo_usuario TEXT DEFAULT 'ADMIN'
);

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
  vr_frete REAL NOT NULL,
  nu_dias_previsao_inicial_entrega INTEGER NOT NULL,
  nu_dias_previsao_final_entrega INTEGER NOT NULL,
  tx_pais TEXT,
  tx_uf TEXT,
  tx_cidade TEXT,
  tx_endereco TEXT
);

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS tb_produto(
  id_produto INTEGER PRIMARY KEY AUTOINCREMENT,
  id_fornecedor INTEGER NOT NULL,
  tx_nome TEXT NOT NULL,
  tx_marca TEXT,
  vr_preco_compra REAL NOT NULL,
  vr_preco_venda REAL NOT NULL,
  CONSTRAINT fk_produto_fornecedor FOREIGN KEY (id_fornecedor) 
    REFERENCES tb_fornecedor(id_fornecedor) ON DELETE CASCADE
);

-- Tabela de locais de estoque
CREATE TABLE IF NOT EXISTS tb_local_estoque(
  id_local_estoque INTEGER PRIMARY KEY AUTOINCREMENT,
  tx_nome TEXT NOT NULL,
  tx_pais TEXT,
  tx_uf TEXT,
  tx_cidade TEXT,
  tx_endereco TEXT
);

-- Tabela de estoque
CREATE TABLE IF NOT EXISTS tb_estoque(
  id_estoque INTEGER PRIMARY KEY AUTOINCREMENT,
  id_local_estoque INTEGER NOT NULL,
  id_produto INTEGER NOT NULL,
  nu_quantidade INTEGER NOT NULL,
  nu_quantidade_minima INTEGER NOT NULL,
  nu_quantidade_maxima INTEGER NOT NULL,
  lo_reposicao_automatica INTEGER, -- SQLite usa 0/1 para booleanos
  CONSTRAINT fk_estoque_local FOREIGN KEY (id_local_estoque) 
    REFERENCES tb_local_estoque(id_local_estoque) ON DELETE CASCADE,
  CONSTRAINT fk_estoque_produto FOREIGN KEY (id_produto) 
    REFERENCES tb_produto(id_produto) ON DELETE CASCADE
);

-- Tabela de vendas
CREATE TABLE IF NOT EXISTS tb_venda(
  id_venda INTEGER PRIMARY KEY AUTOINCREMENT,
  id_cliente INTEGER NOT NULL,
  status TEXT DEFAULT 'ABERTA',
  dt_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  vr_venda REAL NOT NULL,
  CONSTRAINT fk_venda_cliente FOREIGN KEY (id_cliente) 
    REFERENCES tb_cliente(id_cliente) ON DELETE CASCADE
);

-- Tabela de produtos vendidos
CREATE TABLE IF NOT EXISTS tb_venda_produto(
  id_venda_produto INTEGER PRIMARY KEY AUTOINCREMENT,
  id_venda INTEGER NOT NULL,
  id_produto INTEGER NOT NULL,
  nu_quantidade INTEGER NOT NULL,
  vr_total REAL NOT NULL,
  id_local_estoque INTEGER NOT NULL,
  id_estoque INTEGER NOT NULL,
  CONSTRAINT fk_venda_produto_estoque FOREIGN KEY (id_estoque)
    REFERENCES tb_estoque(id_estoque) ON DELETE CASCADE,
  CONSTRAINT fk_venda_produto_local_estoque FOREIGN KEY (id_local_estoque)
    REFERENCES tb_local_estoque(id_local_estoque) ON DELETE CASCADE,
  CONSTRAINT fk_venda_produto_venda FOREIGN KEY (id_venda) 
    REFERENCES tb_venda(id_venda) ON DELETE CASCADE,
  CONSTRAINT fk_venda_produto_produto FOREIGN KEY (id_produto) 
    REFERENCES tb_produto(id_produto) ON DELETE CASCADE
);

-- Tabela de compras
CREATE TABLE IF NOT EXISTS tb_compra(
  id_compra INTEGER PRIMARY KEY AUTOINCREMENT,
  id_fornecedor INTEGER NOT NULL,
  id_local_estoque INTEGER NOT NULL,
  dt_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  vr_total_compra REAL NOT NULL,
  vr_compra REAL NOT NULL,
  vr_frete REAL NOT NULL,
  tx_status TEXT,
  dt_previsao_entrega_inicial TIMESTAMP NOT NULL,
  dt_previsao_entraga_final TIMESTAMP NOT NULL,
  dt_entrega TIMESTAMP,
  CONSTRAINT fk_compra_fornecedor FOREIGN KEY (id_fornecedor) 
    REFERENCES tb_fornecedor(id_fornecedor) ON DELETE CASCADE,
  CONSTRAINT fk_compra_local_estoque FOREIGN KEY (id_local_estoque) 
    REFERENCES tb_local_estoque(id_local_estoque) ON DELETE CASCADE
);

-- Tabela de produtos comprados
CREATE TABLE IF NOT EXISTS tb_compra_produto(
  id_compra_produto INTEGER PRIMARY KEY AUTOINCREMENT,
  id_compra INTEGER NOT NULL,
  id_produto INTEGER NOT NULL,
  nu_quantidade INTEGER NOT NULL,
  vr_total REAL NOT NULL,
  id_estoque INTEGER NOT NULL,
  CONSTRAINT fk_compra_produto_compra FOREIGN KEY (id_compra) 
    REFERENCES tb_compra(id_compra) ON DELETE CASCADE,
  CONSTRAINT fk_compra_produto_estoque FOREIGN KEY (id_estoque)
    REFERENCES tb_estoque(id_estoque) ON DELETE RESTRICT,
  CONSTRAINT fk_compra_produto_produto FOREIGN KEY (id_produto) 
    REFERENCES tb_produto(id_produto) ON DELETE CASCADE
);

-- Tabela de movimentação de caixa
CREATE TABLE IF NOT EXISTS tb_movimento_caixa(
  id_movimento_caixa INTEGER PRIMARY KEY AUTOINCREMENT,
  id_venda INTEGER,
  id_compra INTEGER,
  tx_descricao TEXT,
  vr_movimentado REAL NOT NULL,
  dt_movimento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tx_tipo_movimento TEXT NOT NULL,
  CONSTRAINT fk_movimento_caixa_venda FOREIGN KEY (id_venda) 
    REFERENCES tb_venda(id_venda) ON DELETE CASCADE,
  CONSTRAINT fk_movimento_caixa_compra FOREIGN KEY (id_compra) 
    REFERENCES tb_compra(id_compra) ON DELETE CASCADE
);