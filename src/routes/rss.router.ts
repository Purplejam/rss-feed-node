import express, { Router } from 'express'
import {
	parseController,
	queryFeedController,
	updateSingleArticleController,
	deleteSingleArticleController,
} from '../controllers/parser.controller'
import { authenticateUser } from '../middleware/authentication'

const router: Router = express.Router()

router.route('/').get(parseController)
router.route('/articles').get(queryFeedController)
router.route('/update-article').patch(authenticateUser, updateSingleArticleController)
router.route('/remove-article').delete(authenticateUser, deleteSingleArticleController)

export default router
