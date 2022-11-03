import { Logout } from '@mui/icons-material';
import {
  Avatar,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';
import useAuth from 'contexts/AuthContext';
import React, { FC } from 'react';

type Props = {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  handleProfile: () => void;
  handleLogout: () => void;
};

const AccountMenu: FC<Props> = ({
  open,
  anchorEl,
  handleClose,
  handleProfile,
  handleLogout,
}) => {
  const theme = useTheme();
  const { user } = useAuth();
  return (
    <Menu
      id="account-menu"
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={handleProfile}>
        <Avatar src={`data:image/svg+xml;base64,${user?.avatarImage}`} /> Edit
        Profile
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout} sx={{ color: theme.palette.error.main }}>
        <ListItemIcon>
          <Logout fontSize="small" color="error" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default AccountMenu;
