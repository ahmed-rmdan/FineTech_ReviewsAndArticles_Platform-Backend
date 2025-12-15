import { CommentSchema } from "../schema/comment";
import { Request,Response,NextFunction } from "express";
import { UserSchema } from "../schema/user";
import validator from 'validator'
import { SubcommentSchema } from "../schema/subcomment";
import { Types } from "mongoose";
export const getcomments=async(req:Request,res:Response,next:NextFunction)=>{

    const itemid=req.query.id
     if(!itemid){
        return res.status(402).json({message:'body is missing'})
     }
    const comments=await CommentSchema.find({itemid}).populate('subcomments')
     
     return res.status(200).json({comments})  
                                                 
          
    }

    export const addcomment=async(req:Request,res:Response,next:NextFunction)=>{

    const itemid=req.body.itemid
    const content=req.body.content
    const userid=req.body.userid

     if(!itemid||!content||!userid){
        return res.status(402).json({message:'body is missing'})
     }
     const finduser=await UserSchema.findOne({_id:userid})
     if(!finduser){
        return res.status(404).json({message:'cant find user'})
     }
    const cooment=await new CommentSchema({
         itemid,
         userid,
         content,
         name:finduser.name,
         image:finduser.image,      

    }).save()
     
     return res.status(200).json({message:'comment has been added'})  
                                                 
          
    }



    export const addsubcomment=async(req:Request,res:Response,next:NextFunction)=>{

    const commentid=req.body.commentid
    const itemid=req.body.itemid as string
    const content=req.body.content
    const userid=req.body.userid
  console.log(itemid)
     if(!commentid||!content||!userid){
        return res.status(402).json({message:'body is missing'})
     }
     const finduser=await UserSchema.findOne({_id:userid})
     if(!finduser){
        return res.status(404).json({message:'cant find user'})
     }
    const subcooment=await new SubcommentSchema({
         itemid,
         userid,
         content,
         name:finduser.name,
         image:finduser.image,      

    }).save()
     
    await CommentSchema.updateOne({_id:commentid},{$push:{subcomments:subcooment._id}})
     return res.status(200).json({message:'subcomment has been added'})  
                                                 
          
    }


    

    export const addcommentlike=async (req:Request,res:Response)=>{
      
      const userid=req.body.id as string
       const itemid=req.body.itemid as string
       const kind=req.body.kind as string
       const finduser=await UserSchema.findOne({_id:userid})

    if(!finduser){
         return res.status(403).json('user not found')
      }
       if(kind==='comment'){
      const comment = await CommentSchema.findOne({ _id: itemid });
      
 
    if (comment?.likes.includes( new Types.ObjectId(userid) ) ) {
    
          const oldlikes= finduser.likes
              const userlike=oldlikes.findIndex(elm=>{
               return elm.item?.equals(itemid)
              })
              
               oldlikes.splice(userlike,1)
             await UserSchema.updateOne({_id:userid},{$set:{likes:oldlikes}})
               const oldusers=comment.likes
               const userpost=oldusers.findIndex(elm=>{
                 return  elm.equals(userid) 
               })
               oldusers.splice(userpost,1)
               await CommentSchema.updateOne({_id:itemid},{$set:{likes:oldusers}})
    
      return res.status(200).json({ message: 'remove like' });
    }
    
    await CommentSchema.updateOne(
       { _id: itemid },
       { $push: { likes: userid } }
    );
     
      await UserSchema.updateOne({_id:userid},{$push:{likes:{item:itemid,kind:kind}}})
      return res.status(200).json({ message: 'liked successfully' });
    }
    
    if(kind==='subcomment'){
    const review = await SubcommentSchema.findOne({ _id: itemid });
     
    if (review?.likes.includes( new Types.ObjectId(userid) ) ) {
              const oldlikes= finduser.likes
              const userliked=oldlikes.findIndex(elm=>{
               return elm.item?.equals(itemid)
              })
            
               oldlikes.splice(userliked,1)
             await UserSchema.updateOne({_id:userid},{$set:{likes:oldlikes}})
               const oldusers=review.likes
               const userpost=oldusers.findIndex(elm=>{
                 return  elm.equals(userid) 
               })
               oldusers.splice(userpost,1)
               await SubcommentSchema.updateOne({_id:itemid},{$set:{likes:oldusers}})          
                    
      return res.status(200).json({ message: 'remove like' });

             }
    
    await SubcommentSchema.updateOne(
      { _id: itemid },
      { $push: { likes: userid } }
    );
     
      await UserSchema.updateOne({_id:userid},{$push:{likes:{item:itemid,kind:kind}}})
      return res.status(200).json({ message: 'liked successfully' });
    }else{
      return res.status(406).json({message:'invalid body'})
    }
    
    }