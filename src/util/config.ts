import * as Joi from 'joi';
import { Environment } from './environment.enum';
import { enumToArray } from './enumToArray';

const ENV_FILE_PATH = process.env.ENV_FILE_PATH || '.env';

export interface Config {
  NODE_ENV: Environment;
  PORT: number;
}

export const setupConfig = {
  envFilePath: ENV_FILE_PATH,
  validationSchema: Joi.object<Config, true>({
    NODE_ENV: Joi.string()
      .valid(...enumToArray(Environment))
      .default(Environment.DEVELOPMENT),
    PORT: Joi.number().port().default(80),
  }),
};
