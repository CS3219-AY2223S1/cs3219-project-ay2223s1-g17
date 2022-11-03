import { Stack } from '@mui/material';
import { Chat } from 'components/CollabRoom/ChatPanel';
import React, { FC } from 'react';
import HeroWrapper from './HeroWrapper';
import CompletedQuestions from './CompletedQuestions';
import Completion from './Completion';
import Heatmap from './Heatmap';
import { CompletedQuestion } from './HistoryCard';
import { Statistics } from '../Hero';
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
};

const CompletionPanel: FC<Props> = ({ statistics, history, isLoading }) => {
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
          />
        </HeroWrapper>
        <HeroWrapper containerStyles={{ width: '50%' }}>
          <QuickMatch isLoading={isLoading} />
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
