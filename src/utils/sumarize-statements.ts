import dayjs from 'dayjs';
import { times } from 'lodash';
import { StatementTransactionType, StatementType } from '../types/statement';

// Em um caso real sugeriria um endpoint novo que retornasse os dados já sumarizados
export const sumarizeStatements = (
  monthDate: Date,
  statements: StatementType[],
): SummarizedStatements => {
  const initialIndexedDebits = initializeIndexedDebits(monthDate);

  const { indexedDebits, totalCredit, totalDebit } = statements.reduce(
    (acc, statement) => {
      const amount = +statement.amount;
      const transactionType = statement.transaction_type;

      if (transactionType === StatementTransactionType.Credit) {
        acc.totalCredit += amount;
      } else if (transactionType === StatementTransactionType.Debit) {
        const indexedDebitKey = getIndexedDebitsKey(
          dayjs.utc(statement.transaction_date),
        );

        acc.totalDebit += amount;
        acc.indexedDebits[indexedDebitKey] ??= 0; // Na teoria não precisaria, está aqui apenas pra ser tolerante a falhas
        acc.indexedDebits[indexedDebitKey] += amount;
      }

      return acc;
    },
    { indexedDebits: initialIndexedDebits, totalDebit: 0, totalCredit: 0 },
  );

  return {
    totalDebit,
    totalCredit,
    chartData: buildChartData(indexedDebits),
  };
};

const getIndexedDebitsKey = (date: dayjs.ConfigType) =>
  dayjs.utc(date).startOf('day').toISOString();

// Pra garantir que todos dias do mes sejam exibidos mesmo se não tiver dados
const initializeIndexedDebits = (monthDate: Date) => {
  const monthDayjs = dayjs.utc(monthDate);
  const daysInMonth = monthDayjs.daysInMonth();
  const startOfMonth = monthDayjs.startOf('month');
  const indexedDebits: Record<string, number> = {};

  times(daysInMonth, (day) => {
    const key = getIndexedDebitsKey(startOfMonth.add(day, 'days'));
    indexedDebits[key] = 0;
  });

  return indexedDebits;
};

const buildChartData = (indexedDebits: Record<string, number>): ChartData[] =>
  Object.entries(indexedDebits)
    .map(([dateString, amount]) => ({
      date: new Date(dateString),
      amount,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

type ChartData = { date: Date; amount: number };

export type SummarizedStatements = {
  chartData: ChartData[];
  totalDebit: number;
  totalCredit: number;
};
