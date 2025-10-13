import { LineChart } from '@mui/x-charts';
import dayjs from 'dayjs';
import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { EMPTY } from '../../utils/constants';
import { NorthEast, SouthEast } from '@mui/icons-material';
import { TotalAmount } from '../molecules/TotalAmount';
import { MonthSelect } from '../molecules/MonthSelect';
import { SummarizedStatements } from '../../utils/sumarize-statements';
import { memo, useMemo } from 'react';

const HEIGHT = 200;

export const StatementChart = memo(function StatementChart({
  summarizedStatements,
  selectedMonth,
  setSelectedMonth,
  loading,
}: StatementChartProps) {
  const { chartData, totalCredit, totalDebit } = summarizedStatements || {};
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const chartMargins = useMemo(() => {
    if (isMobile) return { left: 0, right: 0 };
    if (isTablet) return { left: 10, right: 10 };
    return { left: 35, right: 35 };
  }, [isMobile, isTablet]);

  return (
    <Paper sx={{ p: 2, px: 3, my: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={{ xs: 1, sm: 0 }}
        marginBottom={{ xs: 1, sm: 0 }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
      >
        <Typography variant="h5">Resumo de movimentações</Typography>
        <MonthSelect
          onChange={setSelectedMonth}
          value={selectedMonth}
          disabled={loading}
        />
      </Box>
      <Box display="flex" gap={3}>
        <TotalAmount
          icon={<NorthEast color="primary" />}
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
          margin={chartMargins}
          xAxis={[
            {
              dataKey: 'date',
              valueFormatter: (value: number) =>
                dayjs.utc(value).format('D [de] MMM'),
              tickLabelInterval: (_value, index) => index % 9 === 0,
              scaleType: 'utc',
              disableTicks: true,
              disableLine: true,
              tickLabelStyle: { fill: theme.palette.text.secondary },
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
});

type StatementChartProps = {
  summarizedStatements: SummarizedStatements | undefined;
  loading: boolean;
  setSelectedMonth: (date: Date) => void;
  selectedMonth: Date;
};
