import { useCallback, useEffect, useState } from 'react';
import { StatementType } from '../types/statement';
import { statementService } from '../services/statement';
import { ApiMetadataType } from '../types/metadata';
import { ROWS_PER_PAGE_OPTIONS } from '../utils/constants';
import { StatementPageTemplate } from '../components/templates/StatementPageTemplate';
import { StatementTable } from '../components/organisms/StatementTable';
import { Typography } from '@mui/material';
import {
  ProductChipValue,
  StatementProductChips,
} from '../components/organisms/StatementProductChips';

export function StatementPage() {
  const [loading, setLoading] = useState(false);
  const [hasFetchError, setHasFetchError] = useState(false);
  const [statements, setStatements] = useState<StatementType[]>([]);
  const [statementsMetadata, setStatementsMetadata] =
    useState<ApiMetadataType>();
  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(ROWS_PER_PAGE_OPTIONS[0]);
  const [productType, setProductType] = useState<ProductChipValue>('all');

  const fetchStatements = useCallback(
    async (isAborted = (): boolean => false) => {
      try {
        setStatements([]);
        setLoading(true);
        setHasFetchError(false);

        const { data, metadata } = await statementService.list({
          page: page + 1,
          productType: productType === 'all' ? undefined : productType,
          limit: pageLimit,
        });

        if (isAborted()) return;

        setStatementsMetadata(metadata);
        setStatements(data);
      } catch (error) {
        console.error(error);

        if (!isAborted()) setHasFetchError(true);
      } finally {
        if (!isAborted()) setLoading(false);
      }
    },
    [page, pageLimit, productType],
  );

  useEffect(() => {
    let aborted = false;
    fetchStatements(() => aborted);

    return () => {
      aborted = true;
    };
  }, [fetchStatements]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setPageLimit(newRowsPerPage);
    setPage(0);
  };

  if (hasFetchError) {
    return <h1>Falha ao carregar os dados</h1>;
  }

  return (
    <StatementPageTemplate>
      <Typography variant="h5">Extrato</Typography>
      <StatementProductChips onSelect={setProductType} selected={productType} />
      <StatementTable
        statements={statements}
        totalCount={statementsMetadata?.count || 0}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={pageLimit}
        onRowsPerPageChange={handleRowsPerPageChange}
        loading={loading}
      />
    </StatementPageTemplate>
  );
}
