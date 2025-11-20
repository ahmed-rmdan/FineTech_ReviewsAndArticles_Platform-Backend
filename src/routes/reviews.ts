import Express from 'express'
import { createreview } from '../controler/reviews'

const router=Express.Router()

router.post('/createreview',createreview)

export const ReviewsRoutes=router