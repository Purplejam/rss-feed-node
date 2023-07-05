import express, {Router} from 'express'
import {parseController, queryFeedController} from '../controllers/parser.controller'

const router: Router = express.Router()

router.route('/').get(parseController)
router.route('/articles').get(queryFeedController)

export default router