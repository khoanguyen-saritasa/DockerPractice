import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const selectVocabulariesByByTaskId = createSelector(
  (state: RootState) => state.vocabulary.vocabulariesByTaskId,
  vocabulariesByTaskId => vocabulariesByTaskId,
);
