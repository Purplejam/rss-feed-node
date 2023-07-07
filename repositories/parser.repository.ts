import {Article} from '../models/Article.schema'
import {IArticle} from '../models/interfaces/Article.interface'
import {IQueryObject} from '../controllers/interfaces/query.interface'
import {querySortingMap} from '../controllers/sortingMap'

export const feedDeleteMany = async() => {
	const {deletedCount} = await Article.deleteMany({})
	return deletedCount
}

export const createNewFeed = async(articles: IArticle[]) => {
	const newFeed = await Article.create(articles)
	return newFeed
}

export const queryArticles = async({category, searchQuery, sorting, page, limit, skip}: IQueryObject) => {
	let queryObject: any = {}
	if(category && category !== '' && category !== 'Усі') {
 	queryObject.categories = { $regex: category, $options: 'i' }
 }

 if(searchQuery && searchQuery !== '') {
 	queryObject.contentSnippet = { $regex: searchQuery, $options: 'i' }
 }

 let articles = Article.find(queryObject)

 if(sorting && sorting !== '') {
 	articles = articles.sort(querySortingMap.get(sorting))
 }

 articles = articles.skip(skip).limit(limit) 
 const result = await articles
 const totalArticles = await Article.countDocuments(queryObject)
 return {result, totalArticles}
}

