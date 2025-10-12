import { TableRow, TableCell, Typography } from '@mui/material';
import { StatementType, StatementTransactionType } from '../../types/statement';
import {
  STATEMENT_TRANSACTION_LABEL,
  STATEMENT_TRANSACTION_COLOR,
  STATEMENT_PRODUCT_LABEL,
  STATEMENT_PRODUCT_ICON,
} from '../../utils/constants';
import { useMemo } from 'react';
import dayjs from 'dayjs';

export function StatementTableRow({ statement }: StatementTableRowProps) {
  const ProductIcon = STATEMENT_PRODUCT_ICON[statement.product_type];
  const isDebit = statement.transaction_type === StatementTransactionType.Debit;

  const formattedDate = useMemo(
    () => dayjs(statement.transaction_date).format('DD/MM/YYYY [às] HH:mm:ss'),
    [statement.transaction_date],
  );

  return (
    <TableRow>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>{statement.description}</TableCell>
      <TableCell align="right">
        <Typography
          variant="body2"
          color={STATEMENT_TRANSACTION_COLOR[statement.transaction_type]}
        >
          {isDebit && '-'}
          {statement.amount}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {STATEMENT_TRANSACTION_LABEL[statement.transaction_type]}
        </Typography>
      </TableCell>
      <TableCell>{statement.username}</TableCell>
      <TableCell>
        <ProductIcon /> {STATEMENT_PRODUCT_LABEL[statement.product_type]}
      </TableCell>
    </TableRow>
  );
}

type StatementTableRowProps = {
  statement: StatementType;
};
