import { FC } from 'react';
import { Stack, Typography, Chip, Box } from '@mui/material';
import { useTheme } from '@mui/system';
import { TopicSkillMapping } from 'utils/constants';
import { DIFFICULTY, SKILL, TOPIC } from 'utils/enums';
import LoadingWrapper from 'components/Loading/LoadingWrapper';

type Props = {
  completedTopics?: Record<string, number>;
  isLoading: boolean;
};

const TopicMastery: FC<Props> = ({ completedTopics, isLoading }) => {
  const theme = useTheme();
  const difficulties = Object.values(DIFFICULTY);
  const numDifficulties = difficulties.length;
  // assert(numDifficulties === Object.values(SKILL).length);
  const sortedTopics = Object.entries(completedTopics ?? {}).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <Stack>
      <LoadingWrapper isLoading={isLoading}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          color="primary"
          sx={{ mb: 1 }}
        >
          Topics
        </Typography>
      </LoadingWrapper>
      <Stack rowGap={2}>
        {Object.values(SKILL).map((skill, index) => {
          const topics = sortedTopics.length
            ? sortedTopics.filter(([topic]) =>
                Object.values(TopicSkillMapping[skill]).includes(topic as TOPIC)
              )
            : [];

          return (
            <Stack key={skill}>
              <LoadingWrapper isLoading={isLoading}>
                <Typography
                  variant="subtitle2"
                  textTransform="capitalize"
                  color={
                    theme.palette[difficulties[numDifficulties - index - 1]]
                      .main
                  }
                >
                  {skill.toLowerCase()}
                </Typography>
              </LoadingWrapper>
              <TopicBlock topics={topics} isLoading={isLoading} />
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

type TopicBlockProps = {
  topics: [string, number][];
  isLoading: boolean;
};

const TopicBlock: FC<TopicBlockProps> = ({ topics, isLoading }) => {
  // TODO: msg if no topics
  if (!topics.length)
    return (
      <LoadingWrapper isLoading={isLoading} custom>
        <Typography fontWeight="light" variant="body2" color="secondary.dark">
          No topics attempted yet
        </Typography>
      </LoadingWrapper>
    );

  return (
    <Box>
      {topics.map(([topic, count]) => {
        return (
          <LoadingWrapper key={topic} isLoading={isLoading} custom>
            <Box sx={{ display: 'inline-block', my: 1, mr: 1.5 }}>
              <Stack flexDirection="row" columnGap={0.25}>
                <Chip
                  variant="filled"
                  size="small"
                  label={topic.toLowerCase()}
                  sx={{ textTransform: 'capitalize' }}
                />
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  columnGap={0.125}
                >
                  <Typography
                    fontWeight="light"
                    color="secondary.dark"
                    variant="caption"
                  >
                    x
                  </Typography>
                  <Typography
                    fontWeight="bold"
                    variant="subtitle1"
                    sx={{ pb: 0.25 }}
                  >
                    {count}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </LoadingWrapper>
        );
      })}
    </Box>
  );
};

export default TopicMastery;
