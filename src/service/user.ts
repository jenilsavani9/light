import { Router, Request, Response, NextFunction } from "express";
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import { v4 as uuidv4 } from "uuid";
var nodemailer = require("nodemailer");

import { NotFoundError } from "../utils/error.handler";
import { SuccessResponse } from "../utils/successResponse.handler";
import { User } from "../models/User";
import { Token } from "../models/Token";
import { AppDataSource } from "../dbConfig";
import environmentConfig from "../constants/environment.constant";
import { ResponseUserDTO } from "../dto/ResUserDTO";
import { Status, Roles } from "../models/User";
import { AddUserDTO } from "../dto/AddUserDTO";
import { Not } from "typeorm";

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
            role: Roles[user.Role],
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
    try {
      const token = uuidv4();
      const TempUser = await this.userRepository.findOne({
        where: {
          Email: user.Email,
        },
      });

      if (TempUser == null) {
        return false;
      }

      const currentDate: Date = new Date();

      const tempToken = this.tokenRepository.create({
        UserId: TempUser.Id,
        Value: token,
        IsActive: true,
        CreatedAt: currentDate,
      });
      await this.tokenRepository.save(tempToken);

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "jenilsavani8@gmail.com",
          pass: "bwgnmdxyggqrylsu",
        },
      });

      var resetLink =
        "http://localhost:3000/verify?UserId=" +
        TempUser.Id +
        "&token=" +
        token;

      var body =
        "Please click on the following link to Validate Mail ID:" +
        `<a href='${resetLink}'>${resetLink}</a>` +
        `Email: ${user.Email}<br/>Password : ${user.Password}` +
        "Please, Use Below Credentionals to login into your account." +
        "Thank You!!!";

      if (emailType == "Forgot") {
        body =
          "Please click on the following link to Validate Mail ID:" +
          `<a href='${resetLink}'>${resetLink}</a>` +
          `Email: ${user.Email}<br/>` +
          "Please, Use Below Credentionals to login into your account." +
          "Thank You!!!";
      }

      var mailOptions = {
        from: "jenilsavani8@gmail.com",
        to: user.Email,
        subject: "LightSpeed Password Verify",
        text: body,
      };

      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return true;
        } else {
          return false;
        }
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public static async ForgotPassword(userId: number) {
    try {
      var tempUser = await this.userRepository.findOne({
        where: {
          Id: userId,
        },
      });

      var user = new AddUserDTO();
      user.Email = tempUser.Email;
      user.FirstName = tempUser.FirstName;
      user.LastName = tempUser.LastName;
      user.Password = tempUser.Password;

      let status = await this.SendMail(user, "Forgot");

      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public static async ResetPassword(req) {
    try {
      let email = req.body.email;
      let password = req.body.password;
      let newPassword = req.body.newPassword;
      var tempUser = await this.userRepository.findOne({
        where: {
          Email: email,
        },
      });

      if (tempUser != null) {
        bcrypt.compare(
          password,
          tempUser.Password,
          async function (err, result) {
            if (err) {
              return false;
            } else if (result == true) {
              tempUser.Password = await bcrypt.hashSync(newPassword, 10);
            } else {
              return false;
            }
          }
        );
      }
      await this.userRepository.save(tempUser);
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public static async ChangePassword(req: Request) {
    try {
      let UserId = req.body.userId;
      let Password = req.body.password;

      var tempUser = await this.userRepository.findOne({
        where: {
          Id: UserId,
        },
      });

      tempUser.Password = bcrypt.hashSync(Password, 10);
      await this.userRepository.save(tempUser);

      const resUser: ResponseUserDTO = {
        id: tempUser.Id,
        firstName: tempUser.FirstName,
        lastName: tempUser.LastName,
        email: tempUser.Email,
        status: Status[tempUser.Status],
        role: Roles[tempUser.Role],
        lastLogin: tempUser.LastLogin,
      };

      return resUser;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public static async AddUser(req) {
    try {
      const reqUser: AddUserDTO = {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: req.body.password,
      };

      var tempUser = await this.userRepository.findOne({
        where: {
          Email: reqUser.Email,
        },
      });

      var currentDate = new Date();
      if (tempUser == null) {
        const User = this.userRepository.create({
          FirstName: reqUser.FirstName,
          LastName: reqUser.LastName,
          Email: reqUser.Email,
          Password: bcrypt.hashSync(reqUser.Password, 10),
          Status: Status.pending,
          Role: Roles.customer,
          CreatedAt: currentDate,
        });
        await this.userRepository.save(User);

        await this.SendMail(reqUser, "Reset");

        const resUser: ResponseUserDTO = {
          id: User.Id,
          firstName: User.FirstName,
          lastName: User.LastName,
          email: User.Email,
          status: Status[User.Status],
          role: Roles[User.Role],
          lastLogin: User.LastLogin,
        };
        return resUser;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public static async GetUserCount() {
    return this.userRepository.countBy({ Status: Not(Status.deactive) });
  }

  public static async GetUserList(req: Request) {
    try {
      var pageUser = 9;
      var pageindex = req.query.pageIndex;
      var userList = await this.userRepository.find({
        where: [
          {
            Status: Status.active,
          },
          {
            Status: Status.pending
          }
        ],
        skip: pageUser * pageindex,
        take: pageUser,
      });

      var resUserList = [];
      userList.forEach((element) => {
        const resUser: ResponseUserDTO = {
          id: element.Id,
          firstName: element.FirstName,
          lastName: element.LastName,
          email: element.Email,
          status: Status[element.Status],
          role: Roles[element.Role],
          lastLogin: element.LastLogin,
        };
        resUserList.push(resUser);
      });

      return resUserList;
    } catch (error) {
      return error;
    }
  }

  public static async DeleteUser(req: Request) {
    try {
      var userid = req.query.userId;

      var user = await this.userRepository.findOne({
        where: {
          Id: userid,
        },
      });

      if (user == null) {
        return null;
      }
      if (user.Status == Status.deactive) {
        return null!;
      }
      user.Status = Status.deactive;
      user.UpdatedAt = new Date();
      await this.userRepository.save(user);

      return user;
    } catch (error) {
      return error;
    }
  }
}
