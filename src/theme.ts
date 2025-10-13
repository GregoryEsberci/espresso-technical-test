import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      // Usando essa cor pois a que está nos Assets como primaria não é usada e ela aparece como primary/main no Tete
      main: '#2196F3',
    },
    background: {
      default: '#FBFAFC',
    },
    action: {
      selected: '#F0EBF5',
      selectedOpacity: 1,
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
