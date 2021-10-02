import * as Joi from 'joi';
import { Environment } from './environment.enum';
import { enumToArray } from './enumToArray';
import { ConfigModuleOptions } from '@nestjs/config';

const ENV_FILE_PATH = process.env.ENV_FILE_PATH || '.env';
export const SOCKET_PORT = 81;

export interface Config {
  NODE_ENV: Environment;
  HTTP_PORT: number;
  MARIADB_HOST: string;
  MARIADB_PORT: number;
  MARIADB_NAME: string;
  MARIADB_USER: string;
  MARIADB_PASS: string;
}

export const setupConfig: ConfigModuleOptions = {
  envFilePath: ENV_FILE_PATH,
  isGlobal: true,
  validationSchema: Joi.object<Config, true>({
    NODE_ENV: Joi.string()
      .valid(...enumToArray(Environment))
      .default(Environment.DEVELOPMENT),
    HTTP_PORT: Joi.number().port().default(80),
    MARIADB_HOST: Joi.string().hostname().required(),
    MARIADB_PORT: Joi.number().port().required(),
    MARIADB_NAME: Joi.string().required(),
    MARIADB_USER: Joi.string().required(),
    MARIADB_PASS: Joi.string().required(),
  }),
};
