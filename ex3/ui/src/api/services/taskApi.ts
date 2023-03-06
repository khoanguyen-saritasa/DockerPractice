import { composeQuery } from 'src/utils/composeQuery';

import { NodesDto } from '../dtos/nodesDto';
import { ResponseDto } from '../dtos/responseDto';
import { TaskDto } from '../dtos/taskDto';
import { http } from '../http';
import { groupMapper } from '../mappers/groupMapper';
import { nodesMapper } from '../mappers/nodesMapper';

/** Task queries. */
namespace TaskQueries {

  /** Get groups query. */
  export function getTasks() {
    return `
    query MyQuery {
      allTasks {
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

}
