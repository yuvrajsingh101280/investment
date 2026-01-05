import User from "../models/User.model.js"
import ROI from "../models/ROI.model.js"
import Investment from "../models/Investment.model.js"
export const getDashboard = async (req, res) => {


    try {


        const userId = req.user.id
        // fetch user


        const user = await User.findById(userId).select(

            "walletBalance totalROI totalLevelIncome"

        )



        // fetch investments


        const investments = await Investment.find({ user: userId }).sort({

            createdAt: -1

        })
        // calculate total invested
        const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0)


        // calculate total ROI from history
        const roiAgg = await ROI.aggregate([

            { $match: { user: user._id } },

            { $group: { _id: null, total: { $sum: "$amount" } } }

        ])

        const totalROI = roiAgg[0]?.total || 0

        return res.json({


            walletBalance: user.walletBalance,
            totalInvested,
            totalROI,
            totalLevelIncome: user.totalLevelIncome,
            investments

        })

    } catch (error) {
        return res.status(500).json({ message: error.message })

    }





}