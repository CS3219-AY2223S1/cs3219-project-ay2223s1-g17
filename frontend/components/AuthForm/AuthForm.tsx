import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
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
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          sx={{ backgroundColor: 'white' }}
        />
        <TextField
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          sx={{ backgroundColor: 'blue' }}
        />
        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AuthForm;
