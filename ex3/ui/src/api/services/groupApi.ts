import { Group } from 'src/models/group';
import { User } from 'src/models/user';
import { composeQuery } from 'src/utils/composeQuery';

import { GroupDto } from '../dtos/groupDto';
import { NodesDto } from '../dtos/nodesDto';
import { ResponseDto } from '../dtos/responseDto';
import { http } from '../http';
import { groupMapper } from '../mappers/groupMapper';
import { nodesMapper } from '../mappers/nodesMapper';
import { responseMapper } from '../mappers/responseMapper';

/** Group queries. */
namespace GroupQueries {

  /** Get groups query. */
  export function getGroups() {
    return `
      query {
        allGroups {
          nodes {
            id
            name
          }
        }
      }
    `;
  }

  /**
   * Get group by id query.
   * @param groupId Group id.
   */
  export function getGroupById(groupId: Group['id']) {
    return `
      query {
        groupById(id: ${groupId}) {
          id
          name
        }
      }
    `;
  }

  /**
   * Get group by user id.
   * @param userId  User id.
   */
  export function getGroupByUserId(userId: User['id']) {
    return `
    query {
      getGroupByUserId(userId: ${userId}) {
        id
        name
        groupTasksByGroupId {
          nodes {
            taskByTaskId {
              id
              name
            }
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
  export async function getGroups(): Promise<readonly Group[]> {
    const result = await http.post<ResponseDto<'allGroups', NodesDto<GroupDto>>>(
      '',
      composeQuery(GroupQueries.getGroups()),
    );
    return nodesMapper.fromDto(result.data, groupMapper, 'allGroups');
  }

  /**
   * Get group by ID.
   * @param groupId Group id.
   */
  export async function getGroupById(groupId: Group['id']): Promise<Group> {
    const result = await http.post<ResponseDto<'groupById', GroupDto>>(
      '',
      composeQuery(GroupQueries.getGroupById(groupId)),
    );
    return responseMapper.fromDto(result.data, groupMapper, 'groupById');
  }

  /**
   * Get group by user ID.
   * @param userId User id.
   */
  export async function getGroupByUserId(userId: User['id']): Promise<Group> {
    const result = await http.post<ResponseDto<'getGroupByUserId', GroupDto>>(
      '',
      composeQuery(GroupQueries.getGroupByUserId(userId)),
    );
    return responseMapper.fromDto(result.data, groupMapper, 'getGroupByUserId');
  }

}
