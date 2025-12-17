import express from "express"
import { getcomments } from "../controler/comments"
import { addcomment } from "../controler/comments"
import { addsubcomment } from "../controler/comments"
import { addcommentlike } from "../controler/comments"
import { getadmincomments } from "../controler/comments"
import { deletecomment } from "../controler/comments"
const router=express.Router()

router.get('/getcomments',getcomments)
router.post('/addcomment',addcomment)
router.post('/addsubcomment',addsubcomment)
router.put('/addcommentlike',addcommentlike)
router.get('/getadmincomments',getadmincomments)
router.put('/deletecomment',deletecomment)
export const CommentsRouter=router