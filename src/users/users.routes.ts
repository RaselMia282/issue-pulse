import { Router } from "express";
import { usersControllar } from "./users.controllar";

const router = Router()
router.post("/signup",usersControllar.createUsers)

export const usersRoutes = router
