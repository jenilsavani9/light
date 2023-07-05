import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User";
import environmentConfig from "./constants/environment.constant";
import { Token } from "./models/Token";
import { Address } from "./models/Address";
import { City } from "./models/City";
import { Country } from "./models/Country";
import { Feature } from "./models/Feature";
import { State } from "./models/State";
import { Store } from "./models/Store";
import { StoreFeature } from "./models/StoreFeature";


export const AppDataSource = new DataSource({
  type: "mssql",
  host: environmentConfig.HOST,
  username: environmentConfig.USERNAME,
  password: environmentConfig.PASSWORD,
  database: environmentConfig.DATABASE,
  synchronize: false,
  logging: false,
  entities: [User, Token, Address, City, Country, Feature, State, Store, StoreFeature],
  migrations: [],
  subscribers: [],
  extra: {
    trustServerCertificate: true,
  },
});
