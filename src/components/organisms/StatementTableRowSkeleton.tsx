import { Skeleton, TableCell, TableRow } from '@mui/material';
import { memo } from 'react';

export const StatementTableRowSkeleton = memo(
  function StatementTableRowSkeleton() {
    return (
      <TableRow>
        <TableCell>
          <Skeleton width={140} />
        </TableCell>
        <TableCell>
          <Skeleton width={200} />
        </TableCell>
        <TableCell>
          <Skeleton width={70} />
          <Skeleton width={50} />
        </TableCell>
        <TableCell>
          <Skeleton width={150} />
        </TableCell>
        <TableCell>
          <Skeleton width={130} />
        </TableCell>
      </TableRow>
    );
  },
);
