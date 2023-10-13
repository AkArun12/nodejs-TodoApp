import express from 'express';
import Taskcontroller from '../controllers/taskController.js';
import {isAuthenticated} from '../middlewares/auth.js'


const router=express.Router();

router.post("/new",isAuthenticated, Taskcontroller.newTask)
router.get("/my",isAuthenticated, Taskcontroller.getmyTask)


router.route("/:id").put(isAuthenticated,Taskcontroller.updatemyTask).delete(isAuthenticated,Taskcontroller.deletemyTask)






export default router;