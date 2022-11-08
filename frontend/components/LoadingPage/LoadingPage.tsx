import { Stack, CircularProgress, Typography } from '@mui/material';
import PageWrapper from 'components/PageWrapper';
import React from 'react';
import { NAVBAR_HEIGHT_PX } from 'utils/constants';

const LoadingPage = () => {
  return (
    <PageWrapper whiteBackground>
      <Stack
        sx={{
          width: '100%',
          height: `calc(100vh - ${NAVBAR_HEIGHT_PX}px)`,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        rowGap={2}
      >
        <CircularProgress size={100} />
        <Typography>Loading...</Typography>
      </Stack>
    </PageWrapper>
  );
};

export default LoadingPage;
