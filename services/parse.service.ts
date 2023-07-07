import Parser from 'rss-parser'
import {IArticle} from '../models/interfaces/Article.interface'
import {createNewFeed, feedDeleteMany, queryArticles} from '../repositories/parser.repository'
import {IQueryObject} from '../controllers/interfaces/query.interface'

export const parseService = async (url: string) => {
	const parser = new Parser()
	const feed = await parser.parseURL(url)
	const feedItems = feed.items
	const articles: IArticle[] = []

	feedItems.forEach((item: any) => {
		const newArticle: IArticle = {
			title: item.title,
			link: item.link, 
			pubDate: item.pubData ? item.pubData : item.pubDate, 
			enclosure: {
				url: item.enclosure.url
			}, 
			content: item.content, 
			contentSnippet: item.contentSnippet, 
			guid: item.guid, 
			categories: item.categories[0],
			isoDate: item.isoData ? new Date(item.isoData) : new Date(item.isoDate), 
		}
		articles.push(newArticle)
	})

	return articles
}


export const refreshFeedService = async() => {
	const url = process.env.PARSE_URL || 'https://nv.ua/ukr/rss/all.xml'
	const articles = await parseService(url)
	const deletedFeed = await feedDeleteMany()
	const newFeed = await createNewFeed(articles)
	const newFeedCount = newFeed.length
	return {newFeed, newFeedCount}
}


export const queryFeedService = async({category, searchQuery, sorting, page, limit, skip}: IQueryObject) => {
	const {result, totalArticles} = await queryArticles({category, searchQuery, sorting, page, limit, skip})
	return {result, totalArticles}
}

