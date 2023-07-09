import { ITokenUser } from './services/interfaces/createTokenUser.interface'

declare global {
	namespace Express {
		export interface Request {
			user?: ITokenUser
		}
	}
}

export {}
