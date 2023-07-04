import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "PCI114\\SQL2017",
    username: "sa",
    password: "tatva123",
    database: "light",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
    extra: {
        trustServerCertificate: true,
    }
})
