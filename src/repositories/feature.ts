import { Router, Request, Response, NextFunction } from "express";
import { FeatureService } from "../service/feature";
import { SuccessResponse } from "../utils/successResponse.handler";

export class FeatureRepository {
  public static async GetFeaturesByUserId(req: Request, res: Response) {
    try {
      var result = await FeatureService.GetFeaturesByUserId(req);
      if (result != null) {
        res
          .status(200)
          .json(new SuccessResponse(true, "Request Success", 200, result));
      } else {
        res
          .status(400)
          .json(new SuccessResponse(true, "", 400, "Some Error Occurred"));
      }
    } catch (err) {
      return err;
    }
  }

  public static async AddFeatures(req: Request, res: Response) {
    try {
      var result = await FeatureService.AddFeatures(req);
      if (result != null) {
        res
          .status(200)
          .json(new SuccessResponse(true, "Request Success", 200, result));
      } else {
        res
          .status(400)
          .json(new SuccessResponse(true, "", 400, "Some Error Occurred"));
      }
    } catch (err) {
      return err;
    }
  }

  public static async GetFeaturesById(req: Request, res: Response) {
    try {
      var result = await FeatureService.GetFeaturesById(req);
      if (result != null) {
        res
          .status(200)
          .json(new SuccessResponse(true, "Request Success", 200, result));
      } else {
        res
          .status(400)
          .json(new SuccessResponse(true, "", 400, "Some Error Occurred"));
      }
    } catch (err) {
      return err;
    }
  }

  public static async UpdateFeatures(req: Request, res: Response) {
    try {
      var result = await FeatureService.UpdateFeatures(req);
      if (result != null) {
        res
          .status(200)
          .json(new SuccessResponse(true, "Request Success", 200, result));
      } else {
        res
          .status(400)
          .json(new SuccessResponse(true, "", 400, "Some Error Occurred"));
      }
    } catch (err) {
      return err;
    }
  }

  public static async DeleteFeatures(req: Request, res: Response) {
    try {
      var result = await FeatureService.DeleteFeatures(req);
      if (result != null) {
        res
          .status(200)
          .json(new SuccessResponse(true, "Request Success", 200, result));
      } else {
        res
          .status(400)
          .json(new SuccessResponse(true, "", 400, "Some Error Occurred"));
      }
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
