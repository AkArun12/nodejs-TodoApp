import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

class Controllerfile {
  
  //   create user/ register
  static createUser = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exist", 404));
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
          name: name,
          email: email,
          password: hashedPassword,
        });

        sendCookie(user, res, "Registered successfully", 201);
      }
    } catch (error) {
      next(error);
    }
  };

  // for login

  static loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("invalid email or password", 404));
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return next(new ErrorHandler("invalid email or password", 404));
        } else {
          sendCookie(user, res, `welcome back ${user.name}`, 200);
        }
      }
    } catch (error) {
      next(error);
    }
  };

  // logout

  static logoutUser = async (req, res, next) => {
    try {
      res
        .status(200)
        .cookie("token", "", {
          expires: new Date(Date.now()),
          sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
          secure: process.env.NODE_ENV === "Development" ? false : true,
        })
        .json({
          success: true,
          user: req.user,
        });
    } catch (error) {
    next(error);
    }
  };

  // get user details  by Id

  static getUserById = async (req, res) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });
      res.status(200).json({
        success: true,
        user: req.user,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default Controllerfile;
