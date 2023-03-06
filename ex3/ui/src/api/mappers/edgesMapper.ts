import { EdgesDto } from '../dtos/edgesDto';
import { ResponseDto } from '../dtos/responseDto';

import { IMapperFromDto } from './mappers';

/** Response mapper. */
class EdgesMapper {

  /** @inheritdoc */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public fromDto<
    TDto,
    TModel,
    TQuery extends string,
    TResponse extends ResponseDto<EdgesDto<TDto, TQuery>>,
    TMapper extends IMapperFromDto<TDto, TModel>,
  >(response: TResponse, mapperSupport: TMapper, edgeName: TQuery): readonly TModel[] {
    return response.data[edgeName].edges.map(entity => mapperSupport.fromDto(entity.node));
  }
}

export const edgesMapper = new EdgesMapper();
