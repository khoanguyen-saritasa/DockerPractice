import { createSlice } from '@reduxjs/toolkit';
import { Vocabulary } from 'src/models/vocabulary';

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
      state.vocabulariesByTaskId = action.payload as Vocabulary[];
      state.isLoading = false;
    })
    .addCase(VocabularyActions.getByTaskIdFailure, (state, action) => {
      state.vocabulariesByTaskId = [];
      state.error = action.payload;
      state.isLoading = false;
    }),

});
