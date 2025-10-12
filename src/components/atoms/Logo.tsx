import { Box, BoxProps } from '@mui/material';

export function Logo(props: LogoPropsType) {
  return <Box {...props} component="img" src="/logo.svg" alt="Espresso" />;
}

type LogoPropsType = Omit<BoxProps, 'component' | 'src'>;
