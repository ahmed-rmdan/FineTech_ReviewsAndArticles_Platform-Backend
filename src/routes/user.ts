import { confirmnewpass, createuser } from "../controler/users";
import { updatename } from "../controler/users";
import {updatepass}  from "../controler/users";
import { resetpass } from "../controler/users";
import { getlikes } from "../controler/users";
import { addlike } from "../controler/users";
import { setlikesandsaves } from "../controler/users";
import { addsave } from "../controler/users";
import { getsaves } from "../controler/users";
import { addscore } from "../controler/users";
import { getuserscores } from "../controler/users";
import { getadminusers } from "../controler/users";
import { banuser } from "../controler/users";
import { signin } from "../controler/users";
import { isadmin } from "../middleware/middleware";
import { creategoogleuser } from "../controler/users";
import { ratelimting } from "../middleware/middleware";
import express from 'express'

const router=express.Router()

/**
 * @swagger
 * /users/createuser:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.post('/createuser',createuser)

/**
 * @swagger
 * /users/updatename:
 *   put:
 *     summary: Update user name
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Name updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put('/updatename',updatename)

/**
 * @swagger
 * /users/updatepass:
 *   put:
 *     summary: Update user password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put('/updatepass',updatepass)

/**
 * @swagger
 * /users/resetpass:
 *   put:
 *     summary: Reset user password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset email sent
 *       400:
 *         description: Bad request
 */
router.put('/resetpass',resetpass)

/**
 * @swagger
 * /users/newpass:
 *   put:
 *     summary: Confirm new password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid token
 */
router.put('/newpass',confirmnewpass)

/**
 * @swagger
 * /users/addlike:
 *   post:
 *     summary: Add a like
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
 *     responses:
 *       200:
 *         description: Like added
 *       401:
 *         description: Unauthorized
 */
router.post('/addlike',addlike)

/**
 * @swagger
 * /users/setlikesandsaves:
 *   get:
 *     summary: Set likes and saves for user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Likes and saves set
 *       401:
 *         description: Unauthorized
 */
router.get('/setlikesandsaves',setlikesandsaves)

/**
 * @swagger
 * /users/addsave:
 *   post:
 *     summary: Add a save
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
 *     responses:
 *       200:
 *         description: Save added
 *       401:
 *         description: Unauthorized
 */
router.post('/addsave',addsave)

/**
 * @swagger
 * /users/getlikes:
 *   get:
 *     summary: Get user likes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of likes
 *       401:
 *         description: Unauthorized
 */
router.get('/getlikes',getlikes)

/**
 * @swagger
 * /users/getsaves:
 *   get:
 *     summary: Get user saves
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of saves
 *       401:
 *         description: Unauthorized
 */
router.get('/getsaves',getsaves)

/**
 * @swagger
 * /users/addscore:
 *   put:
 *     summary: Add score to user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *     responses:
 *       200:
 *         description: Score added
 *       401:
 *         description: Unauthorized
 */
router.put('/addscore',addscore)

/**
 * @swagger
 * /users/getscores:
 *   get:
 *     summary: Get user scores
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User scores
 *       401:
 *         description: Unauthorized
 */
router.get('/getscores',getuserscores)

/**
 * @swagger
 * /users/getadminusers:
 *   get:
 *     summary: Get admin users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of admin users
 *       401:
 *         description: Unauthorized
 */
router.get('/getadminusers',getadminusers)

/**
 * @swagger
 * /users/banuser:
 *   put:
 *     summary: Ban a user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User banned
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put('/banuser',isadmin,banuser)

/**
 * @swagger
 * /users/signin:
 *   post:
 *     summary: Sign in user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Signed in successfully
 *       401:
 *         description: Invalid credentials
 */
router.post('/signin',ratelimting,signin)

/**
 * @swagger
 * /users/creategoogleuser:
 *   post:
 *     summary: Create user with Google
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               googleId:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Google user created
 *       400:
 *         description: Bad request
 */
router.post('/creategoogleuser',creategoogleuser)
export const UserRoutes=router