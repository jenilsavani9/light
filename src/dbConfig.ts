import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User";
import environmentConfig from "./constants/environment.constant";


export const AppDataSource = new DataSource({
  type: "mssql",
  host: environmentConfig.HOST,
  username: environmentConfig.USERNAME,
  password: environmentConfig.PASSWORD,
  database: environmentConfig.DATABASE,
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
  extra: {
    trustServerCertificate: true,
  },
});
