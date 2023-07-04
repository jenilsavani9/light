import express, { Express, Request, Response, Application } from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./dbConfig";
import environmentConfig from "./constants/environment.constant";
import router from "./routes";

dotenv.config();
export class App {
  private app: Application = express();

  constructor() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use((request, response, next) => {
      response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Headers", "*");
      response.header("Access-Control-Allow-Methods", "*");
      next();
    });
    this.app.use(router);
  }

  public async listen() {
    /**
     * database connection
     */
    await AppDataSource.initialize()
      .then(() => console.log("Database Connected!!!"))
      .catch((error) => console.log(error));

    /**
     * Routes
     */
    // Routes.forEach((route) => {
    //   (this.app as any)[route.method](
    //     route.route,
    //     (req: Request, res: Response, next: Function) => {
    //       const result = new (route.controller as any)()[route.action](
    //         req,
    //         res,
    //         next
    //       );
    //       if (result instanceof Promise) {
    //         result.then((result) =>
    //           result !== null && result !== undefined
    //             ? res.send(result)
    //             : undefined
    //         );
    //       } else if (result !== null && result !== undefined) {
    //         res.json(result);
    //       }
    //     }
    //   );
    // });

    /**
     * application running on port 3001
     */
    await this.app.listen(environmentConfig.PORT, () => {
      console.log(`Server running on ${environmentConfig.PORT}`);
    });
    return this.app;
  }
}
