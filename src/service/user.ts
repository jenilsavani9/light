import { Router, Request, Response, NextFunction } from "express";
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import { v4 as uuidv4 } from "uuid";
var nodemailer = require('nodemailer');

import { NotFoundError } from "../utils/error.handler";
import { SuccessResponse } from "../utils/successResponse.handler";
import { User } from "../models/User";
import { Token } from "../models/Token";
import { AppDataSource } from "../dbConfig";
import environmentConfig from "../constants/environment.constant";
import { ResponseUserDTO } from "../dto/ResUserDTO";
import { Status, Roles } from "../models/User";
import { AddUserDTO } from "../dto/AddUserDTO";

export class UserService {
  public static userRepository = AppDataSource.getRepository(User);
  public static tokenRepository = AppDataSource.getRepository(Token);

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

  public static async GetUserById(id) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          Id: id,
        },
      });
      return user;
    } catch (error) {
      return error;
    }
  }

  public static async GenerateToken(req: Request, res: Response) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await this.userRepository.findOne({
        where: {
          Email: email,
        },
      });
      if (user == null) {
        return res
          .status(401)
          .json(new SuccessResponse(true, "Not Found", 401));
      }
      bcrypt.compare(password, user.Password, function (err, result) {
        if (err) {
          return res
            .status(401)
            .json(new SuccessResponse(true, "Credential Mismatched!!!", 401));
        } else if (result === false) {
          return res
            .status(401)
            .json(new SuccessResponse(true, "Credential Mismatched!!!", 401));
        } else {
          let jwtSecretKey = environmentConfig.JWT_SECRET_KEY;
          let data = {
            time: Date(),
            userId: user.Id,
            role: user.Role,
          };

          const token = jwt.sign(data, jwtSecretKey);

          const resUser: ResponseUserDTO = {
            id: user.Id,
            firstName: user.FirstName,
            lastName: user.LastName,
            email: user.Email,
            status: Status[user.Status],
            role: Roles[user.Role],
            lastLogin: user.LastLogin,
          };

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

  public static async ValidateEmail(req: Request, res: Response) {
    try {
      const queryUserId = req.query.UserId;
      const queryToken = req.query.token;
      let Entry = await this.tokenRepository.findOne({
        where: {
          UserId: queryUserId,
          IsActive: true,
        },
      });

      if (Entry == null || Entry.Value != queryToken) {
        return res
          .status(200)
          .json(new SuccessResponse(true, "Not Found", 404));
      }
      // if (Entry.createdAt. <= DateTime.Now) {
      //   return res
      //   .status(200)
      //   .json(new SuccessResponse(true, "Not Found", 404));
      // }
      var user = await this.userRepository.findOne({
        where: {
          Id: queryUserId,
        },
      });
      if (user == null) {
        return res
          .status(200)
          .json(new SuccessResponse(true, "Not Found", 404));
      }
      Entry.IsActive = false;
      user.Status = Status.active;
      await this.tokenRepository.save(Entry);
      await this.userRepository.save(user);

      return res.status(200).json(new SuccessResponse(true, "", 200, user));
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public static async SendMail(user: AddUserDTO, emailType: string) {
    const token = uuidv4();
    const TempUser = await this.userRepository.findOne({
      where: {
        Email: user.Email,
      },
    });

    if (TempUser == null) {
      return false;
    }

    await this.tokenRepository.insert({
      UserId: TempUser.Id,
      Value: token,
      IsActive: true,
      createdAt: Date.now(),
    });

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jenilsavani8@gmail.com',
        pass: 'bwgnmdxyggqrylsu'
      }
    });

    var mailOptions = {
      from: 'jenilsavani8@gmail.com',
      to: user.Email,
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    return true;
  }

  public static async ForgotPassword(userId: number) {
    var tempUser = await this.userRepository.findOne({
      where: {
        Id: userId,
      },
    });

    let user: AddUserDTO;
    user.Email = tempUser.Email;
    user.FirstName = tempUser.FirstName;
    user.LastName = tempUser.LastName;
    user.Password = tempUser.Password;

    let status = await this.SendMail(user, "Forgot")

    return true;
  }
}
