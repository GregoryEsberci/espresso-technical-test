import {
  StatementTransactionType,
  StatementProductType,
} from '../types/statement';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptIcon from '@mui/icons-material/Receipt';
import StorefrontIcon from '@mui/icons-material/Storefront';

export const STATEMENT_TRANSACTION_LABEL = {
  [StatementTransactionType.Credit]: 'Recebido',
  [StatementTransactionType.Debit]: 'Enviado',
};

export const STATEMENT_TRANSACTION_COLOR = {
  [StatementTransactionType.Credit]: 'primary',
  [StatementTransactionType.Debit]: 'error',
} as const;

export const STATEMENT_PRODUCT_LABEL = {
  [StatementProductType.BusinessAccount]: 'Conta empresarial',
  [StatementProductType.ExpenseManagement]: 'Gestão de despesas',
  [StatementProductType.Suppliers]: 'Fornecedores',
};

export const STATEMENT_PRODUCT_ICON = {
  [StatementProductType.BusinessAccount]: AccountBalanceIcon,
  [StatementProductType.ExpenseManagement]: ReceiptIcon,
  [StatementProductType.Suppliers]: StorefrontIcon,
};

export const ROWS_PER_PAGE_OPTIONS = [7, 10, 15, 20];
