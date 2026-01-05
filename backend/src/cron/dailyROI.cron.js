import cron from "node-cron";
import { calculateDailyROI } from "../controller/roi.controller.js";

const startDailyROICron = () => {
    // Runs every day at 00:00 (midnight)
    cron.schedule("0 0 * * *", async () => {
        console.log("Running daily ROI cron...");
        await calculateDailyROI();
    });
};

export default startDailyROICron;
