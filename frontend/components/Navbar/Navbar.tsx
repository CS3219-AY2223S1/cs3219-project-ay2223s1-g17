import { FC, MouseEventHandler, ReactElement } from 'react';
import { useRouter } from 'next/router';
import useAuth from 'contexts/AuthContext';
import { NAVBAR_HEIGHT_PX } from 'utils/constants';
import { Login, Logout } from '@mui/icons-material';
import { Button, SxProps, Theme } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import JoinInnerIcon from '@mui/icons-material/JoinInner';

const Navbar = () => {
  const { user, logout } = useAuth();

  const router = useRouter();
  return (
    <nav
      style={{
        width: '100%',
        height: `${NAVBAR_HEIGHT_PX}px`,
        position: 'fixed',
        backgroundColor: 'inherit',
        top: 0,
        left: 0,
        zIndex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <NavBarOption
        onClick={() => router.push('/')}
        label="PeerPrep"
        // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
        icon={<img src={'/assets/logo.png'} style={{ height: '44px' }}></img>}
        styles={{
          fontFamily: 'Raleway',
          fontSize: 28,
          fontWeight: 'bold',
        }}
        variant="text"
        disableHoverEffect
      />
      {user ? (
        <span style={{ display: 'flex', columnGap: 8 }}>
          <NavBarOption
            onClick={() => router.push('/match')}
            icon={<JoinInnerIcon />}
            label="Find Match"
            styles={{ fontFamily: 'Raleway' }}
          />
          <NavBarOption
            onClick={() => router.push('/auth')}
            icon={<ManageAccountsIcon />}
            label="Account"
            styles={{ fontFamily: 'Raleway' }}
          />
          <NavBarOption
            onClick={logout}
            label="Log Out"
            icon={<Logout />}
            styles={{
              backgroundColor: '#C82323',
              color: '#FFFFFF',
              fontFamily: 'Raleway',

              fontWeight: 'bold',
            }}
          />
        </span>
      ) : (
        <NavBarOption
          onClick={() => router.push('/auth')}
          label="Log In"
          icon={<Login />}
          styles={{
            backgroundColor: '#2365C8',
            color: '#FFFFFF',
            fontFamily: 'Raleway',

            fontWeight: 'bold',
          }}
        />
      )}
    </nav>
  );
};

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  label: string;
  icon?: ReactElement;
  styles?: SxProps<Theme>;
  variant?: 'contained' | 'text' | 'outlined';
  disableHoverEffect?: boolean;
};

const NavBarOption: FC<Props> = ({
  onClick,
  icon,
  label,
  styles,
  disableHoverEffect,
  variant = 'contained',
}) => {
  return (
    <Button
      startIcon={icon}
      onClick={onClick}
      sx={{
        textTransform: 'none',
        ...styles,
        ...(disableHoverEffect
          ? {
              '&.MuiButtonBase-root:hover': {
                bgcolor: 'transparent',
              },
            }
          : {}),
      }}
      variant={variant}
    >
      {label}
    </Button>
  );
};

export default Navbar;
