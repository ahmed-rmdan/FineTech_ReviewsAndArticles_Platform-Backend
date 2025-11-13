import express from "express"
import { createpost } from "../controler/controler"

const router=express.Router()

router.post('/createpost',createpost)



export const PostsRoute=router