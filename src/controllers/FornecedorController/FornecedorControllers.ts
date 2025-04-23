import { Request, Response } from "express";
import Fornecedor from "../../models/Fornrcedor/FornecedorModel";

class FornecedorController {
  
  // Criar fornecedor
  static async criar(req: Request, res: Response) {
    const {
      tx_razao_social,
      tx_cpf_cnpj,
      tx_email,
      tx_telefone
    } = req.body;

    const result: any = await Fornecedor.criarFornecedor(
      tx_razao_social,
      tx_cpf_cnpj,
      tx_email,
      tx_telefone
    );

    return res.status(result.result === "success" ? 201 : 400).json(result);
  }

  // Buscar fornecedores (todos ou por ID)
  static async buscar(req: Request, res: Response) {
    const { id_fornecedor } = req.query;
    const result: any = await Fornecedor.buscarFornecedor(id_fornecedor ? Number(id_fornecedor) : undefined);
    
    return res.status(result.result === "success" ? 200 : 400).json(result);
  }

  // Atualizar fornecedor
  static async atualizar(req: Request, res: Response) {
    const { id_fornecedor, tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone } = req.body;

    const fornecedor = new Fornecedor(Number(id_fornecedor));
    const result: any = await fornecedor.atualizarFornecedor(tx_razao_social, tx_cpf_cnpj, tx_email, tx_telefone );
    
    return res.status(result.result === "success" ? 200 : 400).json(result);
  }

  // Deletar fornecedor
  static async deletar(req: Request, res: Response) {
    const { id_fornecedor } = req.query;

    const fornecedor = new Fornecedor(Number(id_fornecedor));
    const result: any = await fornecedor.deletarFornecedor();
    
    return res.status(result.result === "success" ? 200 : 400).json(result);
  }

}

export default FornecedorController;
