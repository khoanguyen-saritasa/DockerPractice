
import { Task } from 'src/models/task';

import { TaskDto } from '../dtos/taskDto';

import { IMapperFromDto } from './mappers';

/** Task mapper. */
class TaskMapper implements IMapperFromDto<TaskDto, Task> {
  /** @inheritdoc */
  public fromDto(dto: TaskDto): Task {
    return {
      id: dto.id,
      name: dto.name,
    };
  }
}

export const taskMapper = new TaskMapper();
