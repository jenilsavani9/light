import { Router, Request, Response, NextFunction } from "express";
import { UserService } from "../service/user";

export class UserRepository {
  // Routes will call repos, Repo will be a single responsibility class
  public static async getUserList(req: Request, res: Response) {
    try {
      // Write computing operations here
      return UserService.getUserList(req, res);
    } catch (err) {
      return err;
    }
  }

  public static async userLogin(req: Request, res: Response) {
    try {
      return UserService.GenerateToken(req, res);
    } catch (err) {
      return err;
    }
  }
}
