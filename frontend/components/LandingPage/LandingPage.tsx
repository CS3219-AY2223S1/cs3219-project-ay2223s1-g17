import { Box, Container, Button, Stack, Typography } from '@mui/material/';

import { useRouter } from 'next/router';
const LandingPage = () => {

    const router = useRouter();
    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                
                flexDirection: 'column',
                backgroundImage: 'linear-gradient(45deg, #2370C8, #BFFFBE)',
                pb: 2,
            }}
        >
            <Stack
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    paddingY: 8,
                    paddingX: 4,
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>
                <Stack sx={{pl: 4}}>

                    <Typography
                        color='#FFFFFF'
                        fontFamily='Raleway'
                        fontWeight="bold"
                        sx={{ marginBottom: 2 }}
                        fontSize={72}>
                        PeerPrep
                    </Typography>
                    <Typography
                        color='#FFFFFF'
                        fontFamily='Raleway'
                        fontWeight="medium"
                        sx={{ marginBottom: 2 }}
                        fontSize={24}>
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
                        onClick={() => router.push('/auth')}
                    >
                        Sign Up
                    </Button>
                </Stack>
                <img
                    src="/assets/landing-page.png"
                    alt="home"
                    style={{ height: '550px' }}
                />
            </Stack>

        </Box>
    );
};

export default LandingPage;
