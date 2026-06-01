import express, {
  type Application,
  type Request,
  type Response,
} from "express";


const app: Application = express();
app.use(express.json())


app.get("/", (req: Request, res: Response) => {
  res.send("issue pulse project");
});


export default app;
