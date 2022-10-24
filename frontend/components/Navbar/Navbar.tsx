import { MouseEvent, useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from 'contexts/AuthContext';
import { NAVBAR_HEIGHT_PX } from 'utils/constants';
import { Login } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Matchmaking from 'components/Matchmaking';
import { useMatchingContext } from 'contexts/MatchingContext';
import LeaveRoomPrompt from './LeaveRoomPrompt';
import AccountMenu from './AccountMenu';
import NavbarOption from './NavbarOption';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { leaveRoom } = useMatchingContext();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [openPrompt, setOpenPrompt] = useState(false);

  const handleOpen = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleProfile = () => {
    router.push('/auth');
  };

  const handleHome = () => {
    if (router.asPath !== '/room') return router.push('/');

    setOpenPrompt(true);
  };

  const handleClosePrompt = () => {
    setOpenPrompt(false);
  };

  const handleLeave = () => {
    leaveRoom();
    handleClosePrompt();
  };

  return (
    <nav
      style={{
        width: '100%',
        height: `${NAVBAR_HEIGHT_PX}px`,
        position: 'fixed',
        backgroundColor: 'white',
        top: 0,
        left: 0,
        zIndex: 1,
      }}
    >
      <Stack
        sx={{
          width: '100%',
          height: `${NAVBAR_HEIGHT_PX}px`,
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <NavbarOption
          onClick={handleHome}
          label="PeerPrep"
          // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
          icon={<img src={'/assets/logo.png'} style={{ height: '44px' }}></img>}
          styles={{
            fontFamily: 'Raleway',
            fontSize: 28,
            fontWeight: 'bold',
            position: 'absolute',
            top: 0,
            left: 12,
          }}
          variant="text"
          disableHoverEffect
        />
        <LeaveRoomPrompt
          open={openPrompt}
          handleClose={handleClosePrompt}
          handleLeave={handleLeave}
        />
        {user ? <Matchmaking /> : <></>}
        {user ? (
          <>
            <IconButton
              onClick={handleOpen}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              sx={{ position: 'absolute', right: 12, my: 'auto' }}
            >
              <ManageAccountsIcon />
            </IconButton>
            <AccountMenu
              open={open}
              anchorEl={anchorEl}
              handleClose={handleClose}
              handleProfile={handleProfile}
              handleLogout={handleLogout}
            />
          </>
        ) : (
          <NavbarOption
            onClick={() => router.push('/auth')}
            label="Login"
            icon={<Login />}
            styles={{
              color: '#FFFFFF',
              fontFamily: 'Raleway',
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          />
        )}
      </Stack>
    </nav>
  );
};

export default Navbar;
