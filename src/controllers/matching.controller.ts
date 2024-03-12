import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Order, Transaction } from '@/interfaces/matching.interface';
import { MatchingService } from '@services/matching.service';

export class MatchingController {
  public matchingService = Container.get(MatchingService);

  public findMatch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const transactionsAndOrders: { transactions: Transaction[]; orders: Order[] } = req.body;

      const matchedData: (Order | Transaction)[][] = await this.matchingService.findMatchingTransactions(
        transactionsAndOrders.transactions,
        transactionsAndOrders.orders,
      );

      res.status(200).json({ data: matchedData, message: 'findMatchedData' });
    } catch (error) {
      next(error);
    }
  };
}
