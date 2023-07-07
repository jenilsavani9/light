import { Router, Request, Response, NextFunction } from "express";
import csvParser from "csv-parser";
import fs from "fs";

export class FileRepository {
  public static async FileStore(req: Request, res: Response) {
    try {
      const file = req.files[0];
      const dataArray = [];
      req
        .pipe(csvParser())
        .on("data", (row: { field1: any; field2: any; field3: any; }) => {
          // Process each row of data
          // Example: Map the row to the desired format and add it to the dataArray
          const formattedRow = {
            column1: row.field1,
            column2: row.field2,
            column3: row.field3,
            // Map other columns as needed
          };
          dataArray.push(formattedRow);
          console.log(dataArray);
        })
        .on("end", () => {
          console.log("CSV data:", dataArray);

          return res.status(200).json("FileStore");
        })
        .on("error", (err) => {
          console.error("Error reading CSV:", err);
          return res.status(500).json("Error reading CSV");
        });
      
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
