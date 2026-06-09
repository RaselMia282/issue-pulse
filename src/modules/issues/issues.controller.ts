import type { Request, Response } from "express";
import { issuesService } from "./issues.service";

const createIssues = async (req: Request, res: Response) => {
  try {
    const reporterId = req.user?.id; 
    if (!reporterId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        errors: "Reporter ID not found in token.",
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
        message: "Issue not found",
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

const updateIssues = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const payload = req.body;
    
    
    const existingIssue = await issuesService.getSingleIssuesIntoDb(id);

    if (!existingIssue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found"
      });
    }

    const currentUser = req.user;
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }

    
    if (currentUser.role === "contributor") {
      
      if (existingIssue.reporter?.id !== currentUser.id) {
        return res.status(403).json({
          success: false,
          message: "Forbidden access - You can only update your own issues"
        });
      }

      
      if (existingIssue.status !== "open") {
        return res.status(409).json({ 
          success: false,
          message: "Conflict - You cannot update an issue that is already in progress or resolved"
        });
      }
    }

    
    const result = await issuesService.updateIssuesIntoDb(id, payload);

    return res.status(200).json({ 
      success: true,
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({
      success: false,
      message: err.message,
      errors: error,
    });
  }
};

const deleteIssues = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    
    const currentUser = req.user;
    if (!currentUser || currentUser.role !== "maintainer") {
      return res.status(403).json({
        success: false,
        message: "Forbidden access - Only maintainers can delete issues",
      });
    }

    const result = await issuesService.deleteIssuesIntoDb(id);

    
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Issue not found to delete",
      });
    }

    
    return res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error) {
    
    const err = error as Error;
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
      errors: error,
    });
  }
};

export const issuesController = {
  createIssues,
  getAllIssues,
  getSingleIssues,
  updateIssues,
  deleteIssues,
};
