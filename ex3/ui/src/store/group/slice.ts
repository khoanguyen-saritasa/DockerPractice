import { createSlice } from '@reduxjs/toolkit';
import { createDraft } from 'immer';

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
      state.groups = createDraft(action.payload);
      state.isLoading = false;
    })
    .addCase(GroupActions.getFailure, (state, action) => {
      state.groups = [];
      state.error = action.payload;
      state.isLoading = false;
    })

    .addCase(GroupActions.getById, state => {
      state.isLoading = true;
    })
    .addCase(GroupActions.getByIdSuccess, (state, action) => {
      state.groupById = createDraft(action.payload);
      state.isLoading = false;
    })
    .addCase(GroupActions.getByIdFailure, (state, action) => {
      state.groupById = null;
      state.error = action.payload;
      state.isLoading = false;
    }),
});
