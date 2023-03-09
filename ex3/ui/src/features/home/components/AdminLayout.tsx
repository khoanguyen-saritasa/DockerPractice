import { Stack } from '@mui/material';
import { FC } from 'react';

import { AsideMenu } from './AsideMenu';
import { Main } from './Main';

export const AdminLayout: FC = () => (
  <Stack direction="row" gap="10px">
    <AsideMenu />
    <Main />
  </Stack>
);
