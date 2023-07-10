import { IsString, IsEmail, IsOptional, IsBoolean, IsDate } from 'class-validator'

export class UserValidator {
	@IsString()
	name: string

	@IsString()
	password: string

	@IsEmail()
	email: string

	@IsString()
	@IsOptional()
	role?: string

	@IsString()
	@IsOptional()
	verificationToken?: string

	@IsBoolean()
	@IsOptional()
	isVerified?: boolean

	@IsString()
	@IsOptional()
	verified?: string

	@IsString()
	@IsOptional()
	passwordToken?: string

	@IsDate()
	@IsOptional()
	passwordTokenExpirationDate?: Date
}
