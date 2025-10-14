import { LineChart } from '@mui/x-charts';
import dayjs from 'dayjs';
import {
  Box,
  CircularProgress,
  Paper,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { EMPTY } from '../../utils/constants';
import { NorthEast, SouthEast } from '@mui/icons-material';
import { TotalAmount } from '../molecules/TotalAmount';
import { MonthSelect } from '../molecules/MonthSelect';
import { SummarizedStatements } from '../../utils/sumarize-statements';
import { memo } from 'react';

const HEIGHT = 200;

export const StatementChart = memo(function StatementChart(
  props: StatementChartProps,
) {
  const { loading, error, summarizedStatements } = props;
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const tickLabelInterval = (_value: Date, index: number) => {
    let interval = 0;

    if (isMobile) {
      interval = 2;
    } else if (isTablet) {
      interval = 6;
    } else {
      interval = 9;
    }

    return index % interval === 0;
  };

  const renderChartContent = () => {
    if (loading) {
      return (
        <ChartPlaceholder>
          <CircularProgress />
        </ChartPlaceholder>
      );
    }

    if (error) {
      return (
        <ChartPlaceholder>
          <Typography>Falha ao carregar as movimentações</Typography>
        </ChartPlaceholder>
      );
    }

    return (
      <LineChart
        margin={{ left: 5, right: 5 }}
        xAxis={[
          {
            dataKey: 'date',
            valueFormatter: (value: number) =>
              dayjs.utc(value).format('D [de] MMM'),
            tickLabelInterval,
            scaleType: 'utc',
            disableTicks: true,
            disableLine: true,
            tickLabelStyle: {
              fill: theme.palette.text.secondary,
              textAnchor: 'start',
            },
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
        dataset={summarizedStatements?.chartData || EMPTY.array}
        slotProps={{
          noDataOverlay: { message: 'Nenhuma movimentação encontrada' },
        }}
      />
    );
  };

  return (
    <Paper sx={{ p: 2, px: 3, my: 3 }}>
      <ChartHeader {...props} />
      {renderChartContent()}
    </Paper>
  );
});

function ChartHeader({
  loading,
  selectedMonth,
  setSelectedMonth,
  summarizedStatements,
}: StatementChartProps) {
  return (
    <>
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
      <Box display="flex" flexWrap="wrap" columnGap={3}>
        <TotalAmount
          icon={<NorthEast color="primary" />}
          value={summarizedStatements?.totalCredit ?? 0}
          loading={loading}
        />
        <TotalAmount
          icon={<SouthEast color="error" />}
          value={summarizedStatements?.totalDebit ?? 0}
          loading={loading}
        />
      </Box>
    </>
  );
}

const ChartPlaceholder = styled(Box)({
  height: HEIGHT,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

type StatementChartProps = {
  summarizedStatements: SummarizedStatements | undefined;
  error: unknown;
  loading: boolean;
  setSelectedMonth: (date: Date) => void;
  selectedMonth: Date;
};
