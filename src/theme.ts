import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      // TODO: O select de Linhas por página ficou estranho
      main: '#3D0079',
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
