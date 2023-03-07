import { CheckCircle, Send } from '@mui/icons-material';
import { Chip, Grid, Tooltip, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import { Task } from 'src/models/task';
import { useAppDispatch, useAppSelector } from 'src/store';
import { GroupActions } from 'src/store/group/dispatchers';
import { selectGroupById } from 'src/store/group/selectors';
import { TaskActions } from 'src/store/task/dispatchers';
import { selectTasks, selectTasksByGroupId } from 'src/store/task/selectors';

export const GroupDetailPage: FC = () => {
  const params = useParams<{ groupId: string; }>();
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const group = useAppSelector(selectGroupById);
  const tasksByGroup = useAppSelector(selectTasksByGroupId);

  useEffect(() => {
    dispatch(TaskActions.get());
  }, [dispatch]);

  useEffect(() => {
    if (params.groupId) {
      const groupId = Number(params.groupId);
      dispatch(GroupActions.getById(groupId));
      dispatch(TaskActions.getByGroupId(groupId));
    }
  }, [dispatch, params.groupId]);

  const isTaskAssigned = (task: Task) => tasksByGroup.map(_task => _task.id).includes(task.id);

  return (
    <Stack gap={3}>
      <Typography variant="h2">{group?.name}</Typography>
      <Grid container gap={2}>
        {tasks.map(task => (
          <Grid item key={task.id}>
            <Tooltip arrow title={ isTaskAssigned(task) ? '' : 'Click to send task'}>
              <Chip
                color={isTaskAssigned(task) ? 'success' : undefined}
                icon={isTaskAssigned(task) ? <CheckCircle fontSize='small' /> : <Send fontSize='small' />}
                clickable
                label={task.name}
              />
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
