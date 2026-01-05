import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { createInvestment } from "../controller/investment.controller.js"
const router = express.Router()


router.post("/", authMiddleware, createInvestment)


export default router