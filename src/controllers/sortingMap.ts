import { stringParseType } from './interfaces/stringParse.interface'

export const querySortingMap = new Map<stringParseType, string>([
	['Спочатку нові', '-isoDate'],
	['Спочатку старі', 'isoDate'],
])
