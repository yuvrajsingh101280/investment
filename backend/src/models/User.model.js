import mongoose from "mongoose";
const userSchema = new mongoose.Schema(


    {

        name: {
            type: String,
            required: true,
            trim: true


        },

        email: {

            type: String,
            required: true,
            unique: true,
            lowercase: true,

        },
        password: {

            type: String,
            required: true,

        },

        // referall system

        referredBy: {

            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null

        },

        referrals: [

            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"

            }

        ],
        // Wallet & income
        walletBalance: {


            type: Number,
            default: 0

        },


        totalROI: {

            type: Number,
            default: 0

        },



        totalLevelIncome: {

            type: Number,
            default: 0

        }




    },

    { timestamps: true }



)



const User = mongoose.model("User", userSchema)
export default User