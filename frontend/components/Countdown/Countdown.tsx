import { Box, Stack, Typography } from '@mui/material/';
import { FC } from 'react';

type Props = {
  count: number;
};

const Countdown: FC<Props> = ({ count }) => {
  return (
    <Stack
      sx={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 4,
        width: '100%',
      }}
    >
      <Stack
        sx={{
          width: '20%',
          aspectRatio: '1 / 1',
          backgroundColor: '#8EACE8',
          borderRadius: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#BAECBF',
          position: 'relative',
        }}
      >
        <Typography
          sx={{
            display: 'inline-block',
            fontFamily: 'digital-7',
            fontSize: 160,
          }}
        >
          {count}
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            top: 0,
            border: '10px solid #8EACE8',
            borderRight: '10px solid #BAECBF',
            borderBottom: '10px solid #BAECBF',
            borderRadius: '50%',
            animation: 'loading 1s infinite linear',
          }}
        ></Box>
      </Stack>
      <Typography color="white">
        Please wait while we find you a match
      </Typography>
    </Stack>
  );
};

export default Countdown;
