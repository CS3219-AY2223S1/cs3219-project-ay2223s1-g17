import { Skeleton, Stack, SxProps } from '@mui/material';
import React, { FC, ReactNode } from 'react';

export type LoadingWrapperProps = {
  children: ReactNode;
  isLoading: boolean;
  variant?: 'rectangular' | 'text' | 'rounded' | 'circular';
  styles?: SxProps;
  custom?: boolean;
  repeat?: number;
};

const LoadingWrapper: FC<LoadingWrapperProps> = ({
  children,
  isLoading,
  variant,
  styles,
  custom,
  repeat,
}) => {
  return isLoading ? (
    custom ? (
      <Stack rowGap={1}>
        {Array.from(Array(repeat ?? 1).keys()).map((num) => {
          return (
            <Skeleton
              key={`loading-${num}`}
              variant={variant}
              sx={{ width: '100%', height: '2rem', ...styles }}
            />
          );
        })}
      </Stack>
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
