import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken"
import { ObjectId } from "mongodb"

export const getPosts = async (req,res) => {
    const query = req.query;
    console.log(query);
    try {
        
        const posts = await prisma.post.findMany({
            where:{
                city:query.city || undefined,
                type:query.type || undefined,
                property:query.property || undefined,
                bedroom: parseInt(query.bedroom) || undefined,
                price:{
                    gte: parseInt(query.minPrice) || 0,
                    lte: parseInt(query.maxPrice) || 10000000,
                }
            }
        })

            res.status(200).json(posts)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to get Posts"})
    }
}
export const getPost = async (req,res) => {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

    try {
        const post = await prisma.post.findUnique({
            where:{id},
            include: {
                postDetail: true,
                user: {
                    select:{
                        username:true,
                        avatar:true
                    }
                },
            }
        })

        // let userId;

        // const token = req.cookies?.token

        // if (!token) {
        //     userId = null
        // } else {
        //     jwt.verify(token, process.env.JWT_SECRET_KEY, async(err,payload)=>{
        //         if (err) {
        //             userId = null
        //         } else {
        //             userId = payload.id
        //         } 
        //     })
        // }

        // const saved = await prisma.savedPost.findUnique({
        //     where:{
        //         userId_postId:{
        //             postId: id,
        //             userId,
        //         }
        //     }
        // })

        const token = req.cookies?.token;

    let userId = null;

    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        userId = payload.id;
      } catch (err) {
        userId = null;
      }
    }

    const saved = userId
      ? await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              postId: id,
              userId,
            },
          },
        })
      : null;

        res.status(200).json({...post,isSaved: saved ? true : false})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to get Posts"})
    }
}
export const addPost = async (req,res) => {
    const body = req.body
    const tokenUserId = req.userId

    try {
        const newPost = await prisma.post.create({
            data: {
                ...body.postData,
                userId: tokenUserId,
                postDetail:{
                   create:body.postDetail, 
                }
            }
        })
        res.status(200).json(newPost)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to add Posts"})
    }
}
export const updatePost = async (req,res) => {
    try {
        
        res.status(200).json()
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to get Posts"})
    }
}
export const deletePost = async (req,res) => {
    const id = req.params.id
    const tokenUserId = req.userId

    try {
        
        const post = await prisma.post.findUnique({
           where:{id} 
        })

        if(post.userId !== tokenUserId){
            return res.status(403).json({message:"Not Authorized"})
        }

        await prisma.post.delete({
            where: {id}
        })

        res.status(200).json({message:"Post deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to get Posts"})
    }
}