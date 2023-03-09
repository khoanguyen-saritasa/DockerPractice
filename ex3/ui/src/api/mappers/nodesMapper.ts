import { NodesDto } from '../dtos/nodesDto';
import { ResponseDto } from '../dtos/responseDto';

import { IMapperFromDto } from './mappers';

/** Nodes mapper. */
class NodesMapper {
  /** @inheritdoc */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public fromDto<TDto, TModel, TQuery extends string>(
    response: ResponseDto<TQuery, NodesDto<TDto>>,
    mapperSupport: IMapperFromDto<TDto, TModel>,
    nodeName: TQuery,
  ): readonly TModel[] {
    return response.data[nodeName].nodes.map(entityDto => mapperSupport.fromDto(entityDto));
  }
}

export const nodesMapper = new NodesMapper();
