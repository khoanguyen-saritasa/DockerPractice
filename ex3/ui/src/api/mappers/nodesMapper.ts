import { NodesDto } from '../dtos/nodesDto';
import { ResponseDto } from '../dtos/responseDto';

import { IMapperFromDto } from './mappers';

/** Nodes mapper. */
class NodesMapper {

  /** @inheritdoc */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public fromDto<
    TDto,
    TModel,
    TQuery extends string,
    TResponse extends ResponseDto<TQuery, NodesDto<TDto>>,
    TMapper extends IMapperFromDto<TDto, TModel>,
  >(response: TResponse, mapperSupport: TMapper, nodeName: TQuery): readonly TModel[] {
    return response.data[nodeName].nodes.map(entityDto => mapperSupport.fromDto(entityDto));
  }
}

export const nodesMapper = new NodesMapper();
