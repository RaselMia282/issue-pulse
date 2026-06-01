import { pool } from "../db";
import bcrypt from "bcryptjs";
const usersIntoDb = async (payload: any) => {
  const { name, email, password, role = null } = payload;
  const hashPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO users(name,email,password,role) 
    VALUES ($1 , $2, $3, $4)
    RETURNING *`,
    [name, email, hashPassword, role],
  );
  delete result.rows[0].password;
  return result.rows[0];
};

export const usersService = {
  usersIntoDb,
};
