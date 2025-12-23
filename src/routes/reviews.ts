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

/**
 * @swagger
 * /reviews/createreview:
 *   post:
 *     summary: Create a new review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review created successfully
 *       400:
 *         description: Bad request
 */
router.post('/createreview',createreview)

/**
 * @swagger
 * /reviews/getreviews:
 *   get:
 *     summary: Get all reviews
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.get('/getreviews',getreviews)

/**
 * @swagger
 * /reviews/getsearchreviews:
 *   get:
 *     summary: Search reviews
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: Search results
 */
router.get('/getsearchreviews',getsearchreviews)

/**
 * @swagger
 * /reviews/deletereview:
 *   delete:
 *     summary: Delete a review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Review ID
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 */
router.delete('/deletereview',deletereview)

/**
 * @swagger
 * /reviews/getreview:
 *   get:
 *     summary: Get a single review
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review details
 *       404:
 *         description: Review not found
 */
router.get('/getreview',getreview)

/**
 * @swagger
 * /reviews/editreview:
 *   put:
 *     summary: Edit a review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Review ID
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       404:
 *         description: Review not found
 */
router.put('/editreview',editreview)

/**
 * @swagger
 * /reviews/gethomereviews:
 *   get:
 *     summary: Get home reviews
 *     responses:
 *       200:
 *         description: List of home reviews
 */
router.get('/gethomereviews',gethomereviews)

/**
 * @swagger
 * /reviews/viewreview:
 *   get:
 *     summary: View a review (increment view count)
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review viewed
 *       404:
 *         description: Review not found
 */
router.get('/viewreview',viewreview)

export const ReviewsRoutes=router