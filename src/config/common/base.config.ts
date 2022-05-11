import * as dotenv from 'dotenv';

dotenv.config();

export class BaseConfig {
  constructor(private env: { [k: string]: string | undefined }) {}

  public getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (value === undefined && throwOnMissing) {
      throw new Error(`config error - mising env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }
}

const baseConfig = new BaseConfig(process.env);
export { baseConfig };
