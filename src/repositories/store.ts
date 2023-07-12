import { Request, Response } from "express";
import { StoreService } from "../service/store";
import { SuccessResponse } from "../utils/successResponse.handler";

export class StoreRepository {
  public static async GetStoresByUserId(req: Request, res: Response) {
    try {
      var result = await StoreService.GetStoresByUserId(req);
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

  public static async AddStore(req: Request, res: Response) {
    try {
      var result = await StoreService.AddStore(req);
      if (result != null) {
        res
          .status(200)
          .json(new SuccessResponse(true, "Request Success", 200, [result]));
      } else {
        res
          .status(400)
          .json(new SuccessResponse(true, "", 400, "Some Error Occurred"));
      }
    } catch (err) {
      return err;
    }
  }

  public static async GetStoreById(req: Request, res: Response) {
    try {
      var result = await StoreService.GetStoreByStoreId(req.params.id);
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

  public static async UpdateStore(req: Request, res: Response) {
    try {
      var result = await StoreService.EditStore(req);
      if (result != null) {
        res
          .status(200)
          .json(new SuccessResponse(true, "Request Success", 200, [result]));
      } else {
        res
          .status(400)
          .json(new SuccessResponse(true, "", 400, "Some Error Occurred"));
      }
    } catch (err) {
      return err;
    }
  }

  public static async DeleteStore(req: Request, res: Response) {
    try {
      var result = await StoreService.DeleteStore(req);
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

  public static async Location(req: Request, res: Response) {
    try {
      var locations = await StoreService.Location();
      res.status(200).json({locations});
    } catch (err) {
      return err;
    }
  }

  public static async GetCountry(req: Request, res: Response) {
    try {
      var locations = await StoreService.GetCountry();
      res.status(200).json({locations});
    } catch (err) {
      return err;
    }
  }

  public static async GetState(req: Request, res: Response) {
    try {
      var locations = await StoreService.GetState(req.params.id);
      res.status(200).json({locations});
    } catch (err) {
      return err;
    }
  }

  public static async GetCity(req: Request, res: Response) {
    try {
      var locations = await StoreService.GetCity(req.params.id);
      res.status(200).json({locations});
    } catch (err) {
      return err;
    }
  }
}
