export interface StatementType {
  id: string;
  description: string;
  amount: string;
  transaction_type: StatementTransactionType;
  transaction_date: Date;
  username: string;
  product_type: StatementProductType;
}

export enum StatementProductType {
  BusinessAccount = 'business_account',
  ExpenseManagement = 'expense_management',
  Suppliers = 'suppliers',
}

export enum StatementTransactionType {
  Credit = 'credit',
  Debit = 'debit',
}
