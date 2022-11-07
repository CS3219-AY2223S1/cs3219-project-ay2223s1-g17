import { Box, Container } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { NAVBAR_HEIGHT_PX } from 'utils/constants';

type Props = {
  children: ReactNode;
  fullWidth?: boolean;
  fixedHeight?: boolean;
  whiteBackground?: boolean;
};

const PageWrapper: FC<Props> = ({
  children,
  fullWidth,
  fixedHeight,
  whiteBackground,
}) => {
  return (
    <Box
      sx={{
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT_PX}px)`,
        backgroundColor: whiteBackground ? 'white' : '#f7f8fa',
        position: 'absolute',
        top: `${NAVBAR_HEIGHT_PX}px`,
        left: 0,
        right: 0,
      }}
    >
      <Container
        maxWidth={fullWidth ? false : 'lg'}
        sx={{ height: fixedHeight ? 'auto' : '100%' }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default PageWrapper;
