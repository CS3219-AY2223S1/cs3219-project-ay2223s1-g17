// packages
import CodeIcon from '@mui/icons-material/Code';
import DescriptionIcon from '@mui/icons-material/Description';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import {
  Box,
  Divider,
  MenuItem,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { ReactNode, useState } from 'react';

// code
import CodeEditor from 'components/room/CodeEditor';
import useQuestion from 'components/room/hooks/useQuestion';
import { DIFFICULTY, LANGUAGE, VIEW } from 'utils/enums';

const ViewButtonMap: Record<VIEW, ReactNode> = {
  QUESTION: <DescriptionIcon />,
  HYBRID: <VerticalSplitIcon sx={{ transform: 'rotate(180deg)' }} />,
  EDITOR: <CodeIcon />,
};

const DifficultyColorMap: Record<DIFFICULTY, string> = {
  EASY: '#93DB9A',
  MEDIUM: '#F8B06E',
  HARD: '#ED8D8D',
};

const Room = () => {
  const { title, difficulty, description, examples, constraints, templates } =
    useQuestion();
  const [language, setLanguage] = useState<LANGUAGE>(LANGUAGE.PYTHON);
  const [view, setView] = useState<VIEW>(VIEW.HYBRID);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        overflowX: 'hidden',
        flexDirection: 'column',
        pb: 2,
      }}
    >
      <Stack
        sx={{ width: '100%', px: 4, py: 2 }}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <ToggleButtonGroup
          value={view}
          onChange={(_, newView: VIEW) => setView(newView)}
          color="primary"
          exclusive
        >
          {Object.values(VIEW).map((viewType) => (
            <ToggleButton key={viewType} value={viewType}>
              {ViewButtonMap[viewType]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value as LANGUAGE)}
          sx={{ textTransform: 'capitalize' }}
          SelectDisplayProps={{ style: { paddingTop: 8, paddingBottom: 8 } }}
        >
          {Object.values(LANGUAGE).map((languageOption) => (
            <MenuItem
              key={languageOption}
              value={languageOption}
              sx={{ textTransform: 'capitalize' }}
            >
              {languageOption.toLowerCase()}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <Stack
        direction="row"
        sx={{
          display: view === VIEW.HYBRID ? 'grid' : 'flex',
          flexDirection: 'row',
          height: '100%',
          width: '100%',
          gridTemplateColumns: view === VIEW.HYBRID ? '1fr 2fr' : 'none',
          gridTemplateAreas: view === VIEW.HYBRID ? "'left right'" : 'none',
        }}
      >
        {view !== VIEW.EDITOR ? (
          <Box
            sx={{
              height: '100%',
              maxHeight: 'calc(100vh - 64px)',
              overflowY: 'auto',
              whiteSpace: 'pre-line',
              resize: view === VIEW.HYBRID ? 'horizontal' : 'none',
              gridArea: 'left',
              minWidth: view === VIEW.HYBRID ? '33vw' : 'auto',
              maxWidth: view === VIEW.HYBRID ? '67vw' : 'auto',
              position: 'relative',
              margin: view === VIEW.QUESTION ? 'auto' : 'none',
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 1,
                pt: 1,
              }}
            >
              <Typography
                variant="h6"
                color="black"
                fontWeight="bold"
                sx={{ mb: 1, textTransform: 'capitalize' }}
                fontSize={24}
              >
                {title}
              </Typography>
              <Typography
                variant="h6"
                color={DifficultyColorMap[difficulty || DIFFICULTY.HARD]}
                sx={{ textTransform: 'capitalize', mb: 1 }}
                fontWeight="bold"
                fontSize={24}
              >
                {difficulty?.toLowerCase()}
              </Typography>
            </Box>
            <Divider orientation="horizontal" flexItem />
            <Typography color="black" sx={{ px: 2, my: 4 }} fontSize={18}>
              {description}
            </Typography>
            {(examples ?? []).map(({ input, output, explanation }, index) => (
              <Box
                key={`example-${index}`}
                sx={{
                  px: 2,
                  my: 4,
                }}
              >
                <Typography fontWeight="bold" color="black">
                  Example {index + 1}
                </Typography>
                <Box
                  color="black"
                  sx={{
                    backgroundColor: '#EEEDE7',
                    borderRadius: '5px',
                    px: 2,
                    py: 0.5,
                    my: 1,
                  }}
                >
                  <p>
                    <strong>Input: </strong>
                    {input}
                  </p>
                  <p>
                    <strong>Ouput: </strong>
                    {output}
                  </p>
                  {explanation ? (
                    <p>
                      <strong>Explanation: </strong>
                      {explanation}
                    </p>
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>
            ))}
            {constraints && constraints.length ? (
              <Typography fontWeight="bold" color="black">
                Constraints
              </Typography>
            ) : (
              <></>
            )}
            {(constraints ?? []).map((constraint, index) => (
              <Typography key={`constraint-${index}`} color="black">
                {constraint}
              </Typography>
            ))}
            {view === VIEW.HYBRID ? (
              <Typography
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 12,
                }}
                color="rgba(0,0,0,0.7)"
                fontSize={12}
              >
                drag horizontally to resize
              </Typography>
            ) : (
              <></>
            )}
          </Box>
        ) : (
          <></>
        )}
        {view !== VIEW.QUESTION ? (
          <Box
            sx={{
              height: '100%',
              width: '100%',
              gridArea: 'right',
            }}
          >
            <CodeEditor language={language} templates={templates} />
          </Box>
        ) : (
          <></>
        )}
      </Stack>
    </Box>
  );
};

export default Room;
