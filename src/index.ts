import Express from 'express'
import helmet from 'helmet'
import cors from "cors";
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { PostsRoute } from './routes/posts';
import { putpostimage } from './controler/posts';
import { editpostimage } from './controler/posts';
import { ReviewsRoutes } from './routes/reviews';
import { putreviewtimage } from './controler/reviews';
import { editreviewimage } from './controler/reviews';
import { UserRoutes } from './routes/user';
import { putuserimage } from './controler/users';
import { CommentsRouter } from './routes/comments';
import { getreport } from './controler/report';
dotenv.config()

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FineTech Reviews System and Articles Platform API',
      version: '1.0.0',
      description: 'API for managing reviews, articles, users, and comments',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },  },
  apis: ['./src/routes/*.ts'], 
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);


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


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));




app.use('/posts',PostsRoute)
app.put('/posts/putpostimage',upload.single('file'),putpostimage)
app.put('/posts/editpostimage',upload.single('file'),editpostimage)


app.use('/reviews',ReviewsRoutes)
app.put('/reviews/putreviewimage',upload.single('file'),putreviewtimage)
app.put('/reviews/editreviewimage',upload.single('file'),editreviewimage)


app.use('/users',UserRoutes)
app.put('/users/putuserimage',upload.single('file'),putuserimage)


app.use('/comments',CommentsRouter)

app.get('/getreport',getreport)

mongoose.connect(process.env.MONGO_URI as string).then(server=>{
  
if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || '5000')
}

})

export default app

