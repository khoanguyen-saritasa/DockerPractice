import { ResponseDto } from '../dtos/responseDto';

import { IMapperFromDto } from './mappers';

/** Response mapper. */
class ResponseMapper {

  /** @inheritdoc */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public fromDto<
    TDto,
    TModel,
    TQuery extends string,
    TResponse extends ResponseDto<TQuery, TDto>,
    TMapper extends IMapperFromDto<TDto, TModel>,
  >(response: TResponse, mapperSupport: TMapper, nodeName: TQuery): TModel {
    return mapperSupport.fromDto(response.data[nodeName]);
  }
}

export const responseMapper = new ResponseMapper();
