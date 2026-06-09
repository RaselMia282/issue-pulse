import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { pool } from "../db";
import type { TDecodedUser } from "./auth.interface";
import config from "../config/env";
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        name: string;
        role: "contributor" | "maintainer";
      };
    }
  }
}


const auth = (...requiredRoles: ("contributor" | "maintainer")[]) => {
  
  
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access",
        });
      }

      const decoded = jwt.verify(token, config.jwt_secret) as TDecodedUser;

      const usersData = await pool.query(
        `SELECT id, name, role FROM users WHERE id = $1`,
        [decoded.id]
      );

      const user = usersData.rows[0];
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      
      if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden access - You do not have permission",
        });
      }

      req.user = {
        id: user.id,
        name: user.name,
        role: user.role,
      };

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access - Invalid token",
      });
    }
  };
}; 

export default auth;