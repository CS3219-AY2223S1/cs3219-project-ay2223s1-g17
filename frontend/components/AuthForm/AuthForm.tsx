import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, InputAdornment, Stack, TextField, Typography } from '@mui/material';
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
            <Typography variant="h6" align="center" color="black" fontWeight="bold">
              PeerPrep Login
            </Typography>
            <Box height="1500" />
            <TextField
              name="username"
              label="Username"
              value={username}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              size="small"
              value={password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
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
            <Button variant="text" size="small" style={{ color: 'black', textTransform: 'none' }}>
              Forgot Username/ Password?
            </Button>
            <Box height="1500" />
            <Box height="1500" />
            <Button variant="text" size="small" endIcon={<ArrowRightAltOutlinedIcon />} style={{ color: 'black', textTransform: 'none' }}>
              Create your account
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>

  );

};

export default AuthForm;
