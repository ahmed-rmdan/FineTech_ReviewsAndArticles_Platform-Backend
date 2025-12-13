


export type post={
    title:string,
    description:string,
    mainimage:string,
    content:string,
    mainslider:boolean,
    id:string ,
    createdAt:Date   
}

export type review={
    title:string,
    category:string
    description:string,
    mainimage:string,
    content:string,
    id:string,
    summary:string,
    score:Number ,
       createdAt:Date  
}

export type user={
    name:string,
    username:string,
    password:string,
    email:string
}
export type SavePopulated = {
  item: post | review
  kind: 'post' | 'review'
}[]