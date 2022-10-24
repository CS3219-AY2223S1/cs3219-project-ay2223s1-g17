import { Stack, Typography, Chip } from '@mui/material';
import React, { FC } from 'react';

type Props = {
  languagesUsed: Record<string, number>;
};

const LanguageUsage: FC<Props> = ({ languagesUsed }) => {
  return (
    <Stack>
      <Typography>Languages</Typography>
      <Stack>
        {Object.entries(languagesUsed).map(([language, count]) => {
          return (
            <Stack
              key={language}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ py: 1 }}
            >
              <Chip
                variant="filled"
                size="small"
                label={language.toLowerCase()}
                sx={{ textTransform: 'capitalize' }}
              />
              <Stack flexDirection="row">
                <Typography fontWeight="bold" variant="subtitle2">
                  {count}
                </Typography>
                <Typography fontWeight="light" variant="subtitle2">
                  x
                </Typography>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default LanguageUsage;
