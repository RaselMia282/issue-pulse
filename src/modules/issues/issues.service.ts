import { pool } from "../../db";
import type { TIssue } from "./issues.interface";

const createIssuesIntoDb = async (payload: TIssue, reporterId: number) => {
  try {
    const { title, description, type, status = "open" } = payload;

    const result = await pool.query(
      `
        INSERT INTO issues (title,description,type,status,reporter_id) VALUES($1, $2, $3, $4, $5)
        RETURNING *`,
      [title, description, type, status, reporterId],
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getAllIssuesIntoDb = async (queryParams?: any) => {
  try {
    const sort = queryParams?.sort || "newest";
    const type = queryParams?.type;
    const status = queryParams?.status;

    let queryText = `SELECT * FROM issues`;
    const queryValues: any[] = [];
    const conditions: string[] = [];

    if (type) {
      queryValues.push(type);
      conditions.push(`type = $${queryValues.length}`);
    }

    if (status) {
      queryValues.push(status);
      conditions.push(`status = $${queryValues.length}`);
    }

    if (conditions.length > 0) {
      queryText += ` WHERE ` + conditions.join(" AND ");
    }

    if (sort === "oldest") {
      queryText += ` ORDER BY created_at ASC`;
    } else {
      queryText += ` ORDER BY created_at DESC`;
    }

    const result = await pool.query(queryText, queryValues);
    const issues = result.rows;

    if (issues.length === 0) return [];

    const reporterIds = [...new Set(issues.map((issue) => issue.reporter_id))];

    const usersResult = await pool.query(
      `SELECT id, name, role FROM users WHERE id = ANY($1)`,
      [reporterIds],
    );

    const userMap: Record<number, any> = {};
    usersResult.rows.forEach((user) => {
      userMap[user.id] = user;
    });

    const formattedIssues = issues.map((issue) => {
      const { reporter_id, ...restOfIssue } = issue;
      return {
        ...restOfIssue,
        reporter: userMap[reporter_id] || null,
      };
    });

    return formattedIssues;
  } catch (error) {
    throw error;
  }
};

const getSingleIssuesIntoDb = async (id: any) => {
  try {
    const result = await pool.query(
      `
        SELECT * FROM issues 
        WHERE id = $1`,
      [id],
    );
    const issue = result.rows[0];
    if (!issue) return null;
    const userResult = await pool.query(
      `SELECT id, name, role FROM users WHERE id = $1`,
      [issue.reporter_id] 
    );
    const user = userResult.rows[0];

    
    const { reporter_id, ...restOfIssue } = issue;
    
    return {
      ...restOfIssue,
      reporter: user || null 
    };
  } catch (error) {
    throw error;
  }
};

const updateIssuesIntoDb = async (id: any, payload: any) => {
  try {
    const { title, description, type, status } = payload;

  const result = await pool.query(
    `
    UPDATE issues
    SET title=$1 ,description=$2 ,type=$3 ,status=$4
    WHERE id = $5
    RETURNING *`,
    [title, description, type, status, id],
  );
  return result.rows[0];
  } catch (error) {
    throw error
  }

  
};

const deleteIssuesIntoDb = async (id: any) => {
  try {
    const result = await pool.query(
      `DELETE FROM issues
        WHERE id = $1
        RETURNING*`,
      [id],
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const issuesService = {
  createIssuesIntoDb,
  getAllIssuesIntoDb,
  getSingleIssuesIntoDb,
  updateIssuesIntoDb,
  deleteIssuesIntoDb,
};
