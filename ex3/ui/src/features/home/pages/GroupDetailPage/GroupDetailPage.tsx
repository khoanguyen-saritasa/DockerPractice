import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from 'src/store';
import { TaskActions } from 'src/store/task/dispatchers';
import { selectTasks } from 'src/store/task/selectors';

export const GroupDetailPage: FC = () => {
  const params = useParams<{ groupId: string; }>();
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);

  useEffect(() => {
    dispatch(TaskActions.get());
  }, [dispatch]);

  useEffect(() => {
    if (params.groupId) {
      dispatch(TaskActions.getByGroupId(Number(params.groupId)));
    }
  }, [dispatch, params.groupId]);

  return (
    <Stack>
      {tasks.map(task => (
        <Typography key={task.id}>{task.name}</Typography>
      ))}
    </Stack>
  );
};
