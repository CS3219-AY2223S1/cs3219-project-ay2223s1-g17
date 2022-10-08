import { FC, MouseEventHandler, ReactElement } from 'react';
import { useRouter } from 'next/router';
import useAuth from 'contexts/AuthContext';
import { NAVBAR_HEIGHT_PX } from 'utils/constants';
import { Login, Logout } from '@mui/icons-material';
import { Button, SxProps, Theme } from '@mui/material';

const Navbar = () => {
  const { user, logout } = useAuth();

  const router = useRouter();
  return (
    <nav
      style={{
        width: '100%',
        height: `${NAVBAR_HEIGHT_PX}px`,
        position: 'fixed',
        background: 'linear-gradient(45deg, #2370C8, #BFFFBE)',
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
          color: '#FFFFFF',
          fontFamily: 'Raleway',
          fontSize: 28,
          fontWeight: 'bold',
        }}
      />
      {user ? (
        <span style={{ display: 'flex', columnGap: 8 }}>
          <NavBarOption
            onClick={() => router.push('/match')}
            label="Find Match"
            styles={{ fontFamily: 'Raleway' }}
          />
          <NavBarOption
            onClick={() => router.push('/editor')}
            label="Try Code Editor"
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
  icon?: ReactElement;
  label: string;
  styles?: SxProps<Theme>;
};

const NavBarOption: FC<Props> = ({ onClick, icon, label, styles }) => {
  return (
    <Button
      startIcon={icon}
      onClick={onClick}
      sx={{ textTransform: 'none', color: 'black', ...styles }}
    >
      {label}
    </Button>
  );
};

export default Navbar;
