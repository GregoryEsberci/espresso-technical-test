import './setup';
import { ThemeProvider } from '@mui/material';
import { StatementPage } from './pages/StatementPage';
import { theme } from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatementPage />
    </ThemeProvider>
  );
}
