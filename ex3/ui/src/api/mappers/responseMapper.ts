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
    E extends IMapperFromDto<TDto, TModel>,
  >(response: TResponse, mapperSupport: E) {
    return mapperSupport.fromDto(response.data);
  }
}

export const responseMapper = new ResponseMapper();
