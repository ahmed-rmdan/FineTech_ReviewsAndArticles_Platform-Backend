import mongoose from "mongoose";
import {Schema} from "mongoose";

const schema=new Schema({
title:{type:String},
category:{type:String,require:true,default:'allreviews'},
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
imageid:{type:String,default:''},
summary:{type:String,default:''},
score:{type:Number,require:true},
usersscore:{
    type:[
        {id:{type:Schema.Types.ObjectId,ref:'user'},score:{type:Number,require:true}}
    ]
},
type:{type:String,default:'review'}


},{timestamps:true})


export const ReviewSchema=mongoose.model('review',schema)