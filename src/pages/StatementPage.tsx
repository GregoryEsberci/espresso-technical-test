import { useState } from 'react';
import { statementService } from '../services/statement';
import { EMPTY, ROWS_PER_PAGE_OPTIONS } from '../utils/constants';
import { StatementPageTemplate } from '../components/templates/StatementPageTemplate';
import { StatementTable } from '../components/organisms/StatementTable';
import { Typography } from '@mui/material';
import {
  ProductChipValue,
  StatementProductChips,
} from '../components/organisms/StatementProductChips';
import useAsync from '../hooks/useAsync';
import { StatementChart } from '../components/organisms/StatementChart';
import dayjs from 'dayjs';
import { INITIAL_MONTH_SELECT_DATE } from '../components/molecules/MonthSelect';
import { sumarizeStatements } from '../utils/sumarize-statements';

export function StatementPage() {
  const [tablePage, setTablePage] = useState(0);
  const [tablePageLimit, setTablePageLimit] = useState(
    ROWS_PER_PAGE_OPTIONS[0],
  );
  const [productType, setProductType] = useState<ProductChipValue>('all');
  const [selectedChartMonth, setSelectedChartMonth] = useState(
    INITIAL_MONTH_SELECT_DATE,
  );

  const tableState = useAsync(
    async () =>
      statementService.list({
        page: tablePage + 1,
        productType: productType === 'all' ? undefined : productType,
        limit: tablePageLimit,
      }),
    [tablePage, tablePageLimit, productType],
  );

  const chartState = useAsync(async () => {
    const startDate = dayjs
      .utc(selectedChartMonth)
      .startOf('month')
      .format('YYYY-MM-DD');
    const endDate = dayjs
      .utc(selectedChartMonth)
      .endOf('month')
      .format('YYYY-MM-DD');

    const allStatements = await statementService.listAll({
      productType: productType === 'all' ? undefined : productType,
      startDate,
      endDate,
    });

    if (allStatements.length === 0) return;

    return sumarizeStatements(selectedChartMonth, allStatements);
  }, [selectedChartMonth, productType]);

  const handleTablePageChange = (newPage: number) => {
    setTablePage(newPage);
  };

  const handleTableRowsPerPageChange = (newRowsPerPage: number) => {
    setTablePageLimit(newRowsPerPage);
    setTablePage(0);
  };

  return (
    <StatementPageTemplate>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Extrato
      </Typography>
      <StatementProductChips onSelect={setProductType} selected={productType} />
      <StatementChart
        loading={chartState.loading}
        summarizedStatements={chartState.data}
        error={chartState.error}
        selectedMonth={selectedChartMonth}
        setSelectedMonth={setSelectedChartMonth}
      />
      <StatementTable
        statements={tableState.data?.data || EMPTY.array}
        totalCount={tableState.data?.metadata?.count || 0}
        page={tablePage}
        onPageChange={handleTablePageChange}
        rowsPerPage={tablePageLimit}
        onRowsPerPageChange={handleTableRowsPerPageChange}
        loading={tableState.loading}
        error={tableState.error}
      />
    </StatementPageTemplate>
  );
}
