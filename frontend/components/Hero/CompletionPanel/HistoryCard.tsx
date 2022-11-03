import { Stack, Typography, useTheme } from '@mui/material';
import LoadingWrapper from 'components/Loading/LoadingWrapper';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { DIFFICULTY } from 'utils/enums';

export type CompletedQuestion = {
  title: string;
  difficulty: DIFFICULTY;
  otherUser: string;
};

type Props = {
  question: CompletedQuestion;
  index: number;
  createdAt: string;
  historyId: string;
  isLoading: boolean;
};

const HistoryCard: FC<Props> = ({
  question,
  index,
  createdAt,
  historyId,
  isLoading,
}) => {
  const theme = useTheme();
  const router = useRouter();

  const { title, difficulty } = question;
  return (
    <LoadingWrapper
      isLoading={isLoading}
      custom
      styles={{ width: '100%', height: '4rem' }}
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: '100%',
          borderRadius: '4px',
          bgcolor: index % 2 === 0 ? '#f7f7f8' : 'inherit',
          p: 1.5,
          cursor: 'pointer',
          transitionProperty: 'color, background-color',
          transitionDuration: '0.15s',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            color: 'white',
            bgcolor: theme.palette.primary.dark,
          },
        }}
        onClick={() => router.push(`/history/${historyId}`)}
      >
        <Stack flexDirection="row" alignItems="center" columnGap={1}>
          <Typography variant="subtitle2">{title}</Typography>
          <Typography
            variant="body2"
            color={theme.palette[`${difficulty}`].main}
            fontWeight={500}
            sx={{ textTransform: 'capitalize' }}
          >
            {difficulty.toLowerCase()}
          </Typography>
        </Stack>
        <Typography
          variant="caption"
          fontWeight="light"
          sx={{
            color: 'inherit',
          }}
        >
          {getDateDifference(createdAt)}
        </Typography>
      </Stack>
    </LoadingWrapper>
  );
};

export default HistoryCard;

export const getDateDifference = (dateString: string) => {
  const now = new Date(dateString);

  const diffInMilliseconds = new Date().getTime() - now.getTime();

  const minuteThreshold = 1000 * 60;
  const hourThreshold = minuteThreshold * 60;
  const dayThreshold = hourThreshold * 24;
  const weekThreshold = dayThreshold * 7;

  if (diffInMilliseconds < weekThreshold) {
    const days = Math.floor(diffInMilliseconds / dayThreshold);
    return days === 0 ? 'Today' : `${days} day${days === 1 ? '' : 's'} ago`;
  }

  const monthThreshold = weekThreshold * 4;
  if (diffInMilliseconds < monthThreshold) {
    const weeks = Math.floor(diffInMilliseconds / weekThreshold);
    return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
  }

  const yearThreshold = monthThreshold * 12;
  if (diffInMilliseconds < yearThreshold) {
    const months = Math.floor(diffInMilliseconds / monthThreshold);
    return `${months} month${months === 1 ? '' : 's'} ago`;
  }

  return 'Over a year ago';
};
