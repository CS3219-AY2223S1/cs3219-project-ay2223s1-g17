import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { HTTP_METHOD, SERVICE } from 'util/enums';
import { apiCall } from 'util/helpers';

const AuthForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await apiCall({
      method: HTTP_METHOD.POST,
      service: SERVICE.USER,
      body: { username, password },
      requiresCredentials: isLogin,
      path: isLogin ? '/login' : '/register',
    });

    setPassword('');
    setUsername('');
    setIsLogin(true);
    setShowPassword(false);

    if (isLogin) return router.push('/');
  };

  const handleSwitchMode = () => {
    setIsLogin((prev) => !prev);
  };

  const handleSwitchVisibility = () => {
    setShowPassword((prev) => !prev);
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
            <Typography
              variant="h6"
              align="center"
              color="black"
              fontWeight="bold"
              sx={{ marginBottom: 2 }}
            >
              PeerPrep {isLogin ? 'Login' : 'Signup'}
            </Typography>
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
              type={showPassword ? 'text' : 'password'}
              size="small"
              value={password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSwitchVisibility}>
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
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
              {isLogin ? 'Login' : 'Register'}
            </Button>
            {/* <Button
              variant="text"
              size="small"
              sx={{
                color: 'black',
                textTransform: 'none',
              }}
            >
              Forgot Username/ Password?
            </Button> */}
            <Button
              variant="text"
              size="small"
              endIcon={<ArrowRightAltOutlinedIcon />}
              style={{
                color: 'black',
                textTransform: 'none',
                marginTop: '32px',
              }}
              onClick={handleSwitchMode}
            >
              {isLogin ? 'Create your account' : 'Log In'}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default AuthForm;
