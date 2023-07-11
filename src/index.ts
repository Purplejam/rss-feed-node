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
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'

dotenv.config()

export const app = express()
const swagger_path = path.resolve(__dirname, './swagger.yaml')
const swaggerDoc = YAML.load(swagger_path)

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET as string))
app.use(cors({ origin: 'https://rss-feed-node.onrender.com/', credentials: true }))

app.use(express.static(path.resolve(__dirname, './client/build')))

app.use('/api/v1/feed', rssRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api-use', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
