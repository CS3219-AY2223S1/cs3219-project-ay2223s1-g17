import { FC } from 'react';
import { Stack, Box } from '@mui/material';
import { RESIZER_HEIGHT_WIDTH_PX } from 'utils/constants';

type Props = {
  shouldDisplay: boolean;
  backgroundColor: string;
  id: string;
  isVertical?: boolean;
};

const Resizer: FC<Props> = ({
  shouldDisplay,
  backgroundColor,
  id,
  isVertical,
}) => {
  return (
    <Stack
      id={id}
      sx={{
        display: shouldDisplay ? 'flex' : 'none',
        height: isVertical ? '100%' : `${RESIZER_HEIGHT_WIDTH_PX}px`,
        width: isVertical ? `${RESIZER_HEIGHT_WIDTH_PX}px` : '100%',
        cursor: isVertical ? 'col-resize' : 'row-resize',
        backgroundColor,
        transitionProperty: 'background-color',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '300ms',
      }}
      flexDirection={isVertical ? 'column' : 'row'}
      alignItems="center"
      justifyContent="center"
      gap={1}
    >
      {Array.from(Array(3).keys()).map((index) => (
        <ResizerDot key={index} />
      ))}
    </Stack>
  );
};

const ResizerDot = () => (
  <Box
    sx={{
      backgroundColor: 'white',
      borderRadius: '100%',
      border: '1px solid gray',
      width: `${RESIZER_HEIGHT_WIDTH_PX / 2}px`,
      aspectRatio: '1/1',
    }}
  />
);

export default Resizer;
