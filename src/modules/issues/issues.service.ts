import { pool } from "../../db"
import type { TIssue } from "./issues.interface"


const createIssuesIntoDb = async(payload:TIssue)=>{
    try {
    const{title,description,type,status='open',users_id }=payload
       
    const result = await pool.query(`
        INSERT INTO issues (title,description,type,status,users_id) VALUES($1, $2, $3, $4, $5)
        RETURNING *`,
        [title,description,type,status,users_id])

        return result.rows[0]
    } catch (error) {
       throw error; 
    }

}

const getAllIssuesIntoDb = async()=>{
try {
    const result = await pool.query(`
    SELECT * FROM issues
    `)
    return result.rows
} catch (error) {
    throw error
}
}

const getSingleIssuesIntoDb = async(id:any)=>{
    try {
       const result = await pool.query(`
        SELECT * FROM issues 
        WHERE id = $1`,
    [id]) 
    return result.rows[0]
    } catch (error) {
        throw error
    }
}

const updateIssuesIntoDb = async(id:any,payload:any)=>{
const {title,description,type,status}=payload

const result = await pool.query(`
    UPDATE issues
    SET title=$1 ,description=$2 ,type=$3 ,status=$4
    WHERE id = $5
    RETURNING *`,
[title,description,type,status,id])

return result.rows[0]
}

const deleteIssuesIntoDb = async(id:any)=>{
   try {
    const result = await pool.query(`DELETE FROM issues
        WHERE id = $1`,[id])

        return result.rows[0]
   } catch (error) {
    throw error
   } 
}

export const issuesService = {
    createIssuesIntoDb,
    getAllIssuesIntoDb,
    getSingleIssuesIntoDb,
    updateIssuesIntoDb,
    deleteIssuesIntoDb
}
