import { Group } from 'src/models/group';

import { GroupDto } from '../dtos/groupDto';

import { IMapperFromDto } from './mappers';

/** Group mapper. */
class GroupMapper implements IMapperFromDto<GroupDto, Group> {
  /** @inheritdoc */
  public fromDto(dto: GroupDto): Group {
    return {
      id: dto.id,
      name: dto.name,
      tasks: dto.groupTasksByGroupId ? dto.groupTasksByGroupId.nodes.map(task => task.taskByTaskId) : [],
    };
  }
}

export const groupMapper = new GroupMapper();
