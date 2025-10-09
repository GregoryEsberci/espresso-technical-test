import { mapKeys, snakeCase } from 'lodash';
import espressoBankingService from './espresso-banking';
import { StatementType, StatementProductType } from '../types/statement';
import { ApiResponse } from '../types/metadata';

class StatementService {
  readonly PATH = 'statements';

  async list(params: ListParams = {}) {
    const parsedParams = mapKeys(params, (_value, key) => snakeCase(key));

    const { data } = await espressoBankingService.get<
      ApiResponse<StatementType[]>
    >(this.PATH, { params: parsedParams });

    return data;
  }
}

type ListParams = {
  startData?: Date;
  endData?: Date;
  productType?: StatementProductType;
  page?: number;
  limit?: number;
};

export default new StatementService();
