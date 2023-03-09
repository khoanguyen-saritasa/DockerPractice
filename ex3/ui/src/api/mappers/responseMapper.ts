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
  >(response: ResponseDto<TQuery, TDto>, mapperSupport: IMapperFromDto<TDto, TModel>, nodeName: TQuery): TModel {
    return mapperSupport.fromDto(response.data[nodeName]);
  }
}

export const responseMapper = new ResponseMapper();
