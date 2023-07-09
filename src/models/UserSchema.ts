import mongoose from 'mongoose'
import { IUserSchema } from './interfaces/UserSchema.interface'
import bcrypt from 'bcryptjs'

export const UserSchema = new mongoose.Schema<IUserSchema>({
	name: {
		type: String,
		required: [true, 'Please, provide name'],
		minlength: 3,
		maxlength: 50,
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'Please, provide email'],
	},
	password: {
		type: String,
		required: [true, 'Please, provide password'],
		minlength: 6,
	},
	role: {
		type: String,
		enum: ['admin', 'user', 'testUser'],
		default: 'user',
	},
	verificationToken: {
		type: String,
	},
	isVerified: {
		type: Boolean,
		default: true,
	},
	verified: {
		type: Date,
	},
	passwordToken: {
		type: String,
	},
	passwordTokenExpirationDate: {
		type: Date,
	},
})

UserSchema.pre('save', async function (): Promise<void> {
	if (!this.isModified('password')) return
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (canditatePassword: string): Promise<boolean> {
	const isMatch = await bcrypt.compare(canditatePassword, this.password)
	return isMatch
}

export const User = mongoose.model('User', UserSchema)
