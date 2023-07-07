import {stringParseType} from './stringParse.interface'

export interface IQueryObject {
	category?: stringParseType,
	searchQuery?: stringParseType,
	sorting?: stringParseType,
	page?: number, 
	limit: number, 
	skip: number
}
