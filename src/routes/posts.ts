import express from "express"
import { createpost } from "../controler/posts"
import  {getposts} from "../controler/posts"
import { searchpostsadmin } from "../controler/posts"
import { deletepost } from "../controler/posts"
import { getpost } from "../controler/posts"
import { editpost } from "../controler/posts"
import { getsliderposts } from "../controler/posts"
import  {gettopreadingposts} from "../controler/posts"
import { viewpost } from "../controler/posts"
import { isadmin } from "../middleware/middleware"

const router=express.Router()

/**
 * @swagger
 * /posts/createpost:
 *   post:
 *     summary: Create a new post
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Post created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/createpost',isadmin,createpost)

/**
 * @swagger
 * /posts/getposts:
 *   get:
 *     summary: Get all posts
 *     responses:
 *       200:
 *         description: List of posts
 */
router.get('/getposts',getposts)

/**
 * @swagger
 * /posts/searchadminposts:
 *   get:
 *     summary: Search posts for admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search query
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: Search results
 *       401:
 *         description: Unauthorized
 */
router.get('/searchadminposts',searchpostsadmin)

/**
 * @swagger
 * /posts/deletepost:
 *   delete:
 *     summary: Delete a post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Post ID
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
router.delete('/deletepost',isadmin,deletepost)

/**
 * @swagger
 * /posts/getpost:
 *   get:
 *     summary: Get a single post
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post details
 *       404:
 *         description: Post not found
 */
router.get('/getpost',getpost)

/**
 * @swagger
 * /posts/editpost:
 *   post:
 *     summary: Edit a post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Post ID
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       404:
 *         description: Post not found
 */
router.post('/editpost',editpost)

/**
 * @swagger
 * /posts/getsliderposts:
 *   get:
 *     summary: Get slider posts
 *     responses:
 *       200:
 *         description: List of slider posts
 */
router.get('/getsliderposts',getsliderposts)

/**
 * @swagger
 * /posts/gettopreadingposts:
 *   get:
 *     summary: Get top reading posts
 *     responses:
 *       200:
 *         description: List of top reading posts
 */
router.get('/gettopreadingposts',gettopreadingposts)

/**
 * @swagger
 * /posts/viewpost:
 *   get:
 *     summary: View a post (increment view count)
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post viewed
 *       404:
 *         description: Post not found
 */
router.get('/viewpost',viewpost)

export const PostsRoute=router