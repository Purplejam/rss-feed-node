import crypto from 'crypto'
import mongoose from 'mongoose'
import {attachCookieService, registerService, } from '../services/auth.service'
import {attachCookiesToResponse} from '../services/jwt.service'
import {createTokenUser} from '../services/createTokenUser.service'
import {CustomAPIError, BadRequestError, NotFoundError, UnauthenticatedError} from '../errors'
import {ITokenUser} from '../services/interfaces/createTokenUser.interface'
import {Request, Response} from 'express'
import {StatusCodes} from 'http-status-codes'
import {Token} from '../models/TokenSchema'
import {User} from '../models/UserSchema'


export const register = async (req: Request, res: Response): Promise<void | Response> => {
  const {email, name, password} = req.body
  if (!email || !name || !password) {
    throw new BadRequestError('Please provide email, name and password')
  }
  const emailAlreadyExists = await User.findOne({email})
  if (emailAlreadyExists) {
    throw new BadRequestError('Email already exists')
  }
  const user = await registerService(email, name, password)
  if(!user) {
    return res.status(StatusCodes.BAD_REQUEST)
  }
  res.status(StatusCodes.CREATED).json({
    msg: 'Success! New user has been created'
  })
}


export const login = async (req: Request, res: Response): Promise<void | Response> => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isUserVerified = user.isVerified
  if (!isUserVerified) {
    throw new BadRequestError('Please verify your email')
  }
  const tokenUser = await attachCookieService(req, res, user)
  return res.status(StatusCodes.OK).json({user: tokenUser})
}



export const showCurrentUser = async(req: Request, res: Response): Promise<void | Response> => {
  if(req.user) {
    return res.status(StatusCodes.OK).json({user: req.user})
  } else {
    res.status(StatusCodes.OK).json({msg: 'There is no user, please login'})
  }
}




