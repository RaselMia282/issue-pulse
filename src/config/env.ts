import dotenv from "dotenv"
import path from "path"
dotenv.config({
    path:path.join(process.cwd(),'.env')
})

const config = {
    port:process.env.PORT || 8000,
    Database_URL:process.env.DATABASE_URL as string,
    jwt_secret: process.env.JWT_SECRET || 'fallback-secret-key-just-in-case',
}
export default config
