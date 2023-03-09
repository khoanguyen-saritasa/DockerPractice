import { AppError } from 'src/models/appError';
import { Task } from 'src/models/task';

/** Task state. */
export interface TaskState {

  /** Whether group is in process or not. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: AppError;

  /** Tasks. */
  readonly tasks: readonly Task[];

  /** Tasks. */
  readonly tasksByGroupId: readonly Task[];
}

export const initialState: TaskState = {
  isLoading: false,
  tasks: [],
  tasksByGroupId: [],
};
