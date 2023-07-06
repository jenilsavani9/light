import { Request, Response, NextFunction } from "express";
import jwt = require("jsonwebtoken");

import environmentConfig from "../constants/environment.constant";
import { AuthFailureError } from "../utils/error.handler";
import { UserService } from "../service/user";

export const verifyToken = () => {
  return "Token verified";
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers as any;
  if (!authorization) {
    throw new AuthFailureError("401", "Invalid Token..!");
  }

  const scheme = authorization.split(" ")[0];
  if (scheme !== "Bearer") {
    throw new AuthFailureError("401", "Invalid Token..!");
  }
  const token = authorization.split(" ")[1];
  jwt.verify(
    token,
    environmentConfig.JWT_SECRET_KEY,
    async (err: any, payload: any) => {
      if (err) {
        throw new AuthFailureError("401", "Inavalid username or password..!");
      }
      const { userId } = payload;
      const user = await UserService.GetUserById(userId);
      if (user) {
        req.user = user;
        next();
      } else {
        return res
          .status(401)
          .json({ message: "User Not found!", status: 400 });
      }
    }
  );
};

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.Role == 0) {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "You have no permission..!", status: 400 });
  }
};
