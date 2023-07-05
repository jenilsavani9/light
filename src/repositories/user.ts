import { Router, Request, Response, NextFunction } from "express";
import { UserService } from "../service/user";

export class UserRepository {

  public static async userLogin(req: Request, res: Response, next: NextFunction) {
    try {
      return UserService.GenerateToken(req, res);
    } catch (err) {
      return err;
    }
  }

  public static async Validate(req: Request, res: Response) {
    try {
      return res.status(200).json("Validate");
    } catch (err) {
      return err;
    }
  }

  public static async ResetPassword(req: Request, res: Response) {
    try {
      return res.status(200).json("ResetPassword");
    } catch (err) {
      return err;
    }
  }

  public static async ForgotPassword(req: Request, res: Response) {
    try {
      return res.status(200).json("ForgotPassword");
    } catch (err) {
      return err;
    }
  }

  public static async ChangePassword(req: Request, res: Response) {
    try {
      return res.status(200).json("ChangePassword");
    } catch (err) {
      return err;
    }
  }

  public static async AddUser(req: Request, res: Response) {
    try {
      return res.status(200).json("AddUser");
    } catch (err) {
      return err;
    }
  }

  public static async GetUserList(req: Request, res: Response) {
    try {
      return res.status(200).json("GetUserList");
    } catch (err) {
      return err;
    }
  }

  public static async DeleteUser(req: Request, res: Response) {
    try {
      return res.status(200).json("DeleteUser");
    } catch (err) {
      return err;
    }
  }
}
