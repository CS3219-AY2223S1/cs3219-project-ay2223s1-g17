/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { MouseEvent, useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from 'contexts/AuthContext';
import { NAVBAR_HEIGHT_PX } from 'utils/constants';
import { Handshake, Login } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Matchmaking from 'components/Matchmaking';
import { useMatchingContext } from 'contexts/MatchingContext';
import LeaveRoomPrompt from './LeaveRoomPrompt';
import AccountMenu from './AccountMenu';
import NavbarOption from './NavbarOption';
import Stopwatch from 'components/Stopwatch';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isMatching, roomId, leaveRoom } = useMatchingContext();
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
          icon={
            <img
              src={'/assets/logo.png'}
              style={{ height: `${(NAVBAR_HEIGHT_PX * 3) / 4}px` }}
            ></img>
          }
          styles={{
            fontSize: 28,
            fontWeight: 500,
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
        {user && (isMatching || !['/', '/match'].includes(router.asPath)) ? (
          <Matchmaking />
        ) : (
          <></>
        )}
        {user ? (
          <>
            <Stack
              flexDirection="row"
              columnGap={2}
              sx={{ position: 'absolute', my: 'auto', right: 12 }}
            >
              <Stopwatch />
              <NavbarOption
                onClick={() => router.push('/match')}
                label="Find Match"
                icon={<Handshake />}
                styles={{
                  display: isMatching || roomId ? 'none' : 'auto',
                }}
              />
              <IconButton
                onClick={handleOpen}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                sx={{ display: roomId ? 'none' : 'auto' }}
              >
                <ManageAccountsIcon />
              </IconButton>
            </Stack>
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
            onClick={() => router.push('/auth?mode=login')}
            label="Login"
            icon={<Login />}
            styles={{
              color: '#FFFFFF',
              fontFamily: 'Raleway',
              position: 'absolute',
              my: 'auto',
              right: 12,
            }}
          />
        )}
      </Stack>
    </nav>
  );
};

export default Navbar;
