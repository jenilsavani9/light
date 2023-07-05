import { Router, Request, Response, NextFunction } from "express";

export class FeatureRepository {
  public static async GetFeaturesByUserId(req: Request, res: Response) {
    try {
      return res.status(200).json("GetFeaturesByUserId");
    } catch (err) {
      return err;
    }
  }

  public static async AddFeatures(req: Request, res: Response) {
    try {
      return res.status(200).json("AddFeatures");
    } catch (err) {
      return err;
    }
  }

  public static async GetFeaturesById(req: Request, res: Response) {
    try {
      return res.status(200).json("GetFeaturesById");
    } catch (err) {
      return err;
    }
  }

  public static async UpdateFeatures(req: Request, res: Response) {
    try {
      return res.status(200).json("UpdateFeatures");
    } catch (err) {
      return err;
    }
  }

  public static async DeleteFeatures(req: Request, res: Response) {
    try {
      return res.status(200).json("DeleteFeatures");
    } catch (err) {
      return err;
    }
  }

  public static async GetFeaturesByStoreId(req: Request, res: Response) {
    try {
      return res.status(200).json("GetFeaturesByStoreId");
    } catch (err) {
      return err;
    }
  }

  public static async AddStoreFeatures(req: Request, res: Response) {
    try {
      return res.status(200).json("AddStoreFeatures");
    } catch (err) {
      return err;
    }
  }
}
