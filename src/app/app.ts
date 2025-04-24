import express, { Request, Response } from 'express'
import router from '../routes/route'
import dotenv from 'dotenv'
const app = express()
dotenv.config()
app.use(express.json())
app.use('/api', router)

export default app