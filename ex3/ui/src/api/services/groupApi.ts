import { composeQuery } from 'src/utils/composeQuery';

import { EdgesDto } from '../dtos/edgesDto';
import { GroupDto } from '../dtos/groupDto';
import { ResponseDto } from '../dtos/responseDto';
import { http } from '../http';
import { edgesMapper } from '../mappers/edgesMapper';
import { groupMapper } from '../mappers/groupMapper';

/** Auth queries. */
namespace GroupQueries {

  /** Get groups query. */
  export function getGroups() {
    return `
    query MyQuery {
      allGroups {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `;
  }
}

/** Group API. */
export namespace GroupApi {

  /** Get groups. */
  export async function getGroups(): Promise<readonly GroupDto[]> {
    const result = await http.post<ResponseDto<EdgesDto<GroupDto, 'allGroups'>>>(
      '',
      composeQuery(GroupQueries.getGroups()),
    );
    return edgesMapper.fromDto(result.data, groupMapper, 'allGroups');
  }

}
