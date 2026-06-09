import type { Request, Response } from "express";
import { usersService } from "./users.service";

const createUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersService.usersIntoDb(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      errors: error,
    });
  }
};

const loginUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersService.loginUsersIntoDb(req.body);
    res.status(200).json({
      success: true,
      message: " Login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      errors: error,
    });
  }
};

export const usersControllar = {
  createUsers,
  loginUsers,
};
