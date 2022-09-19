import { Button, SxProps, Theme } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC, MouseEventHandler, ReactElement } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import useAuth from 'contexts/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  const router = useRouter();
  return (
    <nav
      style={{
        width: '100%',
        height: '64px',
        position: 'fixed',
        backgroundColor: 'white',
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
        icon={<HomeIcon />}
      />
      {user ? (
        <span style={{ display: 'flex', columnGap: 8 }}>
          <NavBarOption
            onClick={() => router.push('/match')}
            label="Find Match"
          />
          <NavBarOption
            onClick={logout}
            label="Log Out"
            styles={{ backgroundColor: '#ED8D8D' }}
          />
        </span>
      ) : (
        <NavBarOption
          onClick={() => router.push('/auth')}
          label="Log In"
          styles={{ backgroundColor: '#93DB9A' }}
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
