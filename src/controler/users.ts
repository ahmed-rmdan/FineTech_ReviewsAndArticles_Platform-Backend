import { Request,Response,NextFunction } from "express";
import validator from 'validator'
import { UserSchema } from "../schema/user";
import type { user } from "../types";
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
export const createuser=async(req:Request,res:Response,next:NextFunction)=>{
    try{
    const body:user=req.body
    if(!body){
        return res.status(404).json({message:'body is missing'})
    }

   if(!validator.isLength(body.name,{min:5,max:20})){
         return res.status(404).json({message:'name should not be less than 5 and more than 20'})
   }
      if(!validator.isLength(body.username,{min:5,max:20})){
         return res.status(404).json({message:'username should not be less than 5 and more than 20'})
   }
   const findusername=await UserSchema.findOne({username:body.username})
    if(findusername){
            return res.status(404).json({message:'choose another username'})
    }

         if(!validator.isLength(body.password,{min:5,max:20})){
         return res.status(404).json({message:'password should not be less than 5 and more than 20'})
   }
            if(!validator.isEmail(body.email)){
         return res.status(404).json({message:'email is not valid'})
   }
    const findemail=await UserSchema.findOne({email:body.email})
    if(findemail){
                    return res.status(404).json({message:'email already exists'})
                  }
                  const bcryptpass=await bcrypt.hash(body.password,10)
   await new UserSchema({
    name:body.name,
    username:body.username,
    password:bcryptpass,
    email:body.email

   }).save()

   return res.status(200).json({message:'user has been created'})


    }catch(err){
        return res.status(402).json({message:'somthing went wrong'})
    }


}


export const putuserimage = async (req:Request,res:Response,next:NextFunction)=>{
            
          const userid=req.query.id as string
          console.log(userid)
            if(!userid){
              return res.status(401).send({message:'Review id not found'})
            }
            console.log(req.file)
        if (!req.file) return res.status(400).send({ message: 'file not found' });
              const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
                   if(!allowedTypes.includes(req.file.mimetype)){
              return res.status(406).json({message:'type image nt allowed'})
                 }
                   const finduser=await UserSchema.findOne({_id:userid})
                    if(!finduser){
                        return res.status(402).json({message:'user not found'})  
                    } 
                         if(finduser.image){
                            await cloudinary.uploader.destroy(finduser.imageid) 
                          }  
            
              const result = cloudinary.uploader.upload_stream(
              { folder: "FineTech" },
                 async (error, result) => {
                 if (error){
                   return res.status(406).json({ message: 'upload failed', error });
                 }
                    
                   console.log('updating')
                    await UserSchema.updateOne({_id:userid},{$set:{image:result?.secure_url,imageid:result?.public_id}})            
            
          return res.status(200).json({image:result?.secure_url,message: 'mainimage has been added' });
        
                }
                             
              );        
      
         result.end(req.file.buffer)
        

}

