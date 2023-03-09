
import { Vocabulary } from 'src/models/vocabulary';

import { VocabularyDto } from '../dtos/vocabularyDto';

import { IMapperFromDto } from './mappers';

/** Vocabulary mapper. */
class VocabularyMapper implements IMapperFromDto<VocabularyDto, Vocabulary> {
  /** @inheritdoc */
  public fromDto(dto: VocabularyDto): Vocabulary {
    return {
      id: dto.id,
      english: dto.english,
      vietnamese: dto.vietnamese,
      russian: dto.russian,
      taskId: dto.taskId,
      taskName: dto.taskName,
    };
  }
}

export const vocabularyMapper = new VocabularyMapper();
