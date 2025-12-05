import { Request,Response,NextFunction } from "express";
import validator from 'validator'
import { UserSchema } from "../schema/user";
import type { user } from "../types";
import bcrypt from 'bcrypt'

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

