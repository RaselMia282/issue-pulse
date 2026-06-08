import { Pool } from "pg";
import config from "../config/env";

export const pool = new Pool({
  connectionString: config.Database_URL,
});

export const initDb = async () => {
  try {
    // table 1
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            ID SERIAL PRIMARY KEY,
            name VARCHAR(150),
            email TEXT UNIQUE,
            password TEXT,
            role VARCHAR(150) DEFAULT 'contributor',
            created_at TIMESTAMP DEFAULT NOW (),
            updated_at TIMESTAMP DEFAULT NOW())`);

    console.log("database connected successfully");

    // table 2
    await pool.query(`
            CREATE TABLE IF NOT EXISTS issues (
            ID SERIAL PRIMARY KEY,
            reporter_id INT REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(150),
            description TEXT,
            type VARCHAR(150),
            status VARCHAR(150) DEFAULT 'open',
            
            created_at TIMESTAMP DEFAULT NOW (),
            updated_at TIMESTAMP DEFAULT NOW())`);
  } catch (error) {
    console.log(error);
  }
};
