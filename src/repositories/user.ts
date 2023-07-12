import { Request, Response } from "express";
import { UserService } from "../service/user";
import { SuccessResponse } from "../utils/successResponse.handler";

export class UserRepository {
  public static async userLogin(
    req: Request,
    res: Response,
  ) {
    try {
      return UserService.GenerateToken(req, res);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public static async Validate(req: Request, res: Response) {
    try {
      return UserService.ValidateEmail(req, res);
    } catch (err) {
      return err;
    }
  }

  public static async ResetPassword(req: Request, res: Response) {
    try {
      let result = await UserService.ResetPassword(req);
      if (result == true) {
        res
          .status(200)
          .json(new SuccessResponse(true, "Request Success", 200, ""));
      } else {
        res
          .status(400)
          .json(new SuccessResponse(true, "", 400, "Some Error Occurred"));
      }
    } catch (err) {
      return err;
    }
  }

  public static async ForgotPassword(req: Request, res: Response) {
    try {
      let result = await UserService.ForgotPassword(req.body.UserId);
      if (result == true) {
        res
          .status(200)
          .json(new SuccessResponse(true, "", 200, "Request Success"));
      } else {
        res
          .status(400)
          .json(new SuccessResponse(true, "", 400, "Some Error Occurred"));
      }
    } catch (err) {
      return err;
    }
  }

  public static async ChangePassword(req: Request, res: Response) {
    try {
      let result = await UserService.ChangePassword(req);
      if (result != null) {
        res
          .status(200)
          .json(new SuccessResponse(true, "", 200, "Request Success"));
      } else {
        res
          .status(400)
          .json(new SuccessResponse(true, "", 400, "Some Error Occurred"));
      }
    } catch (err) {
      return err;
    }
  }

  public static async AddUser(req: Request, res: Response) {
    try {
      var TempUser = await UserService.AddUser(req);
      if (TempUser != null) {
        res.status(200).json(new SuccessResponse(true, "", 200, TempUser));
      } else {
        res
          .status(400)
          .json(new SuccessResponse(true, "", 400, "Some Error Occurred"));
      }
    } catch (err) {
      return err;
    }
  }

  public static async GetUserList(req: Request, res: Response) {
    try {
      var userList = await UserService.GetUserList(req);
      var userCount = await UserService.GetUserCount();
      if (userList != null) {
        res.status(200).json(new SuccessResponse(true, "", 200, { userList, userCount }));
      } else {
        res
          .status(401)
          .json(new SuccessResponse(true, "", 401, "Some Error Occurred"));
      }
    } catch (err) {
      return err;
    }
  }

  public static async DeleteUser(req: Request, res: Response) {
    try {
      var result = await UserService.DeleteUser(req);
      if (result != null) {
        res.status(200).json(new SuccessResponse(true, "", 200, { result }));
      } else {
        res
          .status(401)
          .json(new SuccessResponse(true, "", 401, "Some Error Occurred"));
      }
    } catch (err) {
      return err;
    }
  }
}
