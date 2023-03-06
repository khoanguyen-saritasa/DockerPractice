import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const selectGroups = createSelector(
  (state: RootState) => state.group.groups,
  groups => groups,
);

export const selectGroupsIsLoading = createSelector(
  (state: RootState) => state.group.isLoading,
  isLoading => isLoading,
);
