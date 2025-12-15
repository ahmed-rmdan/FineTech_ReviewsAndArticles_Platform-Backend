import mongoose from "mongoose";
import {Schema} from "mongoose";

const schema=new Schema({
userid:{type:Schema.Types.ObjectId,ref:'user',require},
itemid:Schema.Types.ObjectId
,
content:String,
subcomments:{type:[
    {type:Schema.Types.ObjectId,ref:"subcomment"}
],default:[]},
likes:{type:[
    {type:Schema.Types.ObjectId,ref:'user'}
],default:[]},
name:String,
image:{type:String||null,default:null},

},{timestamps:true})


export const CommentSchema=mongoose.model('comment',schema)