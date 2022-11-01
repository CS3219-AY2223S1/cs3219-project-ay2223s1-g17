import { FC } from 'react';
import { Paper, Stack, Divider } from '@mui/material';
import LanguageUsage from './LanguageUsage';
import Profile from './Profile';
import TopicMastery from './TopicMastery';
import { Statistics } from '../Hero';
import { LANGUAGE } from 'utils/enums';

type Props = {
  username: string;
  createdAt: string;
  preferredLanguage: LANGUAGE;
  isLoading: boolean;
  statistics?: Statistics;
};

const ProfilePanel: FC<Props> = ({
  username,
  createdAt,
  preferredLanguage,
  statistics,
  isLoading,
}) => {
  return (
    <Paper
      sx={{
        p: 2,
        flexGrow: 1,
        display: 'inline-block',
      }}
      elevation={2}
    >
      <Stack justifyContent="center">
        <Profile
          username={username}
          createdAt={createdAt}
          preferredLanguage={preferredLanguage}
          dailyStreak={statistics?.dailyStreak}
          isLoading={isLoading}
        />
        <Divider sx={{ mt: 2, mb: 0.5 }} />
        <LanguageUsage
          languagesUsed={statistics?.languagesUsed}
          isLoading={isLoading}
        />
        <Divider sx={{ mt: 2, mb: 0.5 }} />
        <TopicMastery
          completedTopics={statistics?.completedTopics}
          isLoading={isLoading}
        />
      </Stack>
    </Paper>
  );
};

export default ProfilePanel;
