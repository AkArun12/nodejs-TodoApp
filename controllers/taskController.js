import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/Task.js";
class Taskcontroller {

    // create task 
  static newTask = async (req, res,next) => {
    try {
      const { title, description } = req.body;
      await Task.create({
        title,
        description,
        user: req.user,
      });

      res.status(201).json({
        success: true,
        message: "Task added successfully",
      });
    } catch (error) {
      next(error);
    }
  };

//   get task

static getmyTask=async (req,res,next)=>{

    try {

       const userid= req.user._id;

       const tasks=await Task.find({user:userid})

       res.status(200).json({
        success:true,
        tasks
     })

        
    } catch (error) {
        next(error)
        
    }
}

//  update task

static updatemyTask=async (req,res,next)=>{

    try {

      const {id} =req.params; 
      const{title,description}=req.body;
      const task =await Task.findByIdAndUpdate(id,{$set:{title,description}});
               
       if (!task) return next(new ErrorHandler("Task not found", 404));
      task.isCompleted=!task.isCompleted;
      await task.save()

   

       res.status(200).json({
        success:true,
        message:"Task updated successfully"
     })

        
    } catch (error) {
        next(error)
        
    }
}

//  Delete task

static deletemyTask=async (req,res,next)=>{

    try {
       const { id } = req.params;
       const task = await Task.findById(id);
      
       if(!task) return next(new ErrorHandler("Task not found", 404));
       await task.deleteOne();

       

       res.status(200).json({
        success:true,
        message:"Task deleted successfully"
     })

        
    } catch (error) {
        next(error)
        
    }
}







}

export default Taskcontroller;
