import type { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";
import { pool } from "../db";

const auth = async(req:Request,res:Response,next:NextFunction)=>{
try {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({
         success:false,
         message:"unauthorize access"
        })
    }

    const decoded = jwt.verify(token,"secret-key") as any
    const usersData = await pool.query(`
        SELECT * FROM users 
        WHERE email = $1`,
        [decoded.email])

        const users = usersData.rows[0]
        if (!users) {
            return res.status(404).json({
                success:false,
                message:"users not found"
            })
        }
        (req as any).users=decoded
        next()
} catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access - Invalid token",
    });
}
}
export default auth