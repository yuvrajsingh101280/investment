import mongoose from "mongoose"
const referralSchema = new mongoose.Schema({


    fromUser: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true


    },
    toUser: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true


    },
    level: {

        type: Number,
        required: true,


    },


    amount: {


        type: Number,
        required: true

    },

    date: {

        type: String,
        required: true



    }



}, { timestamps: true })


const Referral = mongoose.model("Referral", referralSchema)
export default Referral