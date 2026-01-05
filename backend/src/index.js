import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectTODB from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import investmentRoutes from "./routes/investment.routes.js"
import cookieParser from "cookie-parser";
import dashboardRoutes from "./routes/dashboard.routes.js"
import testRoutes from "./routes/test.routes.js"
import startDailyROICron from "./cron/dailyROI.cron.js"
dotenv.config()

const app = express()


// call DB
connectTODB()
// start cron job
startDailyROICron()
// port
const port = process.env.PORT
// middleware
app.use(express.json())
app.use(cookieParser())
// cors
const allowedOrigins = [
    "http://localhost:5173",

];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

// routes

app.use("/api/auth", authRouter)
app.use("/api/investments", investmentRoutes)
app.use("/api/dashboard", dashboardRoutes)
// test route
app.use("/test", testRoutes)
app.get("/", (req, res) => {

    res.send("Api is working ")


})

app.listen(port, () => {

    console.log(`Server is running at http://localhost:${port}`)

})