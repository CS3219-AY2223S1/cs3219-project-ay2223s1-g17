import { FC } from 'react';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import EditIcon from '@mui/icons-material/Edit';
import { amber } from '@mui/material/colors';
import LoadingWrapper from 'components/Loading/LoadingWrapper';
import { LANGUAGE } from 'utils/enums';
import { useRouter } from 'next/router';

type Props = {
  username: string;
  createdAt: string;
  preferredLanguage: LANGUAGE;
  dailyStreak?: number;
  isLoading: boolean;
};

const Profile: FC<Props> = ({
  username,
  createdAt,
  preferredLanguage,
  dailyStreak,
  isLoading,
}) => {
  const router = useRouter();
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
          <Tooltip title="Daily streak">
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
      <LoadingWrapper isLoading={isLoading} custom styles={{ height: '1rem' }}>
        <Stack flexDirection="row" columnGap={1} alignItems="center">
          <Typography variant="subtitle2" color="secondary.dark">
            Preferred Language:
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight={500}
            color="black"
            textTransform="capitalize"
            sx={{ position: 'relative' }}
          >
            {preferredLanguage.toLowerCase()}
            <Tooltip title="Edit your preferred language">
              <IconButton onClick={() => router.push('/auth')} disableRipple>
                <EditIcon
                  fontSize="small"
                  sx={{
                    position: 'absolute',
                    left: 8,
                    bottom: 1,
                    '&:hover': { color: 'primary.main' },
                  }}
                />
              </IconButton>
            </Tooltip>
          </Typography>
        </Stack>
      </LoadingWrapper>
    </Stack>
  );
};

export default Profile;
