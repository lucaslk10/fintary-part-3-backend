import request from 'supertest';
import { App } from '@/app';
import { MatchingRoute } from '@/routes/matching.route';
import { Transaction, Order } from '@/interfaces/matching.interface';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('TEST Matching API', () => {
  const route = new MatchingRoute();
  const app = new App([route]);

  describe('[POST] /matching', () => {
    it('response statusCode 200 /ok', async () => {
      const transactionsData: {
        transactions: Transaction[];
        orders: Order[];
      } = {
        transactions: [
          {
            type: 'txn',
            customerName: 'John Doe',
            orderId: '123',
            date: '2021-01-01',
            product: 'Apple',
            price: 100,
            transactionType: 'sell',
            transactionDate: '2021-01-01',
            transactionAmount: 100,
          },
        ],
        orders: [
          {
            type: 'order',
            customerName: 'John Doe',
            orderId: '123',
            date: '2021-01-01',
            product: 'Apple',
            price: 100,
          },
        ],
      };

      return request(app.getServer()).post(`${route.path}`).send(transactionsData).expect(200);
    });

    it('response statusCode 400 /bad request - Transaction fields validation', async () => {
      const transactionsData: {
        transactions: any[];
        orders: Order[];
      } = {
        transactions: [{}],
        orders: [
          {
            type: 'order',
            customerName: 'John Doe',
            orderId: '123',
            date: '2021-01-01',
            product: 'Apple',
            price: 100,
          },
        ],
      };

      const req = await request(app.getServer()).post(`${route.path}`).send(transactionsData).expect(400);
      expect(req.body.message).toBe(
        'customerName must be a string; type must be a string; orderId must be a string; date must be a string; product must be a string; price must be a number conforming to the specified constraints; transactionType must be a string; transactionDate must be a string; transactionAmount must be a number conforming to the specified constraints',
      );
    });

    it('response statusCode 400 /bad request - Order fields validation', async () => {
      const transactionsData: {
        transactions: Transaction[];
        orders: any[];
      } = {
        transactions: [
          {
            type: 'txn',
            customerName: 'John Doe',
            orderId: '123',
            date: '2021-01-01',
            product: 'Apple',
            price: 100,
            transactionType: 'sell',
            transactionDate: '2021-01-01',
            transactionAmount: 100,
          },
        ],
        orders: [{}],
      };

      const req = await request(app.getServer()).post(`${route.path}`).send(transactionsData).expect(400);
      expect(req.body.message).toBe(
        'customerName must be a string; type must be a string; orderId must be a string; date must be a string; product must be a string; price must be a number conforming to the specified constraints',
      );
    });

    it('response statusCode 400 /bad request - Validate arrays is not empty', async () => {
      const transactionsData: {
        transactions: any[];
        orders: any[];
      } = {
        transactions: [],
        orders: [],
      };

      const req = await request(app.getServer()).post(`${route.path}`).send(transactionsData).expect(400);
      expect(req.body.message).toBe('transactions must contain at least 1 elements; orders must contain at least 1 elements');
    });

    it('response statusCode 400 /bad request - Validate data object has transaction/order props', async () => {
      const transactionsData = {};

      const req = await request(app.getServer()).post(`${route.path}`).send(transactionsData).expect(400);
      expect(req.body.message).toBe(
        'transactions must contain at least 1 elements; transactions must be an array; orders must contain at least 1 elements; orders must be an array',
      );
    });
  });
});
