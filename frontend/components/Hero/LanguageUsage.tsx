import { Stack, Typography, Chip } from '@mui/material';
import React, { FC } from 'react';

type Props = {
  languagesUsed: Record<string, number>;
};

const LanguageUsage: FC<Props> = ({ languagesUsed }) => {
  return (
    <Stack>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Languages
      </Typography>
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
              <Stack flexDirection="row" columnGap={0.5}>
                <Typography fontWeight="bold" variant="subtitle2">
                  {count}
                </Typography>
                <Typography fontWeight="light" variant="subtitle2">
                  problems completed
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
