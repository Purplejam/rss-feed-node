import {Article} from '../models/Article.schema'
import {IArticle} from '../models/interfaces/Article.interface'

export const feedDeleteMany = async() => {
	const {deletedCount} = await Article.deleteMany({})
	return deletedCount
}

export const createNewFeed = async(articles: IArticle[]) => {
	const newFeed = await Article.create(articles)
	return newFeed
}

