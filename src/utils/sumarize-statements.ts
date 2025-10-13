import dayjs from 'dayjs';
import { times, chain, sortBy } from 'lodash';
import { StatementTransactionType, StatementType } from '../types/statement';

// Em um caso real sugeriria um endpoint novo que retornasse os dados já sumarizados
export const sumarizeStatements = (
  monthDate: Date,
  statements: StatementType[],
): SummarizedStatements => {
  // Pra garantir que todos dias do mês sejam exibidos mesmo se não tiver dados
  const initialIndexedDebits = times(
    dayjs(monthDate).endOf('month').date(),
  ).reduce<Record<string, number>>((acc, day) => {
    acc[(day + 1).toString()] = 0;

    return acc;
  }, {});

  return chain(statements)
    .reduce(
      (acc, statement) => {
        const amount = +statement.amount;

        if (statement.transaction_type === StatementTransactionType.Credit) {
          acc.totalCredit += amount;
        }

        if (statement.transaction_type === StatementTransactionType.Debit) {
          // Usando apenas o dia já que os dados são apenas de um mes e assim não precisa formatar a data,
          // oque seria mais pesado e poderia se tornar um problema visto a quantidade de registros
          const transactionDay = new Date(statement.transaction_date)
            .getDate()
            .toString();

          acc.totalDebit += amount;
          acc.indexedDebits[transactionDay] ??= 0;
          acc.indexedDebits[transactionDay] += amount;
        }

        return acc;
      },
      { indexedDebits: initialIndexedDebits, totalDebit: 0, totalCredit: 0 },
    )
    .thru(({ indexedDebits, ...rest }) => {
      let chartData = Object.entries(indexedDebits).map(([day, amount]) => ({
        day: +day,
        amount,
      }));

      chartData = sortBy(chartData, 'day');

      return { ...rest, chartData };
    })
    .value();
};

export type SummarizedStatements = {
  chartData: { day: number; amount: number }[];
  totalDebit: number;
  totalCredit: number;
};
