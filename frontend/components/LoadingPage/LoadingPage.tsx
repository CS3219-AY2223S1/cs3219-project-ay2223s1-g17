import { Stack, CircularProgress, Typography } from '@mui/material';
import PageWrapper from 'components/PageWrapper';
import React from 'react';

const LoadingPage = () => {
  return (
    <PageWrapper whiteBackground fixedHeight>
      <Stack
        sx={{
          width: '100%',
          height: '100%',
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
