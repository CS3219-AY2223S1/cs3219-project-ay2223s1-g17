import { Skeleton, SxProps } from '@mui/material';
import React, { FC, ReactNode } from 'react';

export type LoadingWrapperProps = {
  children: ReactNode;
  isLoading: boolean;
  variant?: 'rectangular' | 'text' | 'rounded' | 'circular';
  styles?: SxProps;
  custom?: boolean;
};

const LoadingWrapper: FC<LoadingWrapperProps> = ({
  children,
  isLoading,
  variant,
  styles,
  custom,
}) => {
  return isLoading ? (
    custom ? (
      <Skeleton
        variant={variant}
        sx={{ width: '100%', height: '2rem', ...styles }}
      />
    ) : (
      <Skeleton variant={variant} sx={{ ...styles }}>
        {children}
      </Skeleton>
    )
  ) : (
    <>{children}</>
  );
};

export default LoadingWrapper;
