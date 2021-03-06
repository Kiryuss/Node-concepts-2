import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string,
  type: 'income' | 'outcome';
  value: number,
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (acc: Balance, curr: Transaction) => {
        switch (curr.type) {
          case "income":
            acc.income += curr.value;
            break;

          case "outcome":
            acc.outcome += curr.value;
            break;

          default: 
            break;
        }
        return acc;
     },
     {
      income: 0,
      outcome: 0,
      total: 0,
     }
   );

    const total = income - outcome;
    return { income, outcome, total, };

  }

  public create({ title, type, value }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
