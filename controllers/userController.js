import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";

class Controllerfile {
  // get all user
  static getAllUser = async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  //   create user/ register
  static createUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;

      let user = await User.findOne({ email });
      if (user) {
        return res.status(404).json({
          success: false,
          message: "user Already exist",
        });
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
      console.log(error);
    }
  };

  // for login

  static loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Invalid email or password",
        });
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(404).json({
            success: false,
            message: "Invalid email or password",
          });
        } else {
          sendCookie(user, res, `welcome back ${user.name}`, 200);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


  // logout 

  static logoutUser= async(req,res)=>{

    try {

      res.status(200).cookie("token","",{expires:new Date(Date.now())}).json({
        success: true,
        user: req.user,
    })

      
    } catch (error) {
      console.log(error)
      
    }
  }




  // get user details  by Id

  static getUserById = async (req, res) => {
    try {
      res.status(200).json({
        success: true,
        user: req.user,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default Controllerfile;
