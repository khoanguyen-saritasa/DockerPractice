import { ResponseDto } from '../dtos/responseDto';

import { IMapperFromDto } from './mappers';

/** Response mapper. */
class ResponseMapper {

  /** @inheritdoc */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public fromDto<
    TDto,
    TModel,
    TResponse extends ResponseDto<TDto>,
    TMapper extends IMapperFromDto<TDto, TModel>,
  >(response: TResponse, mapperSupport: TMapper): TModel {
    return mapperSupport.fromDto(response.data);
  }
}

export const responseMapper = new ResponseMapper();
