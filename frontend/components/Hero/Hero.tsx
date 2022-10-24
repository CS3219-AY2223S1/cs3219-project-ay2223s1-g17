/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Stack, Typography, Paper, Divider, Tooltip } from '@mui/material/';
import { Chat } from 'components/CollabRoom/ChatPanel';
import useAuth from 'contexts/AuthContext';
import { FC } from 'react';
import Completion from './Completion';
import History, { CompletedQuestion } from './CompletedQuestions';
import LanguageUsage from './LanguageUsage';
import CompletedQuestions from './CompletedQuestions';
import Heatmap from './Heatmap';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { amber } from '@mui/material/colors';

export type History = {
  _id: string;
  question: CompletedQuestion;
  chat: Chat[];
  code: string;
  createdAt: string;
};

export type Statistics = {
  completedQuestions: string[];
  completedQuestionsByDifficulty: Record<string, number>;
  languagesUsed: Record<string, number>;
  completedQuestionsByDay: Record<string, number>;
  dailyStreak: number;
};

type Props = {
  history: History[];
  statistics: Statistics;
  addHistory: () => void;
};

const Hero: FC<Props> = ({ history, statistics, addHistory }) => {
  const { user } = useAuth();
  if (!user) return <></>;
  return (
    <Stack flexDirection="row" columnGap={2} sx={{ pt: 8 }}>
      <Paper sx={{ p: 2 }} elevation={2}>
        <Stack justifyContent="center">
          <Stack flexDirection="row" justifyContent="center" columnGap={2}>
            <img
              src={`data:image/svg+xml;base64,${user.avatarImage}`}
              style={{ width: '4rem', aspectRatio: '1/1' }}
            />
            <Stack rowGap={0.5}>
              <Typography variant="h6">{user.username}</Typography>
              <Tooltip title="Daily Streak">
                <Stack
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  columnGap={0.25}
                >
                  <WhatshotIcon sx={{ color: amber[800] }} fontSize="small" />
                  <Typography variant="caption" color="gray">
                    {statistics.dailyStreak}
                  </Typography>
                </Stack>
              </Tooltip>
            </Stack>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <LanguageUsage languagesUsed={statistics.languagesUsed} />
          <Divider sx={{ my: 2 }} />
          <Typography>Topics</Typography>
          <Divider />
        </Stack>
      </Paper>
      <Paper sx={{ p: 2 }} elevation={2}>
        <Stack>
          <Completion
            numCompletedQuestions={statistics.completedQuestions.length}
            completedQuestionsByDifficulty={
              statistics.completedQuestionsByDifficulty
            }
          />
          <Divider sx={{ mb: 2 }} />
          <Heatmap
            completedQuestionsByDay={statistics.completedQuestionsByDay}
          />
          <Divider sx={{ mt: 2 }} />
          <CompletedQuestions history={history} />
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Hero;