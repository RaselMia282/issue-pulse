import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { usersRoutes } from "./modules/users/users.routes";
import logger from "./middleware/logger";
import { issuesRouter } from "./modules/issues/issues.routes";


const app: Application = express();
app.use(express.json())
app.use(logger)
app.use("/api/auth",usersRoutes)
app.use("/api/issues",issuesRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("issue pulse project");
});


export default app;
