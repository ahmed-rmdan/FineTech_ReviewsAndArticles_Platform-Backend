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
import express from 'express'

const router=express.Router()

router.post('/createuser',createuser)
router.put('/updatename',updatename)
router.put('/updatepass',updatepass)
router.put('/resetpass',resetpass)
router.put('/newpass',confirmnewpass)
router.post('/addlike',addlike)
router.get('/setlikesandsaves',setlikesandsaves)
router.post('/addsave',addsave)
router.get('/getlikes',getlikes)
router.get('/getsaves',getsaves)
router.put('/addscore',addscore)
router.get('/getscores',getuserscores)

export const UserRoutes=router