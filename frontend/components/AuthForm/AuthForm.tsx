import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';

const AuthForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPassword('');
    setUsername('');
    console.log('submitted');
  };

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
        sx={{
          borderRadius: '13px',
          display: 'flex',
          bgcolor: 'white',
          flexDirection: 'row',
          columnGap: 8,
          paddingY: 4,
          paddingX: 8,
        }}
      >
        <img
          src="/assets/login-illustration.png"
          alt="auth"
          style={{ objectFit: 'contain' }}
        />
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Typography variant="h6" align="center" color="black">
              PeerPrep Login
            </Typography>
            <TextField
              name="username"
              label="Username"
              value={username}
              size="small"
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              style={{ backgroundColor: '#8AA0D2' }}
            >
              Login
            </Button>
            <Button variant="text" size="small" style={{ color: 'black' }}>
              Forgot Username/ Password?
            </Button>
            <Box height="1000" />

            <Button variant="text" size="small" style={{ color: 'black' }}>
              Create your account
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default AuthForm;
