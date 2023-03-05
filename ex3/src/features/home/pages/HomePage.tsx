import { Stack } from '@mui/system';
import { FC, memo } from 'react';

import { AsideMenu } from '../components/AsideMenu';
import { Main } from '../components/Main';

const HomePageComponent: FC = () => (
  <Stack direction="row" gap="10px">
    <AsideMenu />
    <Main/>
  </Stack>
);

export const HomePage = memo(HomePageComponent);
