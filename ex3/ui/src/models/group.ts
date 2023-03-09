import { Task } from './task';

/** Group. */
export interface Group {

  /** Id. */
  readonly id: number;

  /** Name. */
  readonly name: string;

  /** Tasks included in group. */
  readonly tasks: readonly Task[];
}
