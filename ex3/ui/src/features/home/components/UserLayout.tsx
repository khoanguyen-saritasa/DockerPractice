import { Container, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import { GroupActions } from 'src/store/group/dispatchers';
import { selectGroupByUserId } from 'src/store/group/selectors';
import { selectUser } from 'src/store/user/selectors';

import { TaskDetail } from '../pages/GroupDetailPage/components/TaskDetail';

import { TaskItem } from '../pages/GroupDetailPage/components/TaskItem';

export const UserLayout: FC = () => {
  const dispatch = useAppDispatch();
  const group = useAppSelector(selectGroupByUserId);
  const currentUser = useAppSelector(selectUser);

  useEffect(() => {
    if (currentUser == null) {
      return;
    }
    dispatch(GroupActions.getByUserId(currentUser.id));
  }, [currentUser, dispatch]);

  if (group == null) {
    return <></>;
  }

  return (
    <Container>
      <Stack py={2} gap={3}>
        <Typography variant="h3">Group: {group.name}</Typography>
        <Grid container gap={2}>
          {group.tasks.map(task => (
            <Grid item key={task.id}>
              <TaskItem
                shouldHideMenu
                task={task}
                isTaskAssigned={false}
              />
            </Grid>
          ))}
        </Grid>
        <TaskDetail/>
      </Stack>
    </Container>
  );
};
