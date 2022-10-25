import { Stack, Typography } from '@mui/material';
import LoadingWrapper from 'components/Loading/LoadingWrapper';
import React, { FC } from 'react';
import { History } from './CompletionPanel';
import HistoryCard from './HistoryCard';

type Props = {
  history?: History[];
  isLoading: boolean;
};

const CompletedQuestions: FC<Props> = ({ history, isLoading }) => {
  return (
    <Stack height="100%">
      <LoadingWrapper isLoading={isLoading} styles={{ mx: 'auto' }}>
        <Typography
          color="primary"
          variant="h4"
          fontWeight={500}
          textAlign="center"
          sx={{ mb: 2 }}
        >
          PeerPrep Logs
        </Typography>
      </LoadingWrapper>
      <Stack>
        {history?.length ? (
          history.map((session, index) => (
            <HistoryCard
              key={session._id}
              index={index}
              question={session.question}
              createdAt={session.createdAt}
              historyId={session._id}
              isLoading={isLoading}
            />
          ))
        ) : (
          <Stack alignItems="center" rowGap={1} sx={{ flexGrow: 1 }}>
            <LoadingWrapper isLoading={isLoading}>
              <Typography
                variant="body2"
                color="secondary.dark"
                fontWeight="light"
              >
                You have yet to complete any questions!
              </Typography>
            </LoadingWrapper>
            <LoadingWrapper isLoading={isLoading}>
              <Typography
                variant="body2"
                color="secondary.dark"
                fontWeight="light"
              >
                Find a match and start prepping with peers
              </Typography>
            </LoadingWrapper>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default CompletedQuestions;
