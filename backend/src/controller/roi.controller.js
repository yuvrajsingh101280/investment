import Investment from "../models/Investment.model.js";
import ROI from "../models/ROI.model.js";
import User from "../models/User.model.js";
import { distributeReferralIncome } from "../utils/referral.util.js";

export const calculateDailyROI = async () => {
    const today = new Date().toISOString().split("T")[0];

    const investments = await Investment.find({
        status: "active"
    }).populate("user");

    for (const inv of investments) {
        // check investment expiry
        if (new Date() > inv.endDate) {
            inv.status = "completed";
            await inv.save();
            continue;
        }

        // idempotency check
        const exists = await ROI.findOne({
            investment: inv._id,
            date: today
        });
        if (exists) continue;

        const roiAmount =
            (inv.amount * inv.dailyROIPercent) / 100;

        // save ROI history
        await ROI.create({
            user: inv.user._id,
            investment: inv._id,
            amount: roiAmount,
            date: today
        });

        // update user wallet
        const user = await User.findById(inv.user._id);
        user.walletBalance += roiAmount;
        user.totalROI += roiAmount;
        await user.save();

        // distribute referral income
        await distributeReferralIncome(
            user._id,
            roiAmount,
            today
        );
    }
};
