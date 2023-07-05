import 'express-async-errors'
import express from 'express'
import rssRouter from './routes/rss.router'
import dotenv from 'dotenv'
dotenv.config()


export const app = express()

app.use(express.json())

app.use('/api/v1/feed', rssRouter)
