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