import { Box, Button, Stack, Typography } from '@mui/material/';
import { useState } from 'react';
import { DIFFICULTY } from 'utils/enums';

const DifficultySelect = () => {
  const [difficulty, setDifficulty] = useState('');

  const handleChangeDifficulty = (difficulty: DIFFICULTY) => {
    setDifficulty(difficulty);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'linear-gradient(to right, #3275c4, #1c2d50)',
      }}
    >
      <Stack
        sx={{
          borderRadius: '13px',
          width: '55vh',
          bgcolor: 'white',
          alignItems: 'center',
          columnGap: 8,
          paddingY: 4,
          paddingX: 8,
        }}
      >
        <Stack
          spacing={2}
          sx={{
            width: '40vh',
          }}
        >
          <Typography
            variant="h5"
            align="center"
            color="black"
            fontWeight="bold"
          >
            Select Difficulty
          </Typography>

          <Button
            type="submit"
            variant="contained"
            size="large"
            style={{
              backgroundColor: '#93DB9A',
              fontSize: '20px',
              fontWeight: 'bold',
              textTransform: 'none',
            }}
            onClick={() => handleChangeDifficulty(DIFFICULTY.EASY)}
          >
            {DIFFICULTY.EASY}
          </Button>

          <Button
            type="submit"
            variant="contained"
            size="large"
            style={{
              backgroundColor: '#F8B06E',
              fontSize: '20px',
              fontWeight: 'bold',
              textTransform: 'none',
            }}
            onClick={() => handleChangeDifficulty(DIFFICULTY.MEDIUM)}
          >
            {DIFFICULTY.MEDIUM}
          </Button>

          <Button
            type="submit"
            variant="contained"
            size="large"
            style={{
              backgroundColor: '#ED8D8D',
              fontSize: '20px',
              fontWeight: 'bold',
              textTransform: 'none',
            }}
            onClick={() => handleChangeDifficulty(DIFFICULTY.HARD)}
          >
            {DIFFICULTY.HARD}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DifficultySelect;
