import { Request,Response,NextFunction } from "express";
import { PostSchema } from "../schema/post";
import validator from 'validator'
import type { post } from "../types";



export const createpost=async(req:Request,res:Response,next:NextFunction)=>{
    if(!req.body){
        return res.status(406).json({message:'body missed'})
    }
    const body:post=req.body
  
  if(!validator.isLength(body.title,{max:25})){
    return res.status(404).json({message:'title max length is 25'})
   }  
    console.log(body)
     console.log(body.title)
       const newpost= await new PostSchema({
       title:body.title,
        mainimage:body.mainimage,
        description:body.description,
       content:body.content,
       mainslider:body.mainslider,     
       }).save()

  return res.status(200).json({message:'post has been created',id:newpost._id.toString()})
     
}

export const getposts=async(req:Request,res:Response,next:NextFunction)=>{

    const page=Number(req.query.page)
    const sort=req.query.sort as string
           const start=(page-1)*6
        try{
          const noposts=(await PostSchema.find()).length

          if(sort=='Oldest'){
                const posts=await PostSchema.find().sort({createdAt:1}).skip(start).limit(6)
            return res.status(200).json({posts,noposts})
              }
          if(sort=='most liked'){
                const posts=await PostSchema.find().sort({likes:1}).skip(start).limit(6)
            return res.status(200).json({posts,noposts})
          }if(sort=='most viewed') {
                const posts=await PostSchema.find().sort({views:1}).skip(start).limit(6)
            return res.status(200).json({posts,noposts})
            }
           else{
            const posts=await PostSchema.find().sort({createdAt:-1}).skip(start).limit(6)
            return res.status(200).json({posts,noposts})           
              }        
          
        }catch(err){
             return res.status(406).json({message:'somthing went wrong'})
        }
                                    
          
}

export const searchpostsadmin=async(req:Request,res:Response,next:NextFunction)=>{
    const search=req.query.search as string
    const page=Number(req.query.page)
    const sort=req.query.sort as string
           const start=(page-1)*6
        try{
          const noposts=(await PostSchema.find({title:{$regex:search}})).length

          if(sort=='Oldest'){
                const posts=await PostSchema.find({title:{$regex:search}}).sort({createdAt:1}).skip(start).limit(6)
            return res.status(200).json({posts,noposts})
              }
          if(sort=='most liked'){
                const posts=await PostSchema.find({title:{$regex:search}}).sort({likes:1}).skip(start).limit(6)
            return res.status(200).json({posts,noposts})
          }if(sort=='most viewed') {
                const posts=await PostSchema.find({title:{$regex:search}}).sort({views:1}).skip(start).limit(6)
            return res.status(200).json({posts,noposts})
            }
           else{
            const posts=await PostSchema.find({title:{$regex:search}}).sort({createdAt:-1}).skip(start).limit(6)
            return res.status(200).json({posts,noposts})           
              }        
          
        }catch(err){
             return res.status(406).json({message:'somthing went wrong'})
        }
                                    
          
}