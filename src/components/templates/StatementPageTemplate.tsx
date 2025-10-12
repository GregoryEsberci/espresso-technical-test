import { Box } from '@mui/material';
import { PageHeader } from '../molecules/PageHeader';

export function StatementPageTemplate({
  children,
}: StatementPageTemplateProps) {
  return (
    <Box>
      <PageHeader />
      <Box margin={10} marginLeft={22} marginRight={22}>
        {children}
      </Box>
    </Box>
  );
}

type StatementPageTemplateProps = {
  children: React.ReactNode;
};
