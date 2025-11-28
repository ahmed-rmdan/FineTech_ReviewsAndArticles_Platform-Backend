import { createuser } from "../controler/users";
import express from 'express'

const router=express.Router()

router.post('/createuser',createuser)

export const UserRoutes=router