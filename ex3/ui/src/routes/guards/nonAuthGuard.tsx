import { FC } from 'react';
import { Navigate, Outlet, To, useSearchParams } from 'react-router-dom';
import { useAppSelector } from 'src/store';
import { selectUser } from 'src/store/user/selectors';

export const NonAuthGuard: FC = () => {
  const user = useAppSelector(selectUser);
  const [search] = useSearchParams();
  const searchParams = Object.fromEntries(search.entries());
  if (user != null) {
    // Disable eslint for the usage of destructuring to omit "next" out of search params.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { next = '', ...paramsWithoutNext } = searchParams;
    const redirect: To = {
      pathname: search.get('next') ?? '',
      search: new URLSearchParams(paramsWithoutNext).toString(),
    };

    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
