import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import WarningIcon from '@mui/icons-material/Warning';
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import useAuth from 'contexts/AuthContext';
import { useRouter } from 'next/router';
import { FormEvent, useState, FC, Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import { handleErrorWithToast } from 'utils/helpers';

const AuthForm = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { register, login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword)
      handleErrorWithToast('Passwords do not match');

    isLogin
      ? await login(username, password, onSuccess)
      : await register(username, password, onSuccess);
  };

  const handleSwitchMode = () => {
    handleReset();
    setIsLogin((prev) => !prev);
  };

  const handleSwitchPasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSwitchConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleReset = () => {
    setPassword('');
    setUsername('');
    setConfirmPassword('');
    setShowPassword(false);
  };

  const onSuccess = () => {
    toast.success(
      `Successfully ${isLogin ? 'logged in!' : 'created new account!'}`
    );
    handleReset();
    return isLogin ? router.push('/') : setIsLogin(true);
  };

  return (
    <Stack
      spacing={2}
      sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}
    >
      <form onSubmit={handleSubmit}>
        <Stack
          spacing={2}
          sx={{
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            bgcolor: '#fffaf0',
            borderRadius: '12px',
            height: '400px',
            justifyContent: 'center',
            columnGap: 8,
            paddingY: 4,
            paddingX: 8,
          }}
        >
          <Typography
            variant="h6"
            align="center"
            color="#2365C8"
            fontWeight="bold"
            sx={{ marginBottom: 2 }}
            fontSize={24}
          >
            {user
              ? 'Change Password'
              : `PeerPrep ${isLogin ? 'Login' : 'Sign Up'}`}
          </Typography>
          {!user ? (
            <TextField
              name="username"
              placeholder="Username"
              value={username}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: 'black' }} fontSize="small" />
                  </InputAdornment>
                ),
                sx: { borderRadius: '12px', fontSize: 12 },
              }}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                backgroundColor: '#E7E7E7',
                borderRadius: '12px',
              }}
            />
          ) : (
            <></>
          )}
          <PasswordInput
            showPassword={showPassword}
            handleSwitchVisibility={handleSwitchPasswordVisibility}
            value={password}
            label="Password"
            handleChange={setPassword}
          />
          {user || !isLogin ? (
            <PasswordInput
              showPassword={showConfirmPassword}
              handleSwitchVisibility={handleSwitchConfirmPasswordVisibility}
              value={confirmPassword}
              label="Confirm Password"
              handleChange={setConfirmPassword}
            />
          ) : (
            <></>
          )}
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#2365C8',
              borderRadius: '12px',
              filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            }}
          >
            {user ? 'Submit' : isLogin ? 'Login' : 'Register'}
          </Button>
          {!user ? (
            <Button
              variant="text"
              size="small"
              endIcon={<ArrowRightAltOutlinedIcon />}
              style={{
                color: 'black',
                textTransform: 'none',
                marginTop: '32px',
                fontWeight: 'medium',
              }}
              onClick={handleSwitchMode}
            >
              {isLogin ? 'Create your account' : 'Sign in instead'}
            </Button>
          ) : (
            <Button
              variant="text"
              color="error"
              startIcon={<WarningIcon color="error" />}
              style={{
                marginTop: '32px',
              }}
            >
              Delete Account
            </Button>
          )}
        </Stack>
      </form>
    </Stack>
  );
};

type Props = {
  showPassword: boolean;
  handleSwitchVisibility: () => void;
  value: string;
  label: string;
  handleChange: Dispatch<SetStateAction<string>>;
};

const PasswordInput: FC<Props> = ({
  showPassword,
  handleSwitchVisibility,
  value,
  label,
  handleChange,
}) => (
  <TextField
    name="password"
    placeholder={label}
    type={showPassword ? 'text' : 'password'}
    size="small"
    value={value}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <LockIcon sx={{ color: 'black' }} fontSize="small" />
        </InputAdornment>
      ),
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={handleSwitchVisibility}>
            {showPassword ? (
              <VisibilityOffIcon sx={{ color: 'black' }} fontSize="small" />
            ) : (
              <VisibilityIcon sx={{ color: 'black' }} fontSize="small" />
            )}
          </IconButton>
        </InputAdornment>
      ),
      sx: { borderRadius: '12px', fontSize: 12 },
    }}
    onChange={(e) => handleChange(e.target.value)}
    sx={{ backgroundColor: '#E7E7E7', borderRadius: '12px' }}
  />
);

export default AuthForm;
