import mongoose from 'mongoose'

export interface IArticle {
	title: string
	link: string
	pubDate: string
	enclosure: {
		url: string
	}
	content: string
	contentSnippet: string
	guid: string
	categories: string
	isoDate: Date
	pubData?: string
	isoData?: string
}

export interface IArticleSchema extends mongoose.Document {
	title: string
	link: string
	pubDate: string
	enclosure: {
		url: string
	}
	content: string
	contentSnippet: string
	guid: string
	categories: string
	isoDate: Date
	pubData?: string
	isoData?: string
}
