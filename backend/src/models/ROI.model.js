import mongoose from "mongoose"
import Investment from "./Investment.model.js"
const roiSchema = new mongoose.Schema({




    user: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true


    },
    investment: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Investment",
        required: true



    },
    amount: {

        type: Number,
        required: true

    },
    date: {

        type: String,  //YYYY-MM-DD
        required: true


    },













}, { timestamps: true })
// prevent duplicate ROI for same investment per day
roiSchema.index({ investment: 1, date: 1 }, { unique: true })

const ROI = mongoose.model("ROI", roiSchema)
export default ROI

