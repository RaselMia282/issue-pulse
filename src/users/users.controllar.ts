import type { Request, Response } from "express"
import { usersService } from "./users.service";

const createUsers = async(req:Request,res:Response)=>{
try {
    
   const result = await usersService.usersIntoDb(req.body)


    res.status(201).json({
      success: true,
      message: "users registered successfully",
      data: result,
    });
} catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
}
}


export const usersControllar = {
    createUsers,
}