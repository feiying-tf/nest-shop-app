import * as joi from 'joi'
export const configSchemaValidator = joi.object({
  DB_HOST: joi.string().default('localhost'),
  DB_PORT: joi.number().default(5432),
  DB_USERNAME: joi.string().default('postgres'),
  DB_PASSWORD: joi.string().default('a462787828'),
  DB_DATABASE: joi.string().default('shop'),
  DB_SYNC: joi.boolean().default(true),
})
