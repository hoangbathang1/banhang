import { BaseConfig } from '../../common/base.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export class TypeormDatabaseConfig extends BaseConfig {
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: this.getValue('DB_TYPE') as any,
      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USER'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_DATABASE'),
      entities: [join(__dirname, '../../..', 'modules/**/*.entity.{ts,js}')],
      migrationsTableName: 'migration',
      migrations: [join(__dirname, '../../..', 'migration/*.{ts,js}')],
      synchronize: true,
      cli: {
        migrationsDir: 'src/migration',
      },
      // subscribers: [
      //   join(__dirname, '../../..', 'modules/**/*.subscriber.{ts,js}'),
      // ],
      //   ssl: this.getSsl() ? { rejectUnauthorized: false } : false,
    };
  }
}

export const typeormConfig = new TypeormDatabaseConfig(
  process.env,
).ensureValues([
  'DB_TYPE',
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASSWORD',
  'DB_DATABASE',
]);
