import jwt from "jsonwebtoken"
import User from "../models/User.model.js"
export const authMiddleware = async (req, res, next) => {


    try {
        const token = req.cookies.token
        if (!token) {

            return res.status(400).json({ success: false, message: "Token is missing" })

        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {

            return res.status(400).json({ success: false, message: "Invalid token " })


        }


        const user = await User.findById(decoded.userId)
        if (!user) {

            return res.status(400).json({ success: false, message: "unauthorized  - user not found" })


        }
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }

}