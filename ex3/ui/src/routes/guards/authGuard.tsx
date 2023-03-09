import { FC } from 'react';
import {
  Navigate, Outlet, To, useLocation, useSearchParams,
} from 'react-router-dom';
import { useAppSelector } from 'src/store';
import { selectUser } from 'src/store/user/selectors';

export const AuthGuard: FC = () => {
  const user = useAppSelector(selectUser);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const redirect: To = {
    pathname: 'login',
    search: new URLSearchParams({ ...Object.fromEntries(searchParams.entries()), next: location.pathname }).toString(),
  };

  if (!user) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
