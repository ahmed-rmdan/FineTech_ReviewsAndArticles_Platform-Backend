import { ReviewSchema } from "../schema/review";
import { Request,Response,NextFunction } from "express";
import validator from 'validator'
import type { review } from "../types";
import { v2 as cloudinary } from 'cloudinary'


export const createreview=async(req:Request,res:Response,next:NextFunction)=>{
  console.log('review')
    if(!req.body){
        return res.status(406).json({message:'body missed'})
    }
    const body:review=req.body
  
  if(!validator.isLength(body.title,{max:25})){
    return res.status(404).json({message:'title max length is 25'})
   }  

   if(!body.score){
      return res.status(404).json({message:'score is required'})
   }
    console.log(body)
   try{
             const newreview= await new ReviewSchema({
       title:body.title,
        mainimage:body.mainimage,
        description:body.description,
       content:body.content,
       summary:body.summary,
       score:body.score     
       }).save()
        return res.status(200).json({message:'review has been created',id:newreview._id.toString()})
   }catch(err){
    console.log(err)
   }


 
     
}


export const putreviewtimage=async (req:Request,res:Response,next:NextFunction)=>{

const id=req.query.id as string
 if(!id){
  res.status(401).send({message:'Review id not found'})
 }
 if (!req.file) return res.status(400).send({ message: 'file not found' });
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if(!allowedTypes.includes(req.file.mimetype)){
    return res.status(406).json({message:'file must be image go to Reviews control to edit the image'})
  }
   const result = await cloudinary.uploader.upload_stream(
      { folder: "FineTech" },
      async (error, result) => {
        if (error) return res.status(406).send({ message: 'upload failed', error });
           
        await ReviewSchema.updateOne({_id:id},{$set:{mainimage:result?.secure_url,imageid:result?.public_id}})

        res.status(200).send({ message: 'mainimage has been added' });
      }
    );

   
    result.end(req.file.buffer);


}