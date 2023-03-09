import { FC, memo } from 'react';
import { useAppSelector } from 'src/store';
import { selectUser } from 'src/store/user/selectors';

import { AdminLayout } from '../components/AdminLayout';
import { UserLayout } from '../components/UserLayout';

const HomePageComponent: FC = () => {
  const currentUser = useAppSelector(selectUser);

  if (currentUser == null) {
    return <></>;
  }

  if (currentUser.isAdmin) {
    return <AdminLayout />;
  }

  return <UserLayout />;
};

export const HomePage = memo(HomePageComponent);
