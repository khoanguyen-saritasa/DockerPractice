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
    TResponse extends ResponseDto<NodesDto<TDto, TQuery>>,
    TMapper extends IMapperFromDto<TDto, TModel>,
  >(response: TResponse, mapperSupport: TMapper, edgeName: TQuery): readonly TModel[] {
    return response.data[edgeName].nodes.map(entityDto => mapperSupport.fromDto(entityDto));
  }
}

export const nodesMapper = new NodesMapper();
