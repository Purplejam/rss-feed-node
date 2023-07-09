import {
	queryFeedService,
	refreshFeedService,
	updateSingleArticleService,
	deleteSingleArticleService,
} from '../services/parse.service'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Article } from '../models/Article.schema'
import { feedDeleteMany, createNewFeed } from '../repositories/parser.repository'
import { fetch } from 'undici'
import { querySortingMap } from './sortingMap'
import { BadRequestError } from '../errors'

export const parseController = async (req: Request, res: Response): Promise<void> => {
	const { newFeedCount } = await refreshFeedService()
	if (!newFeedCount) {
		throw new BadRequestError('Bad request: Oops, something went wrong!')
	}
	res.status(StatusCodes.OK).json({ articlesCount: newFeedCount })
}

export const queryFeedController = async (req: Request, res: Response): Promise<void> => {
	const { category, searchQuery, sorting } = req.query
	const page = Number(req.query.page) || 1
	const limit = Number(req.query.limit) || 6
	const skip = (page - 1) * limit
	const { result, totalArticles } = await queryFeedService({
		category,
		searchQuery,
		sorting,
		page,
		limit,
		skip,
	})
	if (!result) {
		throw new BadRequestError('Bad request: Oops, something went wrong!')
	}
	res.status(StatusCodes.OK).json({ total: totalArticles, articles: result })
}

export const updateSingleArticleController = async (req: Request, res: Response): Promise<void> => {
	const { guid, newTextContent } = req.body
	if (!guid || !newTextContent || newTextContent.length > 350) {
		throw new BadRequestError('Bad request: Oops, something went wrong!')
	}
	const updatedArticle = await updateSingleArticleService({ guid, newTextContent })
	res.status(StatusCodes.OK).json({ newArticle: updatedArticle })
}

export const deleteSingleArticleController = async (req: Request, res: Response): Promise<void> => {
	const { guid } = req.query
	console.log(guid)
	if (!guid) {
		throw new BadRequestError('Bad request: Oops, something went wrong!')
	}
	const deletedCount = await deleteSingleArticleService({ guid })
	res.status(StatusCodes.OK).json({ deletedCount })
}
