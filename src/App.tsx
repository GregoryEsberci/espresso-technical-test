import { useEffect, useState } from 'react';
import {
  StatementProductType,
  StatementTransactionType,
  StatementType,
} from './types/statement';
import statementService from './services/statement';

const formatDate = (date: Date) => new Date(date).toLocaleDateString('pt-BR');

const TRANSACTION_SING = {
  [StatementTransactionType.Credit]: '+',
  [StatementTransactionType.Debit]: '-',
};

const PRODUCT_LABEL = {
  [StatementProductType.BusinessAccount]: 'Conta empresarial',
  [StatementProductType.ExpenseManagement]: 'Gestão de despesas',
  [StatementProductType.Suppliers]: 'Fornecedores',
};

function App() {
  const [loading, setLoading] = useState(false);
  const [hasFetchError, setHasFetchError] = useState(false);
  const [statements, setStatements] = useState<StatementType[]>([]);

  const fetchStatements = async () => {
    try {
      setStatements([]);
      setLoading(true);
      setHasFetchError(false);

      const { data } = await statementService.list({ page: 1, limit: 30 });
      setStatements(data);
    } catch (error) {
      console.error(error);
      setHasFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatements();
  }, []);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  if (hasFetchError) {
    return <h1>Falha ao carregar os dados</h1>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            <th>Valor R$</th>
            <th>Responsável</th>
            <th>Produto</th>
          </tr>
        </thead>
        <tbody>
          {statements.map((statement) => {
            const transactionSing =
              TRANSACTION_SING[statement.transaction_type];

            return (
              <tr key={statement.id}>
                <td>{formatDate(statement.transaction_date)}</td>
                <td>{statement.description}</td>
                <td>
                  {transactionSing} R$ {statement.amount}
                </td>
                <td>{statement.username}</td>
                <td>{PRODUCT_LABEL[statement.product_type]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
