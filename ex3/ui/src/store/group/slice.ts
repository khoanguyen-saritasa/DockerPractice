import { createSlice } from '@reduxjs/toolkit';
import { Group } from 'src/models/group';

import { GroupActions } from './dispatchers';

import { initialState } from './state';

export const groupSlide = createSlice({
  name: 'group',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(GroupActions.get, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(GroupActions.getSuccess, (state, action) => {
      state.groups = action.payload as Group[];
      state.isLoading = false;
    })
    .addCase(GroupActions.getFailure, (state, action) => {
      state.groups = [];
      state.error = action.payload;
      state.isLoading = false;
    }),

});
