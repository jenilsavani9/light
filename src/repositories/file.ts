import { Router, Request, Response, NextFunction } from "express";

export class FileRepository {
  public static async FileStore(req: Request, res: Response) {
    try {
      return res.status(200).json("FileStore");
    } catch (err) {
      return err;
    }
  }
}
