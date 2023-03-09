import { createSlice } from '@reduxjs/toolkit';
import { createDraft } from 'immer';

import { VocabularyActions } from './dispatchers';
import { initialState } from './state';

export const vocabularySlide = createSlice({
  name: 'vocabulary',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(VocabularyActions.getByTaskId, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(VocabularyActions.getByTaskIdSuccess, (state, action) => {
      state.vocabulariesByTaskId = createDraft(action.payload);
      state.isLoading = false;
    })
    .addCase(VocabularyActions.getByTaskIdFailure, (state, action) => {
      state.vocabulariesByTaskId = [];
      state.error = action.payload;
      state.isLoading = false;
    }),

});
