import { Request,Response,NextFunction } from "express";
import { PostSchema } from "../schema/post";
import validator from 'validator'
import type { post } from "../types";
import { v2 as cloudinary } from 'cloudinary'
import { upload } from "..";

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
      console.log(sort)
           const start=(page-1)*6
        try{
          const noposts=(await PostSchema.find()).length

          if(sort=='Oldest'){
                const posts=await PostSchema.find().sort({createdAt:1}).skip(start).limit(6)
            return res.status(200).json({posts,noposts})
              }
          if(sort=='Most liked'){
                const posts=await PostSchema.find().sort({likes:-1}).skip(start).limit(6)
            return res.status(200).json({posts,noposts})
          }if(sort=='Most viewed') {
                const posts=await PostSchema.find().sort({views:-1}).skip(start).limit(6)
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



export const deletepost=async(req:Request,res:Response,next:NextFunction)=>{
                if(!req.body){
        return res.status(406).json({message:'body missed'})
                          }
           const id=req.body.id as string
          try{
            const curpost=await PostSchema.findOne({id})
             
            await PostSchema.deleteOne({_id:id})
            await cloudinary.uploader.destroy(curpost?.imageid as string)
             return res.status(200).json({message:'post has been deleted successfully'})
          }catch(err){
           return res.status(406).json({message:'somthing went wrong'})
          }                                                
         
}



export const getpost=async(req:Request,res:Response,next:NextFunction)=>{
      
           const id=req.query.id as string
           console.log(id)
          try{
 
            const curpost=await PostSchema.findOne({_id:id}) 
            console.log(curpost)                   
             return res.status(200).json({post:curpost})

          }catch(err){                                    
           return res.status(406).json({message:'somthing went wrong'})
                   }                                                
         
}

export const editpost=async(req:Request,res:Response,next:NextFunction)=>{
    if(!req.body){
        return res.status(406).json({message:'body missed'})
    }
    const body:post=req.body 
  
  if(!validator.isLength(body.title,{max:30})){
    return res.status(404).json({message:'title max length is 30'})
   }  
     try{
         const findpost= await PostSchema.updateOne({_id:body.id},{title:body.title,description:body.description,content:body.content,mainslider:body.mainslider})
         return res.status(200).json({message:'post has been updated'})
     }catch(err){
      return res.status(406).json({message:'somthing went wrong'})
     }              
     
}


export const getsliderposts=async(req:Request,res:Response,next:NextFunction)=>{
              
          try{
            const posts=await PostSchema.find({mainslider:true}) 
                          
             return res.status(200).json({posts})

          }catch(err){                                    
           return res.status(406).json({message:'somthing went wrong'})
                   }                                                
         
}

export const gettopreadingposts=async(req:Request,res:Response,next:NextFunction)=>{
              
          try{
            const posts=await PostSchema.find().sort({views:-1}).limit(3) 
                          
             return res.status(200).json({posts})

          }catch(err){                                    
           return res.status(406).json({message:'somthing went wrong'})
                   }                                                
         
}


export const viewpost=async(req:Request,res:Response,next:NextFunction)=>{
      
           const id=req.query.id as string
           console.log(id)
          try{
 
            const curpost=await PostSchema.findOne({_id:id}) 
              await PostSchema.updateOne({_id:id},{views:curpost!.views+1})               
             return res.status(200).json({post:curpost})

          }catch(err){                                    
           return res.status(406).json({message:'somthing went wrong'})
                   }                                                
         
}


export const putpostimage=async (req:Request,res:Response,next:NextFunction)=>{

const id=req.query.id as string
 if(!id){
  return res.status(401).send({message:'productid not found'})
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


}


export const editpostimage=async(req:Request,res:Response,next:NextFunction)=>{

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

}