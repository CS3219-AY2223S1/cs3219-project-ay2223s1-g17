import { SxProps, Button, Theme } from '@mui/material';
import React, { FC, MouseEventHandler, ReactElement } from 'react';

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  label: string;
  icon?: ReactElement;
  styles?: SxProps<Theme>;
  variant?: 'contained' | 'text' | 'outlined';
  disableHoverEffect?: boolean;
};

const NavbarOption: FC<Props> = ({
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

export default NavbarOption;
