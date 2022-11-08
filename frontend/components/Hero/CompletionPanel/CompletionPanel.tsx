import { Stack } from '@mui/material';
import { Chat } from 'components/CollabRoom/ChatPanel';
import { FC } from 'react';
import { DIFFICULTY } from 'utils/enums';
import { Statistics } from '../Hero';
import CompletedQuestions from './CompletedQuestions';
import Completion from './Completion';
import Heatmap from './Heatmap';
import HeroWrapper from './HeroWrapper';
import { CompletedQuestion } from './HistoryCard';
import QuickMatch from './QuickMatch';

export type History = {
  _id: string;
  question: CompletedQuestion;
  chats: Chat[];
  code: string;
  createdAt: string;
};

type Props = {
  statistics?: Statistics;
  history?: History[];
  isLoading: boolean;
  questionsCount?: Record<DIFFICULTY, number>;
};

const CompletionPanel: FC<Props> = ({
  statistics,
  history,
  isLoading,
  questionsCount,
}) => {
  return (
    <Stack rowGap={2}>
      <Stack flexDirection="row" columnGap={2}>
        <HeroWrapper containerStyles={{ width: '50%' }}>
          <Completion
            numCompletedQuestions={statistics?.completedQuestions.length}
            completedQuestionsByDifficulty={
              statistics?.completedQuestionsByDifficulty
            }
            isLoading={isLoading}
            questionsCount={questionsCount}
          />
        </HeroWrapper>
        <HeroWrapper containerStyles={{ width: '50%' }}>
          <QuickMatch
            completedQuestionsByDay={statistics?.completedQuestionsByDay}
            isLoading={isLoading}
          />
        </HeroWrapper>
      </Stack>
      <HeroWrapper>
        <Heatmap
          completedQuestionsByDay={statistics?.completedQuestionsByDay}
          longestStreak={statistics?.longestStreak}
          isLoading={isLoading}
        />
      </HeroWrapper>
      <HeroWrapper containerStyles={{ flexGrow: 1 }}>
        <CompletedQuestions history={history} isLoading={isLoading} />
      </HeroWrapper>
    </Stack>
  );
};

export default CompletionPanel;
