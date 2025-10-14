import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      // Usando essa cor pois a que esta nos Assets como primaria não aparece no Teste, mas essa esta como primary/main nele
      main: '#2196F3',
    },
    background: {
      default: '#FBFAFC',
    },
    action: {
      selected: '#F0EBF5',
      selectedOpacity: 0.75,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#E4DBEC',
        },
      },
    },
  },
});
