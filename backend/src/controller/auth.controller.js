import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
export const register = async (req, res) => {

    try {

        const { name, email, password, referredBy } = req.body
        if (!name || !email || !password) {

            return res.status(400).json({ success: false, message: "All fields are required" })

        }

        // check existing user

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exist" })

        }


        // hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // Create a user 


        const user = await User.create({

            name,
            email,
            password: hashedPassword,
            referredBy: referredBy || null



        })


        // attach referral
        if (referredBy) {

            await User.findByIdAndUpdate(referredBy, {

                $push: { referrals: user._id }

            })


        }

        return res.status(201).json({ success: true, message: "User created Successfully" })



    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server error" })

    }



}
export const login = async (req, res) => {

    try {

        const { email, password } = req.body

        if (!email || !password) {

            return res.status(400).json({ success: false, message: "All fields are required" })

        }




        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: "User doesnot exists" })

        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {

            return res.status(400).json({ success: false, message: "Invalid Credentials" })

        }
        generateTokenAndSetCookie(user._id, res)

        return res.status(200).json({
            success: true, message: "User logged in successfully", user: {

                ...user._doc, password: undefined

            }
        })

    } catch (error) {

        return res.status(500).json({ success: false, message: "Internal Server Error" })

    }




}
export const logout = async (req, res) => {

    try {
        res.clearCookie("token")
        res.status(200).json({ success: true, message: "Logout successfull" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Sever error" })
    }


}