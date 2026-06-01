import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { usersRoutes } from "./users/users.routes";


const app: Application = express();
app.use(express.json())
app.use("/api/auth/",usersRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("issue pulse project");
});


export default app;
