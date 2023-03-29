import { Task } from 'src/models/task';

import { NodesDto } from './nodesDto';

/** Group dto. */
export interface GroupDto {

  /** Id. */
  readonly id: number;

  /** Name. */
  readonly name: string;

  /** Tasks in group. */
  readonly groupTasksByGroupId: NodesDto<{

    /** Detail of tasks. */
    readonly taskByTaskId: Task;
  }>;
}
