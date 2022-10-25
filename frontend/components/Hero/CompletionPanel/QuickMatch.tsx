import { Stack, Typography } from '@mui/material';
import LoadingWrapper from 'components/Loading/LoadingWrapper';
import DifficultySelector from 'components/Matchmaking/DifficultySelector';
import FastForwardIcon from '@mui/icons-material/FastForward';
import React, { FC } from 'react';

type Props = {
  isLoading: boolean;
};

const QuickMatch: FC<Props> = ({ isLoading }) => {
  return (
    <Stack
      rowGap={isLoading ? 0 : 2}
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <LoadingWrapper isLoading={isLoading}>
        <Stack flexDirection="row" columnGap={1} alignItems="center">
          <Typography variant="h5" color="primary" fontWeight={500}>
            Quick Match
          </Typography>
          <FastForwardIcon color="primary" />
        </Stack>
      </LoadingWrapper>
      <LoadingWrapper isLoading={isLoading}>
        <DifficultySelector hideLabel large />
      </LoadingWrapper>
    </Stack>
  );
};

export default QuickMatch;
