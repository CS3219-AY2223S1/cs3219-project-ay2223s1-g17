import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import useAuth from 'contexts/AuthContext';
import { useRouter } from 'next/router';
import {
  FormEvent,
  useState,
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { toast } from 'react-toastify';
import { LANGUAGE } from 'utils/enums';
import { handleErrorWithToast } from 'utils/helpers';
import DeleteAccountPrompt from './DeleteAccountPrompt';
import { useMatching } from 'contexts/MatchingContext';

const AuthForm = () => {
  const {
    user,
    register,
    login,
    changePassword,
    changePreferredLanguage,
    deleteAccount,
  } = useAuth();
  const { isMatching } = useMatching();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState(
    user?.preferredLanguage ?? LANGUAGE.PYTHON
  );
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [isChangePreferredLanguage, setIsChangePreferredLanguage] =
    useState(true);

  useEffect(() => {
    const { mode } = router.query;
    setIsLogin((prev) =>
      mode === 'register' ? false : mode === 'login' ? true : prev
    );
  }, [router]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteAccount = async () => {
    await deleteAccount(() => {
      toast.success('Successfully deleted account! You have been logged out');
      handleClose();
      router.push('/');
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      (user && newPassword !== confirmPassword) ||
      (!isLogin && password !== confirmPassword)
    )
      return handleErrorWithToast('Passwords do not match');

    user
      ? isMatching
        ? toast.error('Cannot edit profile while in matching queue')
        : isChangePreferredLanguage
        ? await changePreferredLanguage(preferredLanguage, onSuccess)
        : await changePassword(password, newPassword, onSuccess)
      : isLogin
      ? await login(username, password)
      : await register(username, password, preferredLanguage, onSuccess);
  };

  const handleSwitchMode = () => {
    handleReset();

    user
      ? setIsChangePreferredLanguage((prev) => !prev)
      : setIsLogin((prev) => !prev);
  };

  const handleSwitchPasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSwitchConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSwitchNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  const handleReset = () => {
    setPassword('');
    setUsername('');
    setConfirmPassword('');
    setNewPassword('');
    setShowConfirmPassword(false);
    setShowNewPassword(false);
    setShowPassword(false);
    setIsConfirmPasswordFocused(false);
    setIsNewPasswordFocused(false);
    setIsPasswordFocused(false);
  };

  const onSuccess = () => {
    isLogin
      ? setIsLogin(false)
      : toast.success(
          `Successfully ${
            user
              ? isChangePreferredLanguage
                ? 'changed preferred language'
                : 'changed password!'
              : 'created new account!'
          }`
        );
    handleReset();
    return user || isLogin ? router.push('/') : setIsLogin(true);
  };

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          mt: '4rem',
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack
            spacing={2}
            sx={{
              filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
              bgcolor: 'white',
              borderRadius: '12px',
              justifyContent: 'center',
              columnGap: 8,
              paddingY: 4,
              paddingX: 8,
            }}
          >
            <Typography
              variant="h6"
              align="center"
              color="primary.main"
              fontWeight="bold"
              sx={{ marginBottom: 2 }}
              fontSize={24}
            >
              {user
                ? isChangePreferredLanguage
                  ? 'Change Preferred Language'
                  : 'Change Password'
                : `PeerPrep ${isLogin ? 'Login' : 'Sign Up'}`}
            </Typography>
            {!user ? (
              <FormControl>
                <InputLabel
                  focused={isUsernameFocused}
                  variant="standard"
                  shrink
                >
                  Username
                </InputLabel>
                <TextField
                  name="username"
                  size="small"
                  value={username}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: 'black' }} fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setIsUsernameFocused(true)}
                  onBlur={() => setIsUsernameFocused(false)}
                  sx={{ mt: 2.75 }}
                />
              </FormControl>
            ) : (
              <></>
            )}
            {user && isChangePreferredLanguage ? (
              <></>
            ) : (
              <PasswordInput
                showPassword={showPassword}
                handleSwitchVisibility={handleSwitchPasswordVisibility}
                value={password}
                label={`${user ? 'Current ' : ''}Password`}
                handleChange={setPassword}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                isFocused={isPasswordFocused}
              />
            )}
            {user && !isChangePreferredLanguage ? (
              <PasswordInput
                showPassword={showNewPassword}
                handleSwitchVisibility={handleSwitchNewPasswordVisibility}
                value={newPassword}
                label="New Password"
                handleChange={setNewPassword}
                onFocus={() => setIsNewPasswordFocused(true)}
                onBlur={() => setIsNewPasswordFocused(false)}
                isFocused={isNewPasswordFocused}
              />
            ) : (
              <></>
            )}
            {(user && !isChangePreferredLanguage) || !isLogin ? (
              <PasswordInput
                showPassword={showConfirmPassword}
                handleSwitchVisibility={handleSwitchConfirmPasswordVisibility}
                value={confirmPassword}
                label={`Confirm ${user ? 'New ' : ''}Password`}
                handleChange={setConfirmPassword}
                onFocus={() => setIsConfirmPasswordFocused(true)}
                onBlur={() => setIsConfirmPasswordFocused(false)}
                isFocused={isConfirmPasswordFocused}
              />
            ) : (
              <></>
            )}
            {(user && isChangePreferredLanguage) || (!user && !isLogin) ? (
              <FormControl>
                <InputLabel
                  variant="standard"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: 1.25,
                  }}
                >
                  Preferred Language
                  <Tooltip title="You will be matched with others who have the same preferred language. Can be changed any time via profile page.">
                    <InfoIcon />
                  </Tooltip>
                </InputLabel>
                <Select
                  fullWidth
                  value={preferredLanguage}
                  onChange={(e) =>
                    setPreferredLanguage(e.target.value as LANGUAGE)
                  }
                  sx={{
                    textTransform: 'capitalize',
                    mt: 2.75,
                  }}
                  size="small"
                >
                  {Object.values(LANGUAGE).map((languageOption) => (
                    <MenuItem
                      key={languageOption}
                      value={languageOption}
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {languageOption.toLowerCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <></>
            )}
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: 'primary.main',
                filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
                borderRadius: '12px',
              }}
              style={{
                marginTop: '2rem',
              }}
            >
              {user ? 'Submit' : isLogin ? 'Login' : 'Register'}
            </Button>
            <Button
              variant="text"
              size="small"
              endIcon={<ArrowRightAltOutlinedIcon />}
              style={{
                color: 'black',
                textTransform: 'none',
                marginTop: '1rem',
                fontWeight: 'medium',
              }}
              onClick={handleSwitchMode}
            >
              {user
                ? isChangePreferredLanguage
                  ? 'Change your password'
                  : 'Change your preferred language'
                : isLogin
                ? 'Create your account'
                : 'Sign in instead'}
            </Button>
            {!user ? (
              <></>
            ) : (
              <Button
                variant="text"
                color="error"
                startIcon={<WarningIcon color="error" />}
                style={{
                  marginTop: '2rem',
                  textTransform: 'none',
                }}
                onClick={handleOpen}
              >
                Delete Account
              </Button>
            )}
          </Stack>
        </form>
      </Stack>
      <DeleteAccountPrompt
        open={open}
        handleClose={handleClose}
        handleDeleteAccount={handleDeleteAccount}
      />
    </>
  );
};

type Props = {
  showPassword: boolean;
  handleSwitchVisibility: () => void;
  value: string;
  label: string;
  handleChange: Dispatch<SetStateAction<string>>;
  onFocus: () => void;
  onBlur: () => void;
  isFocused: boolean;
};

const PasswordInput: FC<Props> = ({
  showPassword,
  handleSwitchVisibility,
  value,
  label,
  handleChange,
  onFocus,
  onBlur,
  isFocused,
}) => (
  <FormControl>
    <InputLabel variant="standard" shrink focused={isFocused}>
      {label}
    </InputLabel>
    <TextField
      name="password"
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
      }}
      onChange={(e) => handleChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      sx={{ mt: 2.75 }}
    />
  </FormControl>
);

export default AuthForm;
