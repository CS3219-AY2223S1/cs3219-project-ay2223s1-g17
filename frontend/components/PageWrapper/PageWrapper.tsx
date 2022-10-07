import { Box, Container } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  fullWidth?: boolean;
  fixedHeight?: boolean;
};

const PageWrapper: FC<Props> = ({ children, fullWidth, fixedHeight }) => {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)',
        backgroundColor: 'white',
        position: 'absolute',
        top: '64px',
        left: 0,
        right: 0,
      }}
    >
      <Container
        maxWidth={fullWidth ? false : 'sm'}
        sx={{ height: fixedHeight ? 'auto' : '100%' }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default PageWrapper;
