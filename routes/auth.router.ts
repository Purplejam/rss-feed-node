import express, {Router} from 'express'
import {authenticateUser} from '../middleware/authentication'
import {login, register, showCurrentUser} from '../controllers/auth.controller'

const router: Router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/show-me').get(authenticateUser, showCurrentUser)

export default router