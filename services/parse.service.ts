import Parser from 'rss-parser'
import {IArticle} from '../models/interfaces/Article.interface'
import {createNewFeed, feedDeleteMany} from '../repositories/parser.repository'

export const parseService = async (url: string) => {
	const parser = new Parser()
	const feed = await parser.parseURL(url)
	const feedItems = feed.items as IArticle[]
	const articles: IArticle[] = []

	feedItems.forEach((item: IArticle) => {
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
			categories: item.categories,
			isoDate: item.isoData ? item.isoData : item.isoDate, 
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


