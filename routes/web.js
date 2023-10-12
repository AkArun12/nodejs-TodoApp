import express from 'express';
import { User } from '../models/User.js';

import Controllerfile from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router=express.Router();



router.get("/", (req, res) => {
  res.send("Helo guys");
});


// Find all users
router.get("/all",Controllerfile.getAllUser)


// Create user
router.post("/new",Controllerfile.createUser)
router.post("/login",Controllerfile.loginUser)
router.get("/logout",Controllerfile.logoutUser)


// Get  user by Id.
// we use req.params when we send data dynamically url
router.get("/me",isAuthenticated, Controllerfile.getUserById);




export default router;