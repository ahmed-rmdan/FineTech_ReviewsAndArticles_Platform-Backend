import { NextFunction,Request,Response } from "express";

import { PostSchema } from "../schema/post";
import { ReviewSchema } from "../schema/review";



export const getreport=async(req:Request,res:Response,next:NextFunction)=>{
              
          try{
            let reviewsviews=0 
             let postsviews=0
             let postslikes=0
             let reviewslikes=0
            const reviews=await ReviewSchema.find()
            reviews.forEach((review)=>{
                reviewsviews+=review.views
                reviewslikes+=review.likes.length
            })
            const posts=await PostSchema.find()
            posts.forEach((post)=>{
                postsviews+=post.views
                postslikes+=post.likes.length
            })

            const allviews=reviewsviews+postsviews
           
            const postsnop=posts.length
            const reviewsnop=reviews.length

             return res.status(200).json({postsnop,reviewsnop,allviews,postsviews,reviewsviews,postslikes,reviewslikes})

          }catch(err){                                    
           return res.status(406).json({message:'somthing went wrong'})
                   }                                                
         
}