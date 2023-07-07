import 'express-async-errors'
import express from 'express'
import rssRouter from './routes/rss.router'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()


export const app = express()

app.use(express.json())

app.use(cors())

app.use('/api/v1/feed', rssRouter)
