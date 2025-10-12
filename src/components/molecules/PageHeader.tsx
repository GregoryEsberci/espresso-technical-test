import { AppBar, Toolbar } from '@mui/material';
import { Logo } from '../atoms/Logo';

export function PageHeader() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Logo />
      </Toolbar>
    </AppBar>
  );
}
