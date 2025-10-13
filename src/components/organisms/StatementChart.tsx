import { LineChart } from '@mui/x-charts';
import dayjs from 'dayjs';
import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { EMPTY } from '../../utils/constants';
import { NorthEast, SouthEast } from '@mui/icons-material';
import { TotalAmount } from '../molecules/TotalAmount';
import { MonthSelect } from '../molecules/MonthSelect';
import { SummarizedStatements } from '../../utils/sumarize-statements';

const HEIGHT = 300;

export function StatementChart({
  summarizedStatements,
  selectedMonth,
  setSelectedMonth,
  loading,
}: StatementChartProps) {
  const { chartData, totalCredit, totalDebit } = summarizedStatements || {};
  const theme = useTheme();

  return (
    <Paper sx={{ padding: 3 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">Resumo de movimentações</Typography>
        <MonthSelect
          onChange={setSelectedMonth}
          value={selectedMonth}
          disabled={loading}
        />
      </Box>
      <Box display="flex" gap={2}>
        <TotalAmount
          icon={<NorthEast color="info" />}
          value={totalCredit ?? 0}
          loading={loading}
        />
        <TotalAmount
          icon={<SouthEast color="error" />}
          value={totalDebit ?? 0}
          loading={loading}
        />
      </Box>

      {loading ? (
        <Box
          height={HEIGHT}
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Box>
      ) : (
        <LineChart
          margin={{ left: 35, right: 35 }}
          xAxis={[
            {
              dataKey: 'day',
              valueFormatter: (value: number) =>
                dayjs(selectedMonth).date(value).format('D [de] MMM'),
              tickLabelInterval: (value) => (value - 1) % 9 === 0,
              disableTicks: true,
              disableLine: true,
            },
          ]}
          yAxis={[
            {
              disableTicks: true,
              disableLine: true,
              valueFormatter: () => '',
              width: 0,
            },
          ]}
          series={[
            {
              dataKey: 'amount',
              showMark: false,
              color: theme.palette.error.light,
            },
          ]}
          height={HEIGHT}
          dataset={chartData || EMPTY.array}
        />
      )}
    </Paper>
  );
}

type StatementChartProps = {
  summarizedStatements: SummarizedStatements | undefined;
  loading: boolean;
  setSelectedMonth: (date: Date) => void;
  selectedMonth: Date;
};
