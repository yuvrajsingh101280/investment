import mongoose from "mongoose"
const connectTODB = async () => {


    try {

        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo DB connnected successfully")

    } catch (error) {


        console.log("Errro in connecting database", error.message)

    }



}
export default connectTODB;
