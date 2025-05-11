import { Request, Response } from "express";
import BI from "../../models/BI/BIModel";

class BIController {
  
  // Buscar próximos 6 meses
  static async getNextSixMonths(req: Request, res: Response) {
    const { limit } = req.query;
    const result: any = await BI.getNextSixMonths(Number(limit)||0);
    return res.status(result.result === "success" ? 200 : 400).json(result);
  }

}

export default BIController;