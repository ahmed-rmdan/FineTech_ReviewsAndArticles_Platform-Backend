import Express from 'express'
import helmet from 'helmet'
import cors from "cors";
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app=Express()


app.use(helmet())
app.use(cors())


app.use(Express.json())
app.use(Express.urlencoded({extended:true}))



mongoose.connect(process.env.MONGO_URI as string).then(server=>{
app.listen(process.env.PORT || '3000')
})



