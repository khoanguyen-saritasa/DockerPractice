import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const selectGroups = createSelector(
  (state: RootState) => state.group.groups,
  groups => groups,
);

export const selectGroupById = createSelector(
  (state: RootState) => state.group.groupById,
  group => group,
);

export const selectGroupByUserId = createSelector(
  (state: RootState) => state.group.groupByUserId,
  group => group,
);

export const selectGroupsIsLoading = createSelector(
  (state: RootState) => state.group.isLoading,
  isLoading => isLoading,
);
