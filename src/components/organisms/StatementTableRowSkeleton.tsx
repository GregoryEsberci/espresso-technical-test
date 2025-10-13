import { Skeleton, TableCell, TableRow } from '@mui/material';
import { memo } from 'react';

export const StatementTableRowSkeleton = memo(
  function StatementTableRowSkeleton() {
    return (
      <TableRow>
        <TableCell>
          <Skeleton width="80%" />
        </TableCell>
        <TableCell>
          <Skeleton width="80%" />
        </TableCell>
        <TableCell>
          <Skeleton width="40%" />
          <Skeleton width="20%" />
        </TableCell>
        <TableCell>
          <Skeleton width="50%" />
        </TableCell>
        <TableCell>
          <Skeleton width="70%" />
        </TableCell>
      </TableRow>
    );
  },
);
