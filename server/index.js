import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import previewsRoute from "./Routes/previewsRoute.js";
import mongoose from 'mongoose';

dotenv.config()

const PORT = process.env.PORT
const app = express()
app.use(express.json())
app.use(cors())
mongoose.connect(process.env.MONGO_DB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));


app.use('/api/previews', previewsRoute)


app.listen(PORT, () => {
  console.log(`Сервер запущен на: http://localhost:${PORT}`)
})
