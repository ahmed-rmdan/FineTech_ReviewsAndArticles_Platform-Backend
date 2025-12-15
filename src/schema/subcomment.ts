import mongoose from "mongoose";
import {Schema} from "mongoose";

const schema=new Schema({
userid:{type:Schema.Types.ObjectId,ref:'user'},
itemid:{type:Schema.Types.ObjectId}
,
commentid:{type:Schema.Types.ObjectId}
,
content:String,
likes:{type:[
    {type:Schema.Types.ObjectId,ref:'user'}
],default:[]},
name:String,
image:{type:String||null,default:null},

},{timestamps:true})


export const SubcommentSchema=mongoose.model("subcomment",schema)