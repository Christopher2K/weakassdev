import { string } from '@ioc:Adonis/Core/Helpers';
import { SimplePaginatorMetaKeys } from '@ioc:Adonis/Lucid/Database';
import { LucidModel, SnakeCaseNamingStrategy } from '@ioc:Adonis/Lucid/Orm';

export class CustomNamingStrategy extends SnakeCaseNamingStrategy {
  public tableName(model: LucidModel): string {
    return string.capitalCase(model.name).split(' ').join('');
  }

  public serializedName(_model: LucidModel, attributeName: string): string {
    return string.camelCase(attributeName);
  }

  public paginationMetaKeys(): SimplePaginatorMetaKeys {
    return {
      total: 'total',
      perPage: 'perPage',
      currentPage: 'currentPage',
      lastPage: 'lastPage',
      firstPage: 'firstPage',
      firstPageUrl: 'firstPageUrl',
      lastPageUrl: 'lastPageUrl',
      nextPageUrl: 'nextPageUrl',
      previousPageUrl: 'previousPageUrl',
    };
  }
}
