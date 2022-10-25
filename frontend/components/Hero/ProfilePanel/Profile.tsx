/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { FC } from 'react';
import { Stack, Tooltip, Typography } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { amber } from '@mui/material/colors';
import LoadingWrapper from 'components/Loading/LoadingWrapper';

type Props = {
  username: string;
  createdAt: string;
  dailyStreak?: number;
  isLoading: boolean;
};

const Profile: FC<Props> = ({
  username,
  createdAt,
  dailyStreak,
  isLoading,
}) => {
  return (
    <Stack justifyContent="center" width="100%" rowGap={0.5}>
      <LoadingWrapper isLoading={isLoading} custom>
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography
            variant="h5"
            fontWeight={500}
            sx={{ wordBreak: 'break-word' }}
          >
            {username}&apos;s Profile
          </Typography>
          <Tooltip title="Daily Streak">
            <Stack
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              columnGap={0.25}
            >
              <WhatshotIcon sx={{ color: amber[800] }} />
              <Typography variant="h6" fontWeight="bold" color={amber[800]}>
                {dailyStreak ?? 0}
              </Typography>
            </Stack>
          </Tooltip>
        </Stack>
      </LoadingWrapper>
      <LoadingWrapper isLoading={isLoading} custom styles={{ height: '1rem' }}>
        <Typography variant="caption" fontWeight="light" color="secondary">
          PeerPrepper since{' '}
          {new Date(createdAt).toLocaleDateString('en-sg', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </Typography>
      </LoadingWrapper>
    </Stack>
  );
};

export default Profile;
