import dotenv from "dotenv";

dotenv.config();

const { DB_DEV_NAME, DB_USER_NAME, DB_PASSWORD, DB_HOST } = process.env;
const dialect = "postgres";

export default {
  development: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DEV_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect,
    logging: false,
  },
  test: {
    username: DB_USER_NAME,
    password: DB_PASSWORD,
    database: process.env.DB_TEST_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false,
    dialect,
  },
  production: {
    username: process.env.PRODUCTION_USERNAME,
    password: process.env.PRODUCTION_PASSWORD,
    database: process.env.PRODUCTION_DATABASE,
    host: process.env.PRODUCTION_HOST,
    port: process.env.PRODUCTION_PORT,
    logging: false,
    dialect,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
