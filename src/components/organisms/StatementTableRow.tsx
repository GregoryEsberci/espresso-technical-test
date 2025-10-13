import { TableRow, TableCell, Typography, Box, useTheme } from '@mui/material';
import { StatementType, StatementTransactionType } from '../../types/statement';
import {
  STATEMENT_TRANSACTION_LABEL,
  STATEMENT_TRANSACTION_COLOR,
  STATEMENT_PRODUCT_LABEL,
  STATEMENT_PRODUCT_ICON,
} from '../../utils/constants';
import { memo, useMemo } from 'react';
import dayjs from 'dayjs';

export const StatementTableRow = memo(function StatementTableRow({
  statement,
}: StatementTableRowProps) {
  const theme = useTheme();
  const ProductIcon = STATEMENT_PRODUCT_ICON[statement.product_type];
  const isDebit = statement.transaction_type === StatementTransactionType.Debit;

  const formattedDate = useMemo(
    () =>
      dayjs.utc(statement.transaction_date).format('DD/MM/YYYY [às] HH:mm:ss'),
    [statement.transaction_date],
  );

  const formattedAmount = useMemo(
    () => Intl.NumberFormat('pt-br').format(+statement.amount),
    [statement.amount],
  );

  return (
    <TableRow>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>{statement.description}</TableCell>
      <TableCell>
        <Typography
          variant="body2"
          color={STATEMENT_TRANSACTION_COLOR[statement.transaction_type]}
        >
          {isDebit && '-'}
          {formattedAmount}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {STATEMENT_TRANSACTION_LABEL[statement.transaction_type]}
        </Typography>
      </TableCell>
      <TableCell>{statement.username}</TableCell>
      <TableCell>
        <Box display="flex" alignItems="center" gap={1}>
          <ProductIcon sx={{ color: theme.palette.text.secondary }} />
          {STATEMENT_PRODUCT_LABEL[statement.product_type]}
        </Box>
      </TableCell>
    </TableRow>
  );
});
type StatementTableRowProps = {
  statement: StatementType;
};
