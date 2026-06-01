import dotenv from "dotenv"
import path from "path"
dotenv.config({
    path:path.join(process.cwd(),'.env')
})

const config = {
    port:process.env.PORT || 3000,
    Database_URL:process.env.DATABASE_URL as string,
}
export default config
