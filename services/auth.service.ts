import crypto from 'crypto'
import {attachCookiesToResponse} from './jwt.service'
import {BadRequestError, UnauthenticatedError} from '../errors'
import {createTokenUser} from './createTokenUser.service'
import {hashString} from './createHash'
import {ITokenUser} from './interfaces/createTokenUser.interface'
import {IUserSchema} from '../models/interfaces/UserSchema.interface'
import {Request, Response} from 'express'
import {StatusCodes} from 'http-status-codes'
import {Token} from '../models/TokenSchema'
import {User} from '../models/UserSchema'
import {createTokenRepository, findTokenRepository, createUserRepository, findUserRepository} from '../repositories/auth.repository';


export const registerService = async(email: string, name: string, password: string): Promise<null | IUserSchema> => {
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'
  const verificationToken = crypto.randomBytes(20).toString('hex')
  const user = await createUserRepository({name, email, password, role, verificationToken})
  return user
}


export const attachCookieService = async(req: Request, res: Response, user: IUserSchema): Promise<void | ITokenUser> => {
 const tokenUser = createTokenUser({name: user.name, id: user._id, role: user.role})
 let refreshToken = ''
 let existingToken = await findTokenRepository(user._id)
 //1) if token exists and isValid
 if (existingToken) {
   const {isValid} = existingToken
   if (!isValid) {
     throw new UnauthenticatedError('Invalid Credentials')
   }
   refreshToken = existingToken.refreshToken
   attachCookiesToResponse(res, tokenUser, refreshToken)
  //2) if token doesn't exist
 } else {
  refreshToken = crypto.randomBytes(20).toString('hex')
  const userAgent = req.headers['user-agent'] as string
  const ip = req.ip
  const userToken = {
    refreshToken, 
    isValid: true,
    ip, 
    userAgent, 
    user: user._id}
  await createTokenRepository(userToken)
  attachCookiesToResponse(res, tokenUser, refreshToken) 
 }
 return tokenUser
}
