import { Router } from "express";
import { usersControllar } from "./users.controller";
const router = Router()
router.post("/signup",usersControllar.createUsers)
router.post("/login",usersControllar.loginUsers)
export const usersRoutes = router

