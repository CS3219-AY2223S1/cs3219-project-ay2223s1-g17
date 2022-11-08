/* eslint-disable @next/next/no-img-element */
import { Button, Stack, Typography } from '@mui/material/';

import { useRouter } from 'next/router';
const LandingPage = () => {
  const router = useRouter();
  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'row',
        paddingY: 8,
        paddingX: 4,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Stack sx={{ pl: 4 }}>
        <Typography
          color="#2370C8"
          fontFamily="Raleway"
          fontWeight="bold"
          sx={{ marginBottom: 2 }}
          fontSize={72}
        >
          PeerPrep
        </Typography>
        <Typography
          color="black"
          fontFamily="Raleway"
          fontWeight="medium"
          sx={{ marginBottom: 2 }}
          fontSize={24}
        >
          Prepare for technical interviews with your peers.
        </Typography>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            backgroundColor: '#2365C8',
            borderRadius: '12px',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
          }}
          onClick={() => router.push('/auth?mode=register')}
        >
          Sign Up
        </Button>
      </Stack>
      <img
        src="/assets/landing-page.png"
        alt="home"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </Stack>
  );
};

export default LandingPage;
