import mongoose from "mongoose";
import {Schema} from "mongoose";

const schema=new Schema({
title:{type:String},
description:String,
mainimage:{type:String,default:''},
content:String,
likes:{type:[
    {type:Schema.Types.ObjectId,ref:'user'}
],default:[]},
comments:{type:[
    {type:Schema.Types.ObjectId,ref:'comment'}
],default:[]},
mainslider:{type:Boolean,default:false},
imageid:{type:String,default:''}


},{timestamps:true})


export const PostSchema=mongoose.model('post',schema)