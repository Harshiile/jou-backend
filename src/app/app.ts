import express, { Request, Response } from 'express'
import router from '../routes/route'
import dotenv from 'dotenv'
import cors from 'cors'
import CookieParser from 'cookie-parser'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
app.use(CookieParser())
app.use('/api', router)

export default app