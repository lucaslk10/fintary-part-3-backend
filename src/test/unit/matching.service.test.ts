import { Order, Transaction } from '@/interfaces/matching.interface';
import { MatchingService } from '@/services/matching.service';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('TEST Authorization API', () => {
  const matchingService = new MatchingService();

  describe('[POST] /signup', () => {
    it('should find only 1 group with only 2 items (order and transaction)', async () => {
      const transactionsData: Transaction[] = [
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
      ];

      const ordersData: Order[] = [
        {
          type: 'order',
          customerName: 'John Doe',
          orderId: '123',
          date: '2021-01-01',
          product: 'Apple',
          price: 100,
        },
      ];

      const matches = await matchingService.findMatchingTransactions(transactionsData, ordersData);
      expect(matches.length).toBe(1);
      expect(matches[0].length).toBe(2);
    });

    it('should find only 1 group with only 2 items - ignore michael order and match just bryan order to their transaction', async () => {
      const transactionsData: Transaction[] = [
        {
          type: 'txn',
          customerName: 'Brian',
          orderId: 'I208-L',
          date: '2023-07-11',
          product: 'ABC Product v1',
          price: 1.23,
          transactionType: 'paymentReceived',
          transactionDate: '2023-07-12',
          transactionAmount: 1.23,
        },
      ];

      const ordersData: Order[] = [
        { type: 'order', customerName: 'Bryan', orderId: '12OB-1', date: '2023-07-11', product: 'Product ABC-1', price: 1.23 },
        { type: 'order', customerName: 'Michael', orderId: 'L2OB-I', date: '2023-07-11', product: 'Product ABC-1', price: 1.23 },
      ];

      const matches = await matchingService.findMatchingTransactions(transactionsData, ordersData);
      expect(matches.length).toBe(1);
      expect(matches[0].length).toBe(2);
      expect(matches[0][0].customerName).toBe('Bryan');
      expect(matches[0][1].customerName).toBe('Brian');
    });
  });

  it('expect to not find any matches', async () => {
    const transactionsData: Transaction[] = [
      {
        type: 'txn',
        customerName: 'John Doe',
        orderId: 'I208-L',
        date: '2023-07-11',
        product: 'ABC Product v1',
        price: 1.23,
        transactionType: 'paymentReceived',
        transactionDate: '2023-07-12',
        transactionAmount: 1.23,
      },
    ];

    const ordersData: Order[] = [
      { type: 'order', customerName: 'Bryan', orderId: '12OB-1', date: '2023-07-11', product: 'Product ABC-1', price: 1.23 },
      { type: 'order', customerName: 'Michael', orderId: 'L2OB-I', date: '2023-07-11', product: 'Product ABC-1', price: 1.23 },
    ];

    const matches = await matchingService.findMatchingTransactions(transactionsData, ordersData);
    expect(matches.length).toBe(0);
  });
});
