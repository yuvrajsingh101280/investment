import mongoose from "mongoose"


const investmentSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },


    amount: {

        type: Number,
        required: true,

    },
    plan: {
        type: String,
        required: true
    },


    dailyROIPercent: {

        type: Number,
        required: true,

    },
    startDate: {

        type: Date,
        default: Date.now

    },
    endDate: {

        type: Date,
        required: true

    },


    status: {


        type: String,
        enum: ["active", "completed"],
        default: "active"

    }


}, { timestamps: true })

const Investment = mongoose.model("Investment", investmentSchema)
export default Investment