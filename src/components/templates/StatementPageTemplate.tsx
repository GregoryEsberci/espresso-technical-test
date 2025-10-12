import { Box, ThemeProvider } from '@mui/material';
import { theme } from '../../theme';

export function StatementPageTemplate({
  children,
}: StatementPageTemplateProps) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ margin: 10, marginLeft: 22, marginRight: 22 }}>{children}</Box>
    </ThemeProvider>
  );
}

type StatementPageTemplateProps = {
  children: React.ReactNode;
};
