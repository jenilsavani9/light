import { Request, Response } from "express";
import csvParser from "csv-parser";
import fs from "fs";

export class FileRepository {
  public static async FileStore(req: Request, res: Response) {
    try {
      const dataArray = [];
      const file = req.files[0];
      
      res
        .pipe(csvParser())
        .on("data", (row: { field1: any; field2: any; field3: any }) => {
          const formattedRow = {
            column1: row.field1,
            column2: row.field2,
            column3: row.field3,
          };
          dataArray.push(formattedRow);
          console.log(row);
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
