import { Group } from 'src/models/group';
import { composeQuery } from 'src/utils/composeQuery';

import { NodesDto } from '../dtos/nodesDto';
import { ResponseDto } from '../dtos/responseDto';
import { TaskDto } from '../dtos/taskDto';
import { http } from '../http';
import { groupMapper } from '../mappers/groupMapper';
import { nodesMapper } from '../mappers/nodesMapper';

/** Task queries. */
namespace TaskQueries {

  /** Get all tasks query. */
  export function getTasks() {
    return `
    query {
      allTasks {
        nodes {
          id
          name
        }
      }
    }
  `;
  }

  /**
   * Get tasks by group id query.
   * @param groupId Group id.
   */
  export function getTasksByGroupId(groupId: Group['id']) {
    return `
      query {
        getTasksByGroupId(groupId: ${groupId}) {
          nodes {
            id
            name
          }
        }
      }
    `;
  }
}

/** Task API. */
export namespace TaskApi {

  /** Get groups. */
  export async function getTasks(): Promise<readonly TaskDto[]> {
    const result = await http.post<ResponseDto<NodesDto<TaskDto, 'allTasks'>>>(
      '',
      composeQuery(TaskQueries.getTasks()),
    );
    return nodesMapper.fromDto(result.data, groupMapper, 'allTasks');
  }

  /**
   * Get groups.
   * @param groupId Group id.
   */
  export async function getTasksByGroupId(groupId: Group['id']): Promise<readonly TaskDto[]> {
    const result = await http.post<ResponseDto<NodesDto<TaskDto, 'getTasksByGroupId'>>>(
      '',
      composeQuery(TaskQueries.getTasksByGroupId(groupId)),
    );
    return nodesMapper.fromDto(result.data, groupMapper, 'getTasksByGroupId');
  }

}
