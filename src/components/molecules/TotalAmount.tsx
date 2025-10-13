import { ReactNode, useMemo } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';

export function TotalAmount({ icon, value, loading }: TotalAmountProps) {
  const formattedValue = useMemo(
    () => Intl.NumberFormat('pt-br').format(value),
    [value],
  );

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {icon}
      {loading ? (
        <Skeleton width={120} />
      ) : (
        <Typography color="textSecondary">R${formattedValue}</Typography>
      )}
    </Box>
  );
}

type TotalAmountProps = {
  icon: ReactNode;
  value: number;
  loading: boolean;
};
