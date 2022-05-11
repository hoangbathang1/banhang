import * as dotenv from 'dotenv';
import { BaseConfig } from '.';
import file from './file.config';

dotenv.config();

class Configurations extends BaseConfig {
  public toObject() {
    return {
      jwtSecrect: this.getValue('JWT_SECRET'),
      file: file,
    };
  }
}

const configurations = new Configurations(process.env).ensureValues([
  'JWT_SECRET',
]);

export { configurations };
