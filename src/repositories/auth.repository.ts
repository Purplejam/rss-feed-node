import mongoose from 'mongoose'
import { INewUser } from '../services/interfaces/newUser.interface'
import { ITokenSchema } from '../models/interfaces/TokenSchema.interface'
import { ITokenUser } from '../services/interfaces/createTokenUser.interface'
import { IUserSchema } from '../models/interfaces/UserSchema.interface'
import { Token } from '../models/TokenSchema'
import { User } from '../models/UserSchema'

export const findUserRepository = async (email: string): Promise<null | IUserSchema> => {
	const user = await User.findOne({ email })
	if (!user) return null
	return user
}

export const createUserRepository = async ({
	name,
	email,
	password,
	role,
	verificationToken,
}: INewUser): Promise<null | IUserSchema> => {
	const user = await User.create({ name, email, password, role, verificationToken })
	if (!user) return null
	return user
}

export const findTokenRepository = async (user: string): Promise<null | ITokenSchema> => {
	const token = await Token.findOne({ user })
	if (!token) return null
	return token
}

export const deleteTokenRepository = async (user: string): Promise<void> => {
	const token = await Token.findOneAndDelete({ user })
}

export const createTokenRepository = async ({
	refreshToken,
	ip,
	userAgent,
	user,
}: ITokenSchema): Promise<null | ITokenSchema> => {
	const token = await Token.create({ refreshToken, ip, userAgent, user })
	if (!token) return null
	return token
}
