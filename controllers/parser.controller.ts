import { queryFeedService, refreshFeedService} from '../services/parse.service'
import {Request, Response} from 'express'
import {StatusCodes} from 'http-status-codes'
import {Article} from '../models/Article.schema'
import {feedDeleteMany, createNewFeed} from '../repositories/parser.repository'
import {fetch} from 'undici'
import {querySortingMap} from './sortingMap'
import { BadRequestError } from '../errors'

export const parseController = async (req: Request, res: Response) => {
	const {newFeedCount} = await refreshFeedService()
	if (!newFeedCount) {
		throw new BadRequestError('Bad request: Oops, something went wrong!')
	}
	res.status(StatusCodes.OK).json({articlesCount: newFeedCount})
}


export const queryFeedController = async (req: Request, res: Response) => {
	const {category, searchQuery, sorting} = req.query
	const page = Number(req.query.page) || 1
 const limit = Number(req.query.limit) || 6
 const skip = (page - 1) * limit
 const {result, totalArticles} = await queryFeedService({category, searchQuery, sorting, page, limit, skip})
	if (!result) {
		throw new BadRequestError('Bad request: Oops, something went wrong!')
	}
 res.status(StatusCodes.OK).json({total: totalArticles, articles: result})
}

