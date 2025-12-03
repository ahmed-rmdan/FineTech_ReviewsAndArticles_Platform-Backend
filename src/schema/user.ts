import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const user=new Schema({
    name:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
    image:{type:String,default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
    ,
    resettoken:{type:String||null,default:null},
    resetexpire:{type:String||null,default:null},
    likes: [
            {
    item: { type: Schema.Types.ObjectId, refPath: "likes.kind" },
    kind: { type: String, enum: ["post", "review"] }
             }
    ],
   saves: [
            {
    item: { type: Schema.Types.ObjectId, refPath: "likes.kind" },
    kind: { type: String, enum: ["post", "review"] }
             }
    ],
    comments:[
        {type:Schema.Types.ObjectId,ref:'comment'}
    ],
    likedcomments:[
        {type:Schema.Types.ObjectId,ref:'comment'}
    ]

},{timestamps:true})

export const UserSchema=mongoose.model('user',user)