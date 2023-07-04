import * as dotenv from "dotenv";

dotenv.config();

const environmentConfig = {
  PORT: process.env.PORT ? process.env.PORT : 44372,
  TYPE: process.env.DB_TYPE,
  HOST: process.env.DB_HOST,
  USERNAME: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  DATABASE: process.env.DB_DATABASE,
  TOKEN_HEADER_KEY: process.env.TOKEN_HEADER_KEY,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
};

export default environmentConfig;
