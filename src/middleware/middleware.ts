import JWT from 'jsonwebtoken'

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