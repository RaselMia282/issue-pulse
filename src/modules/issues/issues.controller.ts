import type { Request, Response } from "express";
import { issuesService } from "./issues.service";


const createIssues = async (req: Request, res: Response) => {
  try {
    const reporterId = req.user?.id; // 
    if (!reporterId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        errors: "Reporter ID not found in token."
      });
    }

   
    const result = await issuesService.createIssuesIntoDb(req.body, reporterId);

    return res.status(201).json({
      success: true,
      message: "Issue created successfully", 
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
      errors: error,
    });
  }
};


const getAllIssues = async (req: Request, res: Response) => {
  try {
   
    const result = await issuesService.getAllIssuesIntoDb(req.query);

    return res.status(200).json({ 
      success: true,
      message: "Issues retrieved successfully", 
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      errors: error,
    });
  }
};


const getSingleIssues = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await issuesService.getSingleIssuesIntoDb(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Issue not found"
      });
    }

    return res.status(200).json({ 
      success: true,
      message: "Issue retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      errors: error,
    });
  }
};


const updateIssues = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    
    const result = await issuesService.updateIssuesIntoDb(id, payload);

    return res.status(200).json({ 
      success: true,
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      errors: error,
    });
  }
};


const deleteIssues = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result=await issuesService.deleteIssuesIntoDb(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Issue not found to delete"
      });
    }

    return res.status(200).json({ 
      success: true,
      message: "Issue deleted successfully"
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      errors: error,
    });
  }
};

export const issuesController = {
  createIssues,
  getAllIssues,
  getSingleIssues,
  updateIssues,
  deleteIssues
};