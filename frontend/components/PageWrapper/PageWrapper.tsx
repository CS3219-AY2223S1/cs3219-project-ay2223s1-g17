import { Box, Container } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { NAVBAR_HEIGHT_PX } from 'utils/constants';

type Props = {
  children: ReactNode;
  fullWidth?: boolean;
  fixedHeight?: boolean;
};

const PageWrapper: FC<Props> = ({ children, fullWidth, fixedHeight }) => {
  return (
    <Box
      sx={{
        height: `calc(100vh - ${NAVBAR_HEIGHT_PX}px)`,
        backgroundColor: 'inherit',
        position: 'absolute',
        top: `${NAVBAR_HEIGHT_PX}px`,
        left: 0,
        right: 0,
      }}
    >
      <Container
        maxWidth={fullWidth ? false : 'md'}
        sx={{ height: fixedHeight ? 'auto' : '100%' }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default PageWrapper;
