import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const selectTasks = createSelector(
  (state: RootState) => state.task.tasks,
  tasks => tasks,
);

export const selectTasksIsLoading = createSelector(
  (state: RootState) => state.task.isLoading,
  isLoading => isLoading,
);
