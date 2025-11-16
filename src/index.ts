import Express from 'express'
import helmet from 'helmet'
import cors from "cors";
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import { PostsRoute } from './routes/posts';
import { Request,Response,NextFunction } from "express";
import { PostSchema } from './schema/post';

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

app.put('/posts/putpostimage',upload.single('file'),async(req:Request,res:Response,next:NextFunction)=>{

const id=req.query.id as string
 if(!id){
  res.status(401).send({message:'productid not found'})
 }
 if (!req.file) return res.status(400).send({ message: 'file not found' });
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if(!allowedTypes.includes(req.file.mimetype)){
    return res.status(406).json({message:'file must be image go to posts control to edit the image'})
  }
   const result = await cloudinary.uploader.upload_stream(
      { folder: "FineTech" },
      async (error, result) => {
        if (error) return res.status(406).send({ message: 'upload failed', error });
           
        await PostSchema.updateOne({_id:id},{$set:{mainimage:result?.secure_url,imageid:result?.public_id}})

        res.status(200).send({ message: 'mainimage has been added' });
      }
    );

   
    result.end(req.file.buffer);


})


app.put('/posts/editpostimage',upload.single('file'),async(req:Request,res:Response,next:NextFunction)=>{

const id=req.query.id as string
 if(!id){
  res.status(401).send({message:'productid not found'})
 }
 if (!req.file) return res.status(400).send({ message: 'file not found' });
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if(!allowedTypes.includes(req.file.mimetype)){
    return res.status(406).json({message:'file must be image go to posts control to edit the image'})
  }
      const findpost=await PostSchema.findOne({_id:id})
          await cloudinary.uploader.destroy(findpost?.imageid as string)        
   const result = await cloudinary.uploader.upload_stream(
      { folder: "FineTech" },
      async (error, result) => {
        if (error) return res.status(406).send({ message: 'upload failed', error });
           
        await PostSchema.updateOne({_id:id},{$set:{mainimage:result?.secure_url,imageid:result?.public_id}})

        res.status(200).send({ message: 'mainimage has been added' });
      }
    );

   
    result.end(req.file.buffer);


})




mongoose.connect(process.env.MONGO_URI as string).then(server=>{
app.listen(process.env.PORT || '5000')
})



