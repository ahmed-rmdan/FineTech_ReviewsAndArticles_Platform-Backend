import express from "express"
import { createpost } from "../controler/controler"
import  {getposts} from "../controler/controler"
import { searchpostsadmin } from "../controler/controler"
const router=express.Router()

router.post('/createpost',createpost)
router.get('/getposts',getposts)
router.get('/searchadminposts',searchpostsadmin)

export const PostsRoute=router