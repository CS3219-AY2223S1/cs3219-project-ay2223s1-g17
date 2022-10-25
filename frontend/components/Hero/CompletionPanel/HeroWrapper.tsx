import { Paper, SxProps } from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  containerStyles?: SxProps;
};

const HeroWrapper: FC<Props> = ({ children, containerStyles }) => {
  return (
    <Paper sx={{ p: 2, ...containerStyles }} elevation={2}>
      {children}
    </Paper>
  );
};

export default HeroWrapper;
