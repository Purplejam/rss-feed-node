import 'express-async-errors'
import 'reflect-metadata'
import express from 'express'
import path from 'path'
import rssRouter from './routes/rss.router'
import authRouter from './routes/auth.router'
import dotenv from 'dotenv'
import cors from 'cors'
import { notFoundMiddleware } from './middleware/notFound'
import { errorHandlerMiddleware } from './middleware/errorHandler'
import cookieParser from 'cookie-parser'

dotenv.config()

export const app = express()

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET as string))
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

app.use(express.static(path.resolve(__dirname, './client/build')))

app.use('/api/v1/feed', rssRouter)
app.use('/api/v1/auth', authRouter)
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
