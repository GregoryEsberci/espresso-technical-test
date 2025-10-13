import { mapKeys, snakeCase } from 'lodash';
import { espressoBankingService } from './espresso-banking';
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

  async listAll(params: Omit<ListParams, 'page' | 'limit'>) {
    const statements = [];
    const limit = 1000;
    let page = 1;
    let totalPages = 1;

    // Poderia usar Promise.all depois da primeira request mas achei melhor fazer sequencial pra não sobrecarregar a api
    while (page <= totalPages) {
      const { data, metadata } = await statementService.list({
        ...params,
        page,
        limit,
      });

      page++;
      totalPages = metadata.pages;
      statements.push(...data);
    }

    return statements;
  }
}

type ListParams = {
  startDate?: string;
  endDate?: string;
  productType?: StatementProductType;
  page?: number;
  limit?: number;
};

export const statementService = new StatementService();
