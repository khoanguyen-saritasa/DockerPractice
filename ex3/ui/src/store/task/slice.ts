import { createSlice } from '@reduxjs/toolkit';
import { Task } from 'src/models/task';

import { TaskActions } from './dispatchers';
import { initialState } from './state';

export const taskSlide = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(TaskActions.get, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(TaskActions.getSuccess, (state, action) => {
      state.tasks = action.payload as Task[];
      state.isLoading = false;
    })
    .addCase(TaskActions.getFailure, (state, action) => {
      state.tasks = [];
      state.error = action.payload;
      state.isLoading = false;
    })

    .addCase(TaskActions.removeFromGroup, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(TaskActions.removeFromGroupSuccess, state => {
      state.isLoading = false;
    })
    .addCase(TaskActions.removeFromGroupFailure, state => {
      state.isLoading = false;
    })

    .addCase(TaskActions.addToGroup, state => {
      state.isLoading = true;
    })
    .addCase(TaskActions.addToGroupSuccess, state => {
      state.isLoading = false;
    })
    .addCase(TaskActions.addToGroupFailure, state => {
      state.isLoading = false;
    })

    .addCase(TaskActions.getByGroupId, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(TaskActions.getByGroupIdSuccess, (state, action) => {
      state.tasksByGroupId = action.payload as Task[];
      state.isLoading = false;
    })
    .addCase(TaskActions.getByGroupIdFailure, (state, action) => {
      state.tasksByGroupId = [];
      state.error = action.payload;
      state.isLoading = false;
    }),

});
