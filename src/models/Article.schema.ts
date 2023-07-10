import mongoose from 'mongoose'

export const ArticleSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		link: {
			type: String,
			required: true,
		},
		pubDate: {
			type: String,
			required: true,
		},
		enclosure: {
			required: true,
			type: Object,
			url: {
				type: String,
				required: true,
			},
		},
		content: {
			type: String,
			required: true,
		},
		contentSnippet: {
			type: String,
			required: true,
		},
		guid: {
			type: String,
			required: true,
		},
		categories: {
			type: String,
			required: true,
		},
		isoDate: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true },
)

export const Article = mongoose.model('Article', ArticleSchema)
