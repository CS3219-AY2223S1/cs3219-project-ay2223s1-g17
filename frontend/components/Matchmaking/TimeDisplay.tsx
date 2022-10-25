import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

type Props = {
  count: number;
};

const TimeDisplay: FC<Props> = ({ count }) => {
  return (
    <Stack
      flexDirection="row"
      alignItems="end"
      columnGap={0.25}
      sx={{ mx: 'auto' }}
    >
      <Typography
        sx={{
          fontSize: 20,
          width: '2rem',
          textAlign: 'right',
        }}
      >
        {(count ?? 0) < 10 ? '0' : ''}
        {count ?? 0}
      </Typography>
      <Typography
        sx={{
          fontSize: 12,
          mb: 0.35,
        }}
      >
        s
      </Typography>
    </Stack>
  );
};

export default TimeDisplay;
