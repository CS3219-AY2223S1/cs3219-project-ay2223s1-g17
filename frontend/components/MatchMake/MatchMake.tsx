import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material/';
import {
  ADVANCED,
  DIFFICULTY,
  FUNDAMENTAL,
  INTERMEDIATE,
  SKILL,
} from 'utils/enums';
import Countdown from 'components/Countdown';
import { useMatchingContext } from 'contexts/MatchingContext';

const MatchMake = () => {
  const { startMatch, count } = useMatchingContext();
  const theme = useTheme();
  const isMatching = count !== undefined;
  const skills = [FUNDAMENTAL, INTERMEDIATE, ADVANCED];

  // return
  // isMatching ? (
  //   <Countdown count={count} />
  // ) : (
  return (
    <Paper
      sx={{
        mt: '4rem',
        mx: 'auto',
        p: 2,
      }}
      elevation={2}
    >
      <Stack rowGap={2}>
        <Typography align="center" variant="h4">
          Select Difficulty
        </Typography>
        <Grid container>
          {Object.values(DIFFICULTY).map((difficulty, index) => {
            return (
              <Grid
                item
                key={difficulty}
                xs={4}
                sx={{ display: 'flex', flexDirection: 'row', columnGap: 1 }}
              >
                <Stack sx={{ p: 2 }} rowGap={4}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: theme.palette[`${difficulty}`].main,
                      fontSize: '20px',
                      fontWeight: 500,
                      textTransform: 'capitalize',
                      '&:hover': {
                        bgcolor: theme.palette[`${difficulty}`].dark,
                      },
                    }}
                    disabled={isMatching}
                    onClick={() => startMatch(difficulty)}
                  >
                    {difficulty.toLowerCase()}
                  </Button>
                  <Box sx={{ display: 'inline-block', flexGrow: 1 }}>
                    <Typography
                      variant="caption"
                      fontWeight="light"
                      color="rgba(0,0,0,0.8)"
                      sx={{ ml: 1 }}
                    >
                      Features
                    </Typography>
                    <Typography
                      textTransform="capitalize"
                      color={theme.palette[difficulty].main}
                      sx={{ ml: 1, mb: 1 }}
                    >
                      {Object.values(SKILL)[2 - index].toLowerCase()} Topics
                    </Typography>
                    {Object.values(skills[index]).map((topic) => {
                      return (
                        <Chip
                          key={topic}
                          label={topic.toLowerCase()}
                          sx={{
                            m: 1,
                            bgcolor: theme.palette[difficulty].light,
                            textTransform: 'capitalize',
                          }}
                        />
                      );
                    })}
                  </Box>
                </Stack>
                {index < Object.values(DIFFICULTY).length - 1 ? (
                  <Divider orientation="vertical" flexItem />
                ) : (
                  <></>
                )}
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </Paper>
  );
};

export default MatchMake;
