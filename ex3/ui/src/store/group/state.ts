import { AppError } from 'src/models/appError';
import { Group } from 'src/models/group';

/** Group state. */
export interface GroupState {

  /** Whether group is in process or not. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: AppError;

  /** Groups. */
  readonly groups: readonly Group[];

  /** Group by ID. */
  readonly groupById: Group | null;

  /** Group by user ID. */
  readonly groupByUserId: Group | null;
}

export const initialState: GroupState = {
  isLoading: false,
  groups: [],
  groupById: null,
  groupByUserId: null,
};
