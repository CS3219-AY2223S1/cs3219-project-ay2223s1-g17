import Editor from "@monaco-editor/react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { DIFFICULTY } from "util/enums";

const difficultyColors = {
  [DIFFICULTY.EASY]: '#93DB9A',
  [DIFFICULTY.MEDIUM]: '#F8B06E',
  [DIFFICULTY.HARD]: '#ED8D8D',
}

const CodeEditor = () => {
  const difficulty = DIFFICULTY.EASY


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
        borderRadius="20px"
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}

        sx={{
          flexDirection: 'row',
          paddingY: 4,
          paddingX: 8,
        }}
      >
        <Box
          sx={{
            height: '90vh',
            width: '50%',
            backgroundColor: 'white',
            overflow: 'scroll'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingY: 1,
              paddingX: 2,
            }}>

            <Typography
              variant="h6"
              color="black"
              fontWeight="bold"

              sx={{ marginBottom: 1 }}
            >
              Two Sum
            </Typography>

            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ marginBottom: 1, 
                color: difficultyColors[difficulty] ?? 'black' }}
            >
              Easy
            </Typography>
          </Box>
          <Divider orientation='horizontal' flexItem />
          <Typography
            color="black"
            sx={{ marginBottom: 2, marginLeft: 2, marginRight: 2 }}
          >
            Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
            You may assume that each input would have exactly one solution, and you may not use the same element twice.
            You can return the answer in any order.
          </Typography>

          <Typography
            fontWeight="bold"
            color="black"
            sx={{ marginBottom: 2, marginLeft: 2, marginRight: 2 }}
          >
            Example 1
          </Typography>

          <Typography
            color="black"
            fontSize="14px"
            fontFamily="Courier New"
            sx={{ marginBottom: 2, marginLeft: 2, marginRight: 2, backgroundColor: '#EEEDE7', borderRadius: '5px' }}>
            Input: nums = [2,7,11,15], target = 9 <br />
            Output: [0,1] <br />
            Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].<br />
          </Typography>
          <Typography
            fontWeight="bold"
            color="black"
            sx={{ marginBottom: 2, marginLeft: 2, marginRight: 2 }}
          >
            Constraints
          </Typography>

          <Typography
            color="black"
            fontSize="14px"
            sx={{ marginBottom: 2, marginLeft: 2, marginRight: 2 }}>
            Only one valid answer exists.  <br />
          </Typography>
        </Box>

        <Editor
          height="90vh"
          defaultLanguage="python"
          defaultValue="// Type your answer here"
        />



      </Stack>
    </Box>
  );
};

export default CodeEditor;
