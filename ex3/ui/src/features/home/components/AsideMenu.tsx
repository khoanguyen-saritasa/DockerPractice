import { Button, List, ListItem } from '@mui/material';
import { Stack } from '@mui/system';
import { FC, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store';
import { GroupActions } from 'src/store/group/dispatchers';
import { selectGroups } from 'src/store/group/selectors';

export const AsideMenu: FC = () => {
  const params = useParams<{ groupId: string; }>();
  const dispatch = useAppDispatch();
  const groups = useAppSelector(selectGroups);

  useEffect(() => {
    dispatch(GroupActions.get());
  }, [dispatch]);

  return (
    <Stack component="aside" flex={0.2} paddingX={3} py={1}>
      <List>
        {groups.map(group => (
          <ListItem key={group.id}>
            <Button
              fullWidth
              variant={group.id === Number(params.groupId) ? 'contained' : 'text'}
              component={RouterLink}
              to={group.id.toString()}
            >
              {group.name}
            </Button>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};
