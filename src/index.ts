import Express from 'express'
import helmet from 'helmet'
import cors from "cors";
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import { PostsRoute } from './routes/posts';
import { putpostimage } from './controler/posts';
import { editpostimage } from './controler/posts';
import { ReviewsRoutes } from './routes/reviews';
import { putreviewtimage } from './controler/reviews';

dotenv.config()
cloudinary.config({
  cloud_name:'df0no7xar',
  api_key:process.env.cloudinary_api_key as string,
  api_secret:process.env.cloudinary_api_secret as string
  
})

const storage=multer.memoryStorage()

const app=Express()


app.use(helmet())
app.use(cors())

export const upload=multer({storage,limits:{fieldSize:10 * 1024 * 1024 }})
app.use(Express.json({limit:'10mb'}))
app.use(Express.urlencoded({extended:true}))




app.use('/posts',PostsRoute)

app.put('/posts/putpostimage',upload.single('file'),putpostimage)


app.put('/posts/editpostimage',upload.single('file'),editpostimage)


app.use('/reviews',ReviewsRoutes)

app.put('/reviews/putreviewimage',upload.single('file'),putreviewtimage)


mongoose.connect(process.env.MONGO_URI as string).then(server=>{
app.listen(process.env.PORT || '5000')
})



