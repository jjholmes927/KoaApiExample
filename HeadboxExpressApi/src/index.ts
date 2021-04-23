import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { importHistoricalData } from "./utils/csv/importHistoricalData";
import { server } from "./api/server";

createConnection().then(async connection => {
        await importHistoricalData();
        server;
}).catch(error => console.log(error));
