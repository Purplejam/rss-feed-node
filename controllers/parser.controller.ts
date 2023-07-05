import {refreshFeedService} from '../services/parse.service'
import {Request, Response} from 'express'
import {StatusCodes} from 'http-status-codes'
import {Article} from '../models/Article.schema'
import {feedDeleteMany, createNewFeed} from '../repositories/parser.repository'
import {fetch} from 'undici'

export const parseController = async (req: Request, res: Response) => {
	const {newFeedCount} = await refreshFeedService()
	res.status(StatusCodes.OK).json({articlesCount: newFeedCount})
}


export const queryFeedController = async (req: Request, res: Response) => {
	const {newFeedCount} = await refreshFeedService()
	res.status(StatusCodes.OK).json({message: 'new request', count: newFeedCount})
}

