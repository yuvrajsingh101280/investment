import express from "express"
import { calculateDailyROI } from "../controller/roi.controller.js"
const router = express.Router()


router.get("/run-roi", async (req, res) => {

    await calculateDailyROI()
    res.send("ROI calculated")

})

export default router