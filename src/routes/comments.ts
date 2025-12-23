import express from "express"
import { getcomments } from "../controler/comments"
import { addcomment } from "../controler/comments"
import { addsubcomment } from "../controler/comments"
import { addcommentlike } from "../controler/comments"
import { getadmincomments } from "../controler/comments"
import { deletecomment } from "../controler/comments"
const router=express.Router()

/**
 * @swagger
 * /comments/getcomments:
 *   get:
 *     summary: Get comments
 *     parameters:
 *       - in: query
 *         name: itemId
 *         schema:
 *           type: string
 *         description: Item ID (post or review)
 *     responses:
 *       200:
 *         description: List of comments
 */
router.get('/getcomments',getcomments)

/**
 * @swagger
 * /comments/addcomment:
 *   post:
 *     summary: Add a comment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *               itemType:
 *                 type: string
 *                 enum: [post, review]
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment added
 *       401:
 *         description: Unauthorized
 */
router.post('/addcomment',addcomment)

/**
 * @swagger
 * /comments/addsubcomment:
 *   post:
 *     summary: Add a subcomment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentId:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Subcomment added
 *       401:
 *         description: Unauthorized
 */
router.post('/addsubcomment',addsubcomment)

/**
 * @swagger
 * /comments/addcommentlike:
 *   put:
 *     summary: Add like to comment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Like added to comment
 *       401:
 *         description: Unauthorized
 */
router.put('/addcommentlike',addcommentlike)

/**
 * @swagger
 * /comments/getadmincomments:
 *   get:
 *     summary: Get admin comments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of admin comments
 *       401:
 *         description: Unauthorized
 */
router.get('/getadmincomments',getadmincomments)

/**
 * @swagger
 * /comments/deletecomment:
 *   put:
 *     summary: Delete a comment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put('/deletecomment',deletecomment)
export const CommentsRouter=router