import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  LabelDisplayedRowsArgs,
} from '@mui/material';
import { StatementType } from '../../types/statement';
import { StatementTableRow } from './StatementTableRow';
import { ROWS_PER_PAGE_OPTIONS } from '../../utils/constants';
import { times } from 'lodash';
import { StatementTableRowSkeleton } from './StatementTableRowSkeleton';

const labelDisplayedRows = ({ from, to, count }: LabelDisplayedRowsArgs) =>
  `${from}–${to} de ${count}`;

export function StatementTable({
  statements,
  totalCount,
  page,
  rowsPerPage,
  loading,
  onPageChange,
  onRowsPerPageChange,
}: StatementTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Valor R$</TableCell>
            <TableCell>Responsável</TableCell>
            <TableCell>Produto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading
            ? times(rowsPerPage, (index) => (
                <StatementTableRowSkeleton key={index} />
              ))
            : statements.map((statement) => (
                <StatementTableRow key={statement.id} statement={statement} />
              ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage="Linhas por página"
              labelDisplayedRows={labelDisplayedRows}
              onPageChange={(_event, newPage) => onPageChange(newPage)}
              onRowsPerPageChange={(event) =>
                onRowsPerPageChange(parseInt(event.target.value, 10))
              }
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

type StatementTableProps = {
  statements: StatementType[];
  totalCount: number;
  page: number;
  rowsPerPage: number;
  loading: boolean;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
};
