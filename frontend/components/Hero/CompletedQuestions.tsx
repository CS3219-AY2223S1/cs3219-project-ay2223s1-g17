import { Stack, Typography, Box, useTheme } from '@mui/material';
import React, { FC } from 'react';
import { DIFFICULTY } from 'utils/enums';
import { History } from './Hero';

type Props = {
  history: History[];
};

const CompletedQuestions: FC<Props> = ({ history }) => {
  console.log(history);
  return (
    <Stack sx={{ p: 2 }}>
      <Typography color="black" variant="h4" textAlign="center" sx={{ mb: 4 }}>
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
          <Typography>
            You have yet to complete any questions! Find a match and start
            prepping with peers
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export type CompletedQuestion = {
  title: string;
  difficulty: DIFFICULTY;
  otherUser: string;
};

type HistoryCardProps = {
  question: CompletedQuestion;
  index: number;
  createdAt: string;
};

const HistoryCard: FC<HistoryCardProps> = ({ question, index, createdAt }) => {
  const theme = useTheme();
  if (!question) return <></>;
  const { title, difficulty } = question;
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        borderRadius: '4px',
        bgcolor: index % 2 === 0 ? '#f7f7f8' : 'inherit',
        p: 2,
      }}
    >
      <Stack flexDirection="row" alignItems="center" columnGap={1}>
        <Typography variant="h6">{title}</Typography>
        <Box
          sx={{
            backgroundColor: theme.palette[`${difficulty}`].main,
            borderRadius: '4px',
            p: 0.5,
          }}
        >
          <Typography
            variant="caption"
            color="white"
            fontWeight={500}
            sx={{ textTransform: 'capitalize' }}
          >
            {difficulty.toLowerCase()}
          </Typography>
        </Box>
      </Stack>
      <Typography variant="subtitle2" color="gray">
        {getDateDifference(createdAt)}
      </Typography>
    </Stack>
  );
};

export const getDateDifference = (dateString: string) => {
  const now = new Date(dateString);

  const diffInMilliseconds = new Date().getTime() - now.getTime();

  const minuteThreshold = 1000 * 60;
  const hourThreshold = minuteThreshold * 60;
  const dayThreshold = hourThreshold * 24;
  const weekThreshold = dayThreshold * 7;

  if (diffInMilliseconds < weekThreshold) {
    const days = Math.floor(diffInMilliseconds / dayThreshold);
    return days === 0 ? 'Today' : `${days}d ago`;
  }
  return '>1w ago';
};

export default CompletedQuestions;
