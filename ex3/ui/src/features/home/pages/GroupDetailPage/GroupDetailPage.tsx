import { Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import { Task } from 'src/models/task';
import { useAppDispatch, useAppSelector } from 'src/store';
import { GroupActions } from 'src/store/group/dispatchers';
import { selectGroupById } from 'src/store/group/selectors';
import { TaskActions } from 'src/store/task/dispatchers';
import { selectTasks, selectTasksByGroupId } from 'src/store/task/selectors';

import { TaskDetail } from './components/TaskDetail';

import { TaskItem } from './components/TaskItem';

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

  const handleTaskClick = (task: Task) => {
    if (params.groupId == null) {
      return;
    }
    if (isTaskAssigned(task)) {
      dispatch(TaskActions.removeFromGroup({ taskId: task.id, groupId: Number(params.groupId) }));
      return;
    }
    dispatch(TaskActions.addToGroup({ taskId: task.id, groupId: Number(params.groupId) }));
  };

  if (group == null) {
    return <Typography>Please choose an group to assign homework.</Typography>;
  }

  return (
    <Stack gap={3}>
      <Typography variant="h2">{group?.name}</Typography>
      <Grid container gap={2}>
        {tasks.map(task => (
          <Grid item key={task.id}>
            <TaskItem isTaskAssigned={isTaskAssigned(task)} onTaskClick={handleTaskClick} task={task}/>
          </Grid>
        ))}
      </Grid>
      <TaskDetail/>
    </Stack>
  );
};
