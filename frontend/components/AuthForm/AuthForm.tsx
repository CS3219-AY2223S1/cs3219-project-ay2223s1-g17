import { Box, Button, Card, CardActions, CardMedia, Stack, TextField, Grid, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { height } from '@mui/system';
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
    <Box height="100vh" alignContent="center">
      <Card sx={{ maxHeight: 500, maxWidth: 700, borderRadius: '13px'}}>
        <Grid container
          spacing={0}
          alignItems="center"
          justifyContent="center">
          <Grid item >
            <CardMedia
              component="img"
              alt="login illustration"
              image="/assets/login-illustration.png"
            />
          </Grid>
          <Grid item >
            <CardActions>
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <Typography variant="h6" align="center">
                    PeerPrep Login
                  </Typography>
                  <TextField
                    name="username"
                    label="Username"
                    value={username}
                    size="small"
                    onChange={(e) => setUsername(e.target.value)}
                    variant="outlined"
                    sx={{ borderRadius: '12px' }}
                  />
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    size="small"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    sx={{ borderRadius: '12px' }}
                  />
                  <Button type="submit" variant="contained" size="large" style={{backgroundColor: "#8AA0D2"}}>
                    Login
                  </Button>
                  <Button variant="text" size="small" style={{color: "black"}}>
                    Forgot Username/ Password? 
                  </Button>
                  <Box height="1000"/>

                  <Button variant="text" size="small" style={{color: "black"}}>
                    Create your account
                  </Button>

                </Stack>
              </form>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </Box>

  );
};

export default AuthForm;
