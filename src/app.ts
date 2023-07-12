import express, { Application } from "express";
import * as dotenv from "dotenv";
import { errors } from "celebrate";
import helmet from 'helmet';

import { AppDataSource } from "./dbConfig";
import environmentConfig from "./constants/environment.constant";
import router from "./routes/index.routes";

dotenv.config();
export class App {
  private app: Application = express();

  constructor() {
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use((request, response, next) => {
      response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Headers", "*");
      response.header("Access-Control-Allow-Methods", "*");
      next();
    });
    this.app.use(router);
    this.app.use(errors());
  }

  public async listen() {
    /**
     * database connection
     */
    await AppDataSource.initialize()
      .then(() => console.log("Database Connected!!!"))
      .catch((error) => console.log(error));

    await this.app.listen(environmentConfig.PORT, () => {
      console.log(`Server running on ${environmentConfig.PORT}`);
    });
    return this.app;
  }
}
