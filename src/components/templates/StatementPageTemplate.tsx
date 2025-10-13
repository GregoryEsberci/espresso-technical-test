import { Box } from '@mui/material';
import { PageHeader } from '../molecules/PageHeader';

export function StatementPageTemplate({
  children,
}: StatementPageTemplateProps) {
  return (
    <Box>
      <PageHeader />
      <Box my={4} mx={{ xs: 2, sm: 4, md: 22 }}>
        {children}
      </Box>
    </Box>
  );
}

type StatementPageTemplateProps = {
  children: React.ReactNode;
};
