import { Stack, Typography } from '@mui/material';
import DifficultySelector from 'components/Matchmaking/DifficultySelector';
import React, { FC } from 'react';
import { History } from './Hero';
import HistoryCard from './HistoryCard';

type Props = {
  history: History[];
};

const CompletedQuestions: FC<Props> = ({ history }) => {
  console.log(history);
  return (
    <Stack sx={{ p: 2 }}>
      <Typography color="black" variant="h5" textAlign="center" sx={{ mb: 2 }}>
        PeerPrep Logs
      </Typography>
      <Stack>
        {history.length ? (
          history.map((session, index) => (
            <HistoryCard
              key={session._id}
              index={index}
              question={session.question}
              createdAt={session.createdAt}
            />
          ))
        ) : (
          <Stack alignItems="center" rowGap={1}>
            <Typography>You have yet to complete any questions!</Typography>
            <Typography>Find a match and start prepping with peers</Typography>
            <DifficultySelector hideLabel />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default CompletedQuestions;
