import { Task } from 'src/models/task';
import { composeQuery } from 'src/utils/composeQuery';

import { NodesDto } from '../dtos/nodesDto';
import { ResponseDto } from '../dtos/responseDto';
import { VocabularyDto } from '../dtos/vocabularyDto';
import { http } from '../http';
import { nodesMapper } from '../mappers/nodesMapper';
import { vocabularyMapper } from '../mappers/vocabularyMapper';

/** Vocabulary queries. */
namespace VocabularyQueries {

  /**
   * Get vocabularies by task id query.
   * @param taskId Task id.
   */
  export function getVocabulariesByTaskId(taskId: Task['id']) {
    return `
      query {
        getVocabulariesByTaskId(taskId: ${taskId}) {
          nodes {
            id
            taskName
            vietnamese
            taskId
            russian
            english
          }
        }
      }
    `;
  }

}

/** Vocabulary API. */
export namespace VocabularyApi {

  /**
   * Get groups.
   * @param taskId Task id.
   */
  export async function getVocabulariesByTaskId(taskId: Task['id']): Promise<readonly VocabularyDto[]> {
    const result = await http.post<ResponseDto<'getVocabulariesByTaskId', NodesDto<VocabularyDto>>>(
      '',
      composeQuery(VocabularyQueries.getVocabulariesByTaskId(taskId)),
    );
    return nodesMapper.fromDto(result.data, vocabularyMapper, 'getVocabulariesByTaskId');
  }

}
