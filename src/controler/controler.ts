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

// export const getposts=async(req:Request,res:Response,next:NextFunction)=>{
//     if(!req.body){
//         return res.status(406).json({message:'body missed'})
//     }
//     const body:post=req.body
//      const newpost= await new PostSchema({
//        title:body.title,
//         mainimage:body.mainimage,
//         description:body.description,
//        content:body.content,
//        comments:[],
//         likes:[]
//        }).save().catch(error=>{
//       return res.status(404).json({message:'somthing went wrong'})
//             })

//      return res.status(200).json({message:'post has been created'})
// }