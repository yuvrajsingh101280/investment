import Investment from "../models/Investment.model.js";
import { INVESTMENT_PLANS } from "../utils/investmentPlans.js";
export const createInvestment = async (req, res) => {

    try {

        const { amount, plan } = req.body;
        const userId = req.user.id


        const selectedPlan = INVESTMENT_PLANS[plan]

        if (!selectedPlan) {
            return res.status(400).json({ success: false, message: "Invalid plan" })


        }

        const startDate = new Date()
        const endDate = new Date()


        endDate.setDate(endDate.getDate() + selectedPlan.durationDays)
        const investment = await Investment.create({

            user: userId,
            amount,
            plan,
            dailyROIPercent: selectedPlan.dailyROI,
            startDate,
            endDate



        })
        return res.status(201).json({ success: true, message: "Investment created", investment })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })

    }




}