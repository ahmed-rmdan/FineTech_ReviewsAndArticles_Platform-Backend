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
  console.log(body.category)
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
       category:body.category,
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



export const getreviews=async(req:Request,res:Response,next:NextFunction)=>{

    const page=Number(req.query.page)
    const sort=req.query.sort as string
    const category=req.query.category as string
    console.log(category)
           const start=(page-1)*6
      try{
            
           if (category==='AllReviews'){
             const noreviews=(await ReviewSchema.find()).length              
            if(sort=='Oldest'){
                const reviews=await ReviewSchema.find().sort({createdAt:1}).skip(start).limit(6)
            return res.status(200).json({reviews,noreviews})
              }
             if(sort=='Most liked'){
                const reviews=await ReviewSchema.find().sort({likes:-1}).skip(start).limit(6)
            return res.status(200).json({reviews,noreviews})
                }
              if(sort=='Most viewed') {
                const reviews=await ReviewSchema.find().sort({views:-1}).skip(start).limit(6)
               return res.status(200).json({reviews,noreviews})
                 }
               if(sort=='Most Rated') {
                const reviews=await ReviewSchema.find().sort({score:-1}).skip(start).limit(6)
               return res.status(200).json({reviews,noreviews})
                 }
           else{
            const reviews=await ReviewSchema.find().sort({createdAt:-1}).skip(start).limit(6)
            return res.status(200).json({reviews,noreviews})           
              }        
         }else{
          const noreviews=(await ReviewSchema.find({category})).length
              if(sort=='Oldest'){
                const reviews=await ReviewSchema.find({category:category}).sort({createdAt:1}).skip(start).limit(6)
                 return res.status(200).json({reviews,noreviews})
                       }
              if(sort=='most liked'){
                const reviews=await ReviewSchema.find({category}).sort({likes:1}).skip(start).limit(6)
                   return res.status(200).json({reviews,noreviews})
                 }
                 if(sort=='most viewed') {
                const reviews=await ReviewSchema.find({category}).sort({views:1}).skip(start).limit(6)
                    return res.status(200).json({reviews,noreviews})
                 }
               if(sort=='Most Rated') {
                const reviews=await ReviewSchema.find({category}).sort({score:-1}).skip(start).limit(6)
               return res.status(200).json({reviews,noreviews})
                 }                 
           else{
                const reviews=await ReviewSchema.find({category}).sort({createdAt:-1}).skip(start).limit(6)
                 return res.status(200).json({reviews,noreviews})           
              }       
         }
                  
        }catch(err){
             return res.status(406).json({message:'somthing went wrong'})
        }
                                    
          
}



export const getsearchreviews=async(req:Request,res:Response,next:NextFunction)=>{

    const page=Number(req.query.page)
    const sort=req.query.sort as string
    const category=req.query.category as string
    const search=req.query.search as string
    console.log(category)
           const start=(page-1)*6
      try{
            
           if (category==='AllReviews'){
             const noreviews=(await ReviewSchema.find({title:{$regex:search}})).length              
            if(sort=='Oldest'){
                const reviews=await ReviewSchema.find({title:{$regex:search}}).sort({createdAt:1}).skip(start).limit(6)
            return res.status(200).json({reviews,noreviews})
              }
             if(sort=='Most liked'){
                const reviews=await ReviewSchema.find({title:{$regex:search}}).sort({likes:-1}).skip(start).limit(6)
            return res.status(200).json({reviews,noreviews})
                }
              if(sort=='Most viewed') {
                const reviews=await ReviewSchema.find({title:{$regex:search}}).sort({views:-1}).skip(start).limit(6)
               return res.status(200).json({reviews,noreviews})
                 }
               if(sort=='Most Rated') {
                const reviews=await ReviewSchema.find({title:{$regex:search}}).sort({score:-1}).skip(start).limit(6)
               return res.status(200).json({reviews,noreviews})
                 }
           else{
            const reviews=await ReviewSchema.find({title:{$regex:search}}).sort({createdAt:-1}).skip(start).limit(6)
            return res.status(200).json({reviews,noreviews})           
              }        
         }else{
          const noreviews=(await ReviewSchema.find({category,title:{$regex:search}})).length
              if(sort=='Oldest'){
                const reviews=await ReviewSchema.find({category:category,title:{$regex:search}}).sort({createdAt:1}).skip(start).limit(6)
                 return res.status(200).json({reviews,noreviews})
                       }
              if(sort=='most liked'){
                const reviews=await ReviewSchema.find({category,title:{$regex:search}}).sort({likes:1}).skip(start).limit(6)
                   return res.status(200).json({reviews,noreviews})
                 }
                 if(sort=='most viewed') {
                const reviews=await ReviewSchema.find({category,title:{$regex:search}}).sort({views:1}).skip(start).limit(6)
                    return res.status(200).json({reviews,noreviews})
                 }
               if(sort=='Most Rated') {
                const reviews=await ReviewSchema.find({category,title:{$regex:search}}).sort({score:-1}).skip(start).limit(6)
               return res.status(200).json({reviews,noreviews})
                 }                 
           else{
                const reviews=await ReviewSchema.find({category,title:{$regex:search}}).sort({createdAt:-1}).skip(start).limit(6)
                 return res.status(200).json({reviews,noreviews})           
              }       
         }
                  
        }catch(err){
             return res.status(406).json({message:'somthing went wrong'})
        }
                                    
          
}


