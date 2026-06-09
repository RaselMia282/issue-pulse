import { pool } from "../../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { TUserLoginPayload,TUserSignupPayload } from "./users.interface";
import config from "../../config/env";
const usersIntoDb = async (payload: TUserSignupPayload) => {
  const { name, email, password, role = 'contributor' } = payload;
  
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

const loginUsersIntoDb = async (payload: TUserLoginPayload) => {
  const { email, password } = payload;

  const usersResult = await pool.query(
    `
    SELECT * FROM users
    WHERE email =$1`,
    [email],
  );

  const users = usersResult.rows[0];

  if (!users) {
    throw new Error("Account not found with with this email");
  }
  const isPasswordMatched = await bcrypt.compare(password, users.password);
  if (!isPasswordMatched) {
    throw new Error("Password does not match");
  }

  const jwtpayload = {
    id: users.id,
    email: users.email,
    role: users.role,
    name:users.name,
  };

  const token = jwt.sign(jwtpayload, config.jwt_secret, {
    expiresIn: "30d",
  });
  delete users.password;
  return {
    token,
    user:users,
  };
};

export const usersService = {
  usersIntoDb,
  loginUsersIntoDb,
};
