import { Router, Request, Response, NextFunction } from "express";
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

import { NotFoundError, AuthFailureError } from "../utils/error.handler";
import { SuccessResponse } from "../utils/successResponse.handler";
import { User } from "../models/User";
import { AppDataSource } from "../dbConfig";
import environmentConfig from "../constants/environment.constant";
import { UserDTO } from "../dto/UserDTO";

export class UserService {
  public static userRepository = AppDataSource.getRepository(User);

  public static async getUserList(req: Request, res: Response) {
    try {
      const users = await this.userRepository.find();
      if (!users) {
        throw new NotFoundError("404", "Not Found");
      } else {
        return res.status(200).json(new SuccessResponse(true, "", 200, users));
      }
    } catch (error: any) {
      return error;
    }
  }

  public static async GenerateToken(req: Request, res: Response) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await this.userRepository.findOne({
        where: {
          email: email,
        },
      });
      if (user == null) {
        throw new NotFoundError("404", "Not Found");
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          throw new AuthFailureError("401", "Credentials Mismatched!");
        } else if (result === false) {
          throw new AuthFailureError("401", "Credentials Mismatched!");
        } else {
          let jwtSecretKey = environmentConfig.JWT_SECRET_KEY;
          let data = {
            time: Date(),
            userId: 12,
            role: user.role
          };

          const token = jwt.sign(data, jwtSecretKey);

          const resUser: UserDTO = { ...user };

          return res
            .status(200)
            .json(new SuccessResponse(true, "", 200, { token, user: resUser }));
        }
      });
      throw new NotFoundError("404", "Not Found");
    } catch (error: any) {
      return error;
    }
  }
}
