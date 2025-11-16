import express from "express"
import { createpost } from "../controler/controler"
import  {getposts} from "../controler/controler"
import { searchpostsadmin } from "../controler/controler"
import { deletepost } from "../controler/controler"
import { getpost } from "../controler/controler"
import { editpost } from "../controler/controler"
import { getsliderposts } from "../controler/controler"
import  {gettopreadingposts} from "../controler/controler"
import { viewpost } from "../controler/controler"

const router=express.Router()

router.post('/createpost',createpost)
router.get('/getposts',getposts)
router.get('/searchadminposts',searchpostsadmin)
router.delete('/deletepost',deletepost)
router.get('/getpost',getpost)
router.post('/editpost',editpost)
router.get('/getsliderposts',getsliderposts)
router.get('/gettopreadingposts',gettopreadingposts)
router.get('/viewpost',viewpost)

export const PostsRoute=router