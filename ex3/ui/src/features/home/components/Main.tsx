import { Stack } from '@mui/material';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const Main: FC = () => (
  <Stack component="main" flex={0.8} p={3}>
    <Outlet />
  </Stack>
);
