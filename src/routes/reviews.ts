import Express from 'express'
import { createreview } from '../controler/reviews'
import { getreviews } from '../controler/reviews'
import { getsearchreviews } from '../controler/reviews'
import { deletereview } from '../controler/reviews'
import { getreview } from '../controler/reviews'
import { editreview } from '../controler/reviews'
import { gethomereviews } from '../controler/reviews'
import { viewreview } from '../controler/reviews'

const router=Express.Router()

router.post('/createreview',createreview)
router.get('/getreviews',getreviews)
router.get('/getsearchreviews',getsearchreviews)
router.delete('/deletereview',deletereview)
router.get('/getreview',getreview)
router.put('/editreview',editreview)
router.get('/gethomereviews',gethomereviews)
router.get('/viewreview',viewreview)

export const ReviewsRoutes=router