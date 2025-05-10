import { Request, Response } from "express";
import BI from "../../models/BI/BIModel";

class BIController {
  
  // Buscar próximos 6 meses
  static async getNextSixMonths(req: Request, res: Response) {
    const result: any = await BI.getNextSixMonths();
    return res.status(result.result === "success" ? 200 : 400).json(result);
  }

}

export default BIController;