import type { Request, Response } from "express";
import { issuesService } from "./issues.service";

const createIssues = async (req: Request, res: Response) => {
  try {
    const loggedInUser = (req as any).users;
    const issuePayload = {
      ...req.body,
      users_id: loggedInUser.id,
    };
    const result = await issuesService.createIssuesIntoDb(issuePayload);

    res.status(201).json({
      success: true,
      message: "Issue created  successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issuesService.getAllIssuesIntoDb();

    res.status(201).json({
      success: true,
      message: "Issue created  successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getSingleIssues = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const {title,description,type,status}=req.body
    const result = await issuesService.getSingleIssuesIntoDb(id);
    res.status(201).json({
      success: true,
      message: "Issue retrieved  successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
const updateIssues = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body
     const result = await issuesService.updateIssuesIntoDb(id,payload)
    res.status(201).json({
      success: true,
      message: "Issue updated  successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const deleteIssues = async(req:Request,res:Response)=>{
  try {
    const {id}=req.params
const result = await issuesService.deleteIssuesIntoDb(id)
res.status(201).json({
      success: true,
      message: "Issue deleted  successfully",
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
export const issuesController = {
  createIssues,
  getAllIssues,
  getSingleIssues,
  updateIssues,
  deleteIssues
};
