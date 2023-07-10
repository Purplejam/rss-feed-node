import { IsString, IsBoolean } from 'class-validator'

export class TokenValidator {
	@IsString()
	refreshToken: string

	@IsString()
	ip: string

	@IsString()
	userAgent: string

	@IsBoolean()
	isValid: boolean

	@IsString()
	user: string
}
