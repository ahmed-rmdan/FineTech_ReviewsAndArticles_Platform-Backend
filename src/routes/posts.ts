import express from "express"
import { createpost } from "../controler/controler"
import  {getposts} from "../controler/controler"
import { searchpostsadmin } from "../controler/controler"
import { deletepost } from "../controler/controler"
const router=express.Router()

router.post('/createpost',createpost)
router.get('/getposts',getposts)
router.get('/searchadminposts',searchpostsadmin)
router.delete('/deletepost',deletepost)

export const PostsRoute=router