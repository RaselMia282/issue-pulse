import { Pool } from "pg";
import config from "../config/env";

export const pool = new Pool({
    connectionString :config.Database_URL

})


export const initDb = async()=>{
    try {
        // table 1
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            ID SERIAL PRIMARY KEY,
            name VARCHAR(100),
            email TEXT UNIQUE,
            password TEXT,
            role VARCHAR(100) DEFAULT 'users',
            created_at TIMESTAMP DEFAULT NOW (),
            updated_at TIMESTAMP DEFAULT NOW())`)
         
            console.log('database connected successfully');
            
            // table 2
         await pool.query(`
            CREATE TABLE IF NOT EXISTS issues (
            ID SERIAL PRIMARY KEY,
            users_id INT REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(50),
            description TEXT,
            type VARCHAR(50),
            status VARCHAR(50) DEFAULT 'pending',
            reporter_id INT,
            created_at TIMESTAMP DEFAULT NOW (),
            updated_at TIMESTAMP DEFAULT NOW())`)
    } catch (error) {
        console.log(error);
        
    }
}

