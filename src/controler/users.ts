import { Request,Response,NextFunction } from "express";
import validator from 'validator'
import { UserSchema } from "../schema/user";
import type { user } from "../types";
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import * as brevo from "@getbrevo/brevo";
import Crypto from 'crypto'
import { PostSchema } from "../schema/post";
import { ReviewSchema } from "../schema/review";
import { ObjectId, Types } from "mongoose";

export const createuser=async(req:Request,res:Response,next:NextFunction)=>{
    try{
    const body:user=req.body
    if(!body){
        return res.status(404).json({message:'body is missing'})
    }

   if(!validator.isLength(body.name,{min:3,max:15})){
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



export const updatename = async (req:Request,res:Response,next:NextFunction)=>{
            
          const userid=req.body.id as string
          const newname=req.body.newname as string
          console.log(userid)
            if(!userid){
              return res.status(401).send({message:' couldnt find user'})
            }
            if(!validator.isLength(newname,{min:3})){
                return res.status(406).json({message:'name souldnt be less than 3 and more than 15'})
            }
          try{
               await UserSchema.updateOne({_id:userid},{$set:{name:newname}})
               return res.status(200).json({message:'name has been updated'})
          }catch(err){

            return res.status(402).json({message:'error has happened'})
       
        }                

}



export const updatepass=async (req:Request,res:Response,next:NextFunction)=>{
            const userid=req.body.id as string
          const pass=req.body.pass as string
          const newpass=req.body.newpass as string
          console.log(userid)
            if(!userid){
              return res.status(401).send({message:'couldnt find user'})
            }
               if(!validator.isLength(newpass,{min:6,max:20})){
                return res.status(406).json({message:'name souldnt be less than 6 and more than 20'})
            }
             const finduser=await UserSchema.findOne({_id:userid})
               const isequal=await bcrypt.compare(pass,finduser?.password as string)
               if(!isequal){
                return res.status(401).send({message:'password is not correct'})
               }
          try{
              const encryptpass=await bcrypt.hash(newpass,10)
               await UserSchema.updateOne({_id:userid},{$set:{password:encryptpass}})
               return res.status(200).json({message:'password has been updated'})
          }catch(err){

            return res.status(402).json({message:'error has happened'})
       
        }                

}



export const resetpass=async (req:Request,res:Response,next:NextFunction)=>{
           
      const email=req.body.email as string
      const isfound=await UserSchema.findOne({email:email})
      if(!isfound){
        return res.status(404).send({message:'email is not correct'})
      }
   
          const apiInstance = new brevo.TransactionalEmailsApi();
        apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY as string);
  
         Crypto.randomBytes(32,async(err:Error|null,buf:Buffer)=>{
if(err){
    return  res.status(406).json('wrong email')
}
         const token=buf.toString('hex')

const expiredreset=new Date(Date.now() + 900000)
await UserSchema.updateOne({_id:isfound._id},{resettoken:token,resetexpire:expiredreset.toString()})


  const sendSmtpEmail = new brevo.SendSmtpEmail();
        sendSmtpEmail.sender = { name: "FineTech", email: "ahmedrmadan251998@gmail.com" };
        sendSmtpEmail.to = [{ email: email}];
        sendSmtpEmail.subject = 'reset your password';
sendSmtpEmail.htmlContent = `<h1> resiting your password </h1> <h2> click on the link below to rest your password </h2>
 <a href='http://localhost:3000/newpass?token=${token}&email=${email}'> click here to reset your password  </a>`;


    try {
      const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log(" Email sent:", data);
      return res.status(200).json("email has been sent");
    } catch (error) {
      console.error(" Error sending email:", error);
      return res.status(404).json({message:"failed to send email"});
    }


})

}



export const confirmnewpass=async (req:Request,res:Response)=>{
    
const email=req.body.email as string
const token=req.body.token as string
const newpass=req.body.newpass
console.log(email,token)
const finduser=await UserSchema.findOne({email:email})
if(!finduser){
     return res.status(403).json('wrong email')
}
if(finduser.resettoken !== token){
     return res.status(406).json('wrong token')
}


if( new Date(Date.now()) >  new Date(finduser.resetexpire)  ){
return res.status(406).json(' token expired')
}
const bcryptpass=await bcrypt.hash(newpass,10)

await UserSchema.updateOne({_id:finduser.id},{$set:{password:bcryptpass,resetexpire:null,resettoken:null}})
console.log('password changed')
res.status(200).json('password has been updated')


}

export const setlikesandsaves= async (req:Request,res:Response)=>{
    

const userid=req.query.id

const finduser=await UserSchema.findOne({_id:userid})
if(!finduser){
     return res.status(403).json('user not found')
}
const likes= (await finduser.populate('likes.item')).likes
       const likesid=likes.map(elm=>{
        return elm.item?._id
       })
  const saves= (await finduser.populate('likes.item')).saves
       const savesid=saves.map(elm=>{
        return elm.item?._id
       })
       console.log(savesid,likesid)
        return res.status(200).json({likes:likesid,saves:savesid})

}




export const getlikes=async (req:Request,res:Response)=>{
    

const userid=req.query.id

const finduser=await UserSchema.findOne({_id:userid})
if(!finduser){
     return res.status(403).json('user not found')
}
const likes= (await finduser.populate('likes.item')).likes
        return res.status(200).json({likes})

}



export const addlike=async (req:Request,res:Response)=>{
    
 console.log('sadsadsad')
  const userid=req.body.id as string
   const itemid=req.body.itemid as string
   const kind=req.body.kind as string
   const finduser=await UserSchema.findOne({_id:userid})
if(!finduser){
     return res.status(403).json('user not found')
  }
   if(kind==='post'){
  const post = await PostSchema.findOne({ _id: itemid });
console.log( post?.likes.includes( new Types.ObjectId(userid)) )
if (post?.likes.includes( new Types.ObjectId(userid) ) ) {

      const oldlikes= finduser.likes
          const userlikepost=oldlikes.findIndex(elm=>{
           return elm.item?.equals(itemid)
          })
          console.log(userlikepost)
           oldlikes.splice(userlikepost,1)
         await UserSchema.updateOne({_id:userid},{$set:{likes:oldlikes}})
           const oldusers=post.likes
           const userpost=oldusers.findIndex(elm=>{
             return  elm.equals(userid) 
           })
           oldusers.splice(userpost,1)
           await PostSchema.updateOne({_id:itemid},{$set:{likes:oldusers}})

  return res.status(200).json({ message: 'remove like' });
}

await PostSchema.updateOne(
   { _id: itemid },
   { $push: { likes: userid } }
);
 
  await UserSchema.updateOne({_id:userid},{$push:{likes:{item:itemid,kind:kind}}})
  return res.status(200).json({ message: 'liked successfully' });
}

if(kind==='review'){
const review = await ReviewSchema.findOne({ _id: itemid });
 
if (review?.likes.includes( new Types.ObjectId(userid) ) ) {
          const oldlikes= finduser.likes
          const userlikepost=oldlikes.findIndex(elm=>{
           return elm.item?.equals(itemid)
          })
        
           oldlikes.splice(userlikepost,1)
         await UserSchema.updateOne({_id:userid},{$set:{likes:oldlikes}})
           const oldusers=review.likes
           const userpost=oldusers.findIndex(elm=>{
             return  elm.equals(userid) 
           })
           oldusers.splice(userpost,1)
           await ReviewSchema.updateOne({_id:itemid},{$set:{likes:oldusers}})          
             

  return res.status(200).json({ message: 'remove like' });
         }

await ReviewSchema.updateOne(
  { _id: itemid },
  { $push: { likes: userid } }
);
 
  await UserSchema.updateOne({_id:userid},{$push:{likes:{item:itemid,kind:kind}}})
  return res.status(200).json({ message: 'liked successfully' });
}else{
  return res.status(406).json({message:'invalid body'})
}

}


export const addsave=async (req:Request,res:Response)=>{
    
 console.log('sadsadsad')
  const userid=req.body.id as string
   const itemid=req.body.itemid as string
   const kind=req.body.kind as string
   const finduser=await UserSchema.findOne({_id:userid})
if(!finduser){
     return res.status(403).json('user not found')
  }
   if(kind==='post'){
  const post = await PostSchema.findOne({ _id: itemid });

if (post?.saves.includes( new Types.ObjectId(userid) ) ) {

      const oldsaves= finduser.saves
          const usersavepost=oldsaves.findIndex(elm=>{
           return elm.item?.equals(itemid)
          })
        
           oldsaves.splice(usersavepost,1)
         await UserSchema.updateOne({_id:userid},{$set:{saves:oldsaves}})
           const oldusers=post.saves
           const userpost=oldusers.findIndex(elm=>{
             return  elm.equals(userid) 
           })
           oldusers.splice(userpost,1)
           await PostSchema.updateOne({_id:itemid},{$set:{saves:oldusers}})

  return res.status(200).json({ message: 'remove like' });
}

await PostSchema.updateOne(
   { _id: itemid },
   { $push: { saves: userid } }
);
 
  await UserSchema.updateOne({_id:userid},{$push:{saves:{item:itemid,kind:kind}}})
  return res.status(200).json({ message: 'post saved successfully' });
}

if(kind==='review'){
const review = await ReviewSchema.findOne({ _id: itemid });
 
if (review?.saves.includes( new Types.ObjectId(userid) ) ) {
          const oldsaves= finduser.saves
          const usersavepost=oldsaves.findIndex(elm=>{
           return elm.item?.equals(itemid)
          })
        
           oldsaves.splice(usersavepost,1)
         await UserSchema.updateOne({_id:userid},{$set:{saves:oldsaves}})
           const oldusers=review.saves
           const userpost=oldusers.findIndex(elm=>{
             return  elm.equals(userid) 
           })
           oldusers.splice(userpost,1)
           await ReviewSchema.updateOne({_id:itemid},{$set:{saves:oldusers}})          
             

  return res.status(200).json({ message: 'remove save' });
         }

await ReviewSchema.updateOne(
  { _id: itemid },
  { $push: { saves: userid } }
);
 
  await UserSchema.updateOne({_id:userid},{$push:{saves:{item:itemid,kind:kind}}})
  return res.status(200).json({ message: 'saved successfully' });
}else{
  return res.status(406).json({message:'invalid body'})
}



}