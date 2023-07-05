import { Router, Request, Response, NextFunction } from "express";

export class StoreRepository {
  public static async GetStoresByUserId(req: Request, res: Response) {
    try {
      return res.status(200).json("GetStoresByUserId");
    } catch (err) {
      return err;
    }
  }

  public static async AddStore(req: Request, res: Response) {
    try {
      return res.status(200).json("AddStore");
    } catch (err) {
      return err;
    }
  }

  public static async GetStoreById(req: Request, res: Response) {
    try {
      return res.status(200).json("GetStoreById");
    } catch (err) {
      return err;
    }
  }

  public static async UpdateStore(req: Request, res: Response) {
    try {
      return res.status(200).json("UpdateStore");
    } catch (err) {
      return err;
    }
  }

  public static async DeleteStore(req: Request, res: Response) {
    try {
      return res.status(200).json("DeleteStore");
    } catch (err) {
      return err;
    }
  }

  public static async Location(req: Request, res: Response) {
    try {
      return res.status(200).json("Location");
    } catch (err) {
      return err;
    }
  }
}
