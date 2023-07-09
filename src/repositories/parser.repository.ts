import { Article } from '../models/Article.schema'
import { IArticle, IArticleSchema } from '../models/interfaces/Article.interface'
import { IQueryObject } from '../controllers/interfaces/query.interface'
import { querySortingMap } from '../controllers/sortingMap'
import { IUpdateArticle } from '../controllers/interfaces/updateArticle.interface'
import { IRemoveArticle } from '../controllers/interfaces/removeArticle.interface'


interface queryArticlesReturnType {
	totalArticles: number,
	result: IArticleSchema[]
}

export const feedDeleteMany = async (): Promise<number> => {
	const { deletedCount } = await Article.deleteMany({})
	return deletedCount
}

export const createNewFeed = async (articles: IArticle[]): Promise<IArticleSchema[]> => {
	const newFeed = await Article.create(articles)
	return newFeed
}

export const queryArticles = async ({
	category,
	searchQuery,
	sorting,
	page,
	limit,
	skip,
}: IQueryObject): Promise<queryArticlesReturnType> => {
	const queryObject: any = {}
	if (category && category !== '' && category !== 'Усі') {
		queryObject.categories = { $regex: category, $options: 'i' }
	}

	if (searchQuery && searchQuery !== '') {
		queryObject.contentSnippet = { $regex: searchQuery, $options: 'i' }
	}

	let articles = Article.find(queryObject)

	if (sorting && sorting !== '') {
		articles = articles.sort(querySortingMap.get(sorting))
	}

	articles = articles.skip(skip).limit(limit)
	const result = await articles
	const totalArticles = await Article.countDocuments(queryObject)
	return { result, totalArticles }
}

export const updateArticle = async ({ guid, newTextContent }: IUpdateArticle): Promise<null | IArticleSchema> => {
	const filter = { guid }
	const update = { contentSnippet: newTextContent }
	const updatedArticle = await Article.findOneAndUpdate(filter, update)
	return updatedArticle
}

export const deleteArticle = async ({ guid }: IRemoveArticle): Promise<number> => {
	const { deletedCount } = await Article.deleteOne({ guid })
	return deletedCount
}
