import Referral from "../models/Referral.model.js";
import User from "../models/User.model.js";


const LEVEL_PERCENTAGES = {

    1: 5,
    2: 2,
    3: 1



}


export const distributeReferralIncome = async (fromUserId, roiAmount, date) => {

    let currentUserId = fromUserId;
    let level = 1


    while (level <= 3) {

        const user = await User.findById(currentUserId)

        if (!user || !user.referredBy) break;

        const upline = await User.findById(user.referredBy)
        if (!upline) break;


        const percent = LEVEL_PERCENTAGES[level]
        const income = (roiAmount * percent) / 100

        upline.walletBalance += income
        upline.totalLevelIncome += income
        await upline.save()

        // save referral history

        await Referral.create({
            fromUser: fromUserId,
            toUser: upline._id,
            level,
            amount: income,
            date


        })

        currentUserId = upline._id
        level++


    }


}