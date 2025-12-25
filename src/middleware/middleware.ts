import JWT from 'jsonwebtoken'
import {connectToRedis} from '../redis'
import { Request, Response,NextFunction } from "express"

        export const isadmin=async(req:Request,res:Response,next:NextFunction)=>{
    
        const token=req.headers.authorization?.split(' ')[1]
       if(!token){
        return res.status(404).json({message:'not authorized'})
       }
       const isadmin= JWT.verify(token,'very very secret') as any
            if  (!isadmin){
                return res.status(404).json({message:'not authorized'})
            }
            if(isadmin.role!=='admin'){
                return res.status(404).json({message:'you are not the admin'})
            }
            next()
                                         
              
    }

            export const ratelimting=async(req:Request,res:Response,next:NextFunction)=>{
    
       const xff = req.headers['x-forwarded-for'] 

 const ip = (typeof xff === 'string'
    ? xff.split(',')[0]?.trim()
    : Array.isArray(xff)
    ? xff[0]
    : undefined) ||
  req.socket.remoteAddress;
  try{
  const redis=await connectToRedis()
  const rate=await redis?.incr(ip as string)
  
   if(rate===1){
   await redis?.expire(ip as string,120)
   }
   if(rate as number>5){
    return res.status(404).json({message:'please try later'})
   }
   console.log('the rate',rate)
   
  next()

  }catch(err){
    console.log(err)
    res.status(406).json({message:'somthing went wrong'})
  }

                                         
              
    }