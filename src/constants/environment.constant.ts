import * as dotenv from "dotenv";

dotenv.config();

const environmentConfig = Object.freeze({
  PORT: process.env.PORT ? process.env.PORT : 3001,
  HOST: process.env.HOST,
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
});

export default environmentConfig;
