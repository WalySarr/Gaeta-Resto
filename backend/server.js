import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"





// App Config
const app = express()
const port = 4000


//middleware
app.use(express.json())
app.use(cors())
// DB connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})

