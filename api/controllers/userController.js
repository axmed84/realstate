import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js";

export const getUsers = async (req,res)=>{
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to get USers"})
    }
}
export const getUser = async (req,res)=>{
    const id = req.params.id
    try {
        const user = await prisma.user.findUnique({
            where:{ id }
        });
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to get USer"})
    }
}

export const updateUser = async (req,res)=>{
    const id = req.params.id
    const tokenUserId = req.userId
    const {password, avatar, ...inputs} = req.body

    if(id !== tokenUserId){
        return res.status(403).json({message:"Not Authorized"})
    }

    let updatedPassword = null
    try {

        if(password){
            updatedPassword = await bcrypt.hash(password,10)
        }
        const updatedUser = await prisma.user.update({
            where:{id},
            data: {
                ...inputs,
                ...(updatedPassword && {password: updatedPassword}),
                ...(avatar && {avatar}),
            },
        })

        const {password:userPassword, ...rest} = updatedUser

        res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to Update USer"})
    }
}


export const deleteUser = async (req,res)=>{
    const id = req.params.id
    const tokenUserId = req.userId

    if(id !== tokenUserId){
        return res.status(403).json({message:"Not Authorized"})
    }


    try {
        await prisma.user.delete({
            where:{id}
        })
        res.status(200).json({message:"User Deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to Delete USer"})
    }
}


export const savedPost = async (req,res)=>{
    const postId = req.body.postId
    const tokenUserId = req.userId

    try {
       
        const savedPost = await prisma.savedPost.findUnique({
            where:{
                userId_postId:{
                    userId:tokenUserId,
                    postId,
                }
            }
        })

        if(savedPost) {
          await prisma.savedPost.delete({
            where:{
                id: savedPost.id,
            }
          }) 
          res.status(200).json({message:"Post removed from Saved List"}) 
        } else {
            await prisma.savedPost.create({
                data:{
                    userId: tokenUserId,
                    postId
                }
            })
            res.status(200).json({message:"Post Saved to List"})
        }
        
        res.status(200).json({message:"User Deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to Delete USer"})
    }
}

export const profilePosts = async (req,res)=>{
    const tokenUserId = req.params.userId
    try {
        const userPosts = await prisma.post.findMany({
            where:{ userId: tokenUserId }
        });
        const saved = await prisma.savedPost.findMany({
            where:{ userId: tokenUserId },
            include:{
                post:true
            }
        });

        const savedPost = saved.map(item=>item.post)
        res.status(200).json({userPosts, savedPost})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to get Profile posts"})
    }
}