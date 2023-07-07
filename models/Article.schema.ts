import mongoose from 'mongoose'

export const ArticleSchema = new mongoose.Schema({
	title: {
		type: String
	},
	link: {
		type: String
	},
		pubDate: {
		type: String
	},
		enclosure: {
			url: {
				type: String
			}
	},
		content: {
		type: String
	},
		contentSnippet: {
		type: String
	},
		guid: {
		type: String
	},
	categories: {
		type: String
	},
	isoDate: {
		type: Date
	}
}, {timestamps: true})


export const Article = mongoose.model('Article', ArticleSchema)