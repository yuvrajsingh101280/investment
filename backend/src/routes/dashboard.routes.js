import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { getDashboard } from "../controller/dashboard.controller.js"


const router = express.Router()


router.get("/", authMiddleware, getDashboard)

export default router