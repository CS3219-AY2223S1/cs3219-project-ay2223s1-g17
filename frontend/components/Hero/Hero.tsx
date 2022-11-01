import { Stack } from '@mui/material/';
import { FC } from 'react';
import { useHistory, useStatistics } from 'api/hero';
import ProfilePanel from './ProfilePanel';
import CompletionPanel from './CompletionPanel';
import { LANGUAGE } from 'utils/enums';

export type Statistics = {
  completedQuestions: string[];
  completedQuestionsByDifficulty: Record<string, number>;
  languagesUsed: Record<string, number>;
  completedQuestionsByDay: Record<string, number>;
  completedTopics: Record<string, number>;
  dailyStreak: number;
  longestStreak: number;
};

type Props = {
  userId: string;
  username: string;
  createdAt: string;
  preferredLanguage: LANGUAGE;
};

const Hero: FC<Props> = ({
  userId,
  username,
  createdAt,
  preferredLanguage,
}) => {
  const { history, isLoadingHistory, isFetchingHistory } = useHistory(userId);
  const { statistics, isLoadingStatistics, isFetchingStatistics } =
    useStatistics(userId);

  const showHistorySkeleton = isLoadingHistory || isFetchingHistory;
  const showStatisticsSkeleton = isLoadingStatistics || isFetchingStatistics;
  const isLoading = showHistorySkeleton || showStatisticsSkeleton;

  const profilePanelProps = {
    username,
    createdAt,
    preferredLanguage,
    statistics,
    isLoading,
  };
  const completionPanelProps = {
    statistics,
    history,
    isLoading,
  };

  return (
    <Stack flexDirection="row" columnGap={2} sx={{ py: 8, width: '100%' }}>
      <ProfilePanel {...profilePanelProps} />
      <CompletionPanel {...completionPanelProps} />
    </Stack>
  );
};

export default Hero;
