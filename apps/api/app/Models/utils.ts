import { string } from '@ioc:Adonis/Core/Helpers';
import { LucidModel, SnakeCaseNamingStrategy } from '@ioc:Adonis/Lucid/Orm';

export class CustomNamingStrategy extends SnakeCaseNamingStrategy {
  public tableName(model: LucidModel): string {
    return string.capitalCase(model.name);
  }
}
