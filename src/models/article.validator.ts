import { IsString, IsBoolean, IsObject, IsDate, ValidateNested } from 'class-validator'

class Enclosure {
	@IsString()
	url: string
}

export class ArticleValidator {
	@IsString()
	title: string

	@IsString()
	link: string

	@IsString()
	pubDate: string

	@ValidateNested()
	enclosure: Enclosure

	@IsString()
	content: string

	@IsString()
	contentSnippet: string

	@IsString()
	guid: string

	@IsString()
	categories: string

	@IsDate()
	isoDate: Date
}
