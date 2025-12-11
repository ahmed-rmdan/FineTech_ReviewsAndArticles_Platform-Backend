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
saves:{type:[
    {type:Schema.Types.ObjectId,ref:'user'}
],default:[]}
,
comments:{type:[
    {type:Schema.Types.ObjectId,ref:'comment'}
],default:[]},
views:{type:Number,default:0},
mainslider:{type:Boolean,default:false},
imageid:{type:String,default:''},
type:{type:String,default:'post'}


},{timestamps:true})


export const PostSchema=mongoose.model('post',schema)