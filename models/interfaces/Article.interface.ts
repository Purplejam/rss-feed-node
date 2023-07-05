export interface IArticle {
	title: string,
	link: string,
	pubDate: string,
	enclosure: {
		url: string
	},
	content: string,
	contentSnippet: string,
	guid: string,
	categories: string[],
	isoDate: string,
	pubData?: string, 
	isoData?: string, 
}