import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const user=new Schema({
    name:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
    image:{type:String||null,default:null}
    ,
   imageid:{type:String||null,default:null} ,
    resettoken:{type:String||null,default:null},
    resetexpire:{type:String||null,default:null},
    likes: [
            {
    item: { type: Schema.Types.ObjectId, refPath: "likes.kind" },
    kind: { type: String, enum: ["post", "review","comment","subcomment"] }
             }
    ],
   saves: [
            {
    item: { type: Schema.Types.ObjectId, refPath: "saves.kind" },
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