export const deletereview=async(req:Request,res:Response,next:NextFunction)=>{
                if(!req.body){
        return res.status(406).json({message:'body missed'})
                          }
           const id=req.body.id as string
          try{
            const curreview=await ReviewSchema.findOne({id})
             const imageid=curreview?.imageid
            await ReviewSchema.deleteOne({_id:id})
            await cloudinary.uploader.destroy(imageid as string)
             return res.status(200).json({message:'Review has been deleted successfully'})
          }catch(err){
           return res.status(406).json({message:'somthing went wrong'})
          }                                                
         
}


export const getreview=async(req:Request,res:Response,next:NextFunction)=>{
      
           const id=req.query.id as string
           console.log(id)
          try{
 
            const curreview=await ReviewSchema.findOne({_id:id}) 
                     
             return res.status(200).json({review:curreview})

          }catch(err){                                    
           return res.status(406).json({message:'somthing went wrong'})
                   }                                                
         
}


export const editreview=async(req:Request,res:Response,next:NextFunction)=>{
    if(!req.body){
        return res.status(406).json({message:'body missed'})
    }
    const body:review=req.body 
  
  if(!validator.isLength(body.title,{max:30})){
    return res.status(404).json({message:'title max length is 30'})
   }  
     try{
         const findreview= await ReviewSchema.updateOne({_id:body.id},{title:body.title,description:body.description,
          content:body.content,summary:body.summary,score:body.score,category:body.category})
         return res.status(200).json({message:'Review has been updated'})
     }catch(err){
      return res.status(406).json({message:'somthing went wrong'})
     }              
     
}


export const editreviewimage=async(req:Request,res:Response,next:NextFunction)=>{

const id=req.query.id as string
 if(!id){
  res.status(401).send({message:'review id not found'})
 }
 if (!req.file) return res.status(400).send({ message: 'file not found' });
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if(!allowedTypes.includes(req.file.mimetype)){
    return res.status(406).json({message:'file must be image go to reviews  to edit the image'})
  }
      const findreview=await ReviewSchema.findOne({_id:id})
          await cloudinary.uploader.destroy(findreview?.imageid as string)        
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

export const gethomereviews=async(req:Request,res:Response,next:NextFunction)=>{
  try{
     const reviews=await ReviewSchema.find().sort({createdAt:-1}).limit(3)
     return res.status(200).json({reviews})
  }catch(err){
    return res.status(406).json({message:'somthing went wrong'})
  }

 

}


export const viewreview=async(req:Request,res:Response,next:NextFunction)=>{
      
           const id=req.query.id as string
           console.log(id)
          try{
 
            const curreview=await ReviewSchema.findOne({_id:id}) 
              await ReviewSchema.updateOne({_id:id},{views:curreview!.views+1})               
             return res.status(200).json({review:curreview})

          }catch(err){                                    
           return res.status(406).json({message:'somthing went wrong'})
                   }                                                
         
}