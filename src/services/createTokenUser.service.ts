import { ITokenUser } from './interfaces/createTokenUser.interface'

export const createTokenUser = ({ name, id, role }: ITokenUser): ITokenUser => {
	return { name, id, role }
}
