import { FC } from 'react';
import { Stack, Typography, Chip } from '@mui/material';
import { LANGUAGE } from 'utils/enums';
import LoadingWrapper from 'components/Loading/LoadingWrapper';

type Props = {
  languagesUsed?: Record<string, number>;
  isLoading: boolean;
};

const LanguageUsage: FC<Props> = ({ languagesUsed, isLoading }) => {
  return (
    <Stack>
      <LoadingWrapper isLoading={isLoading}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          color="primary"
          sx={{ mb: 1 }}
        >
          Languages
        </Typography>
      </LoadingWrapper>
      <Stack>
        {Object.entries(
          languagesUsed ??
            Object.fromEntries(
              Object.values(LANGUAGE).map((language) => [language, 0])
            )
        )
          .sort((a, b) => b[1] - a[1])
          .map(([language, count]) => {
            return (
              <LoadingWrapper key={language} isLoading={isLoading} custom>
                <Stack
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
                  <Stack
                    flexDirection="row"
                    columnGap={0.5}
                    alignItems="center"
                  >
                    <Typography fontWeight="bold" variant="subtitle1">
                      {count}
                    </Typography>
                    <Typography
                      fontWeight="light"
                      variant="body2"
                      color="secondary.light"
                    >
                      questions completed
                    </Typography>
                  </Stack>
                </Stack>
              </LoadingWrapper>
            );
          })}
      </Stack>
    </Stack>
  );
};

export default LanguageUsage;
