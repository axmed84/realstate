import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma from "../lib/prisma.js";

export const register = async (req,res) => {
    const { username, email, password} = req.body

    try {       
    // Hash Pashword

    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword);

    // Create new user and save to db
    const newUser = await prisma.user.create({
        data:{
            username,
            email,
            password:hashedPassword,
        },
    })

    console.log(newUser);

    res.status(201).json({message:"User created Succesfully"})

} catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to create user"})
}
}


export const login = async (req,res) => {

    const {username, password} = req.body

    try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
        where:{username}
    })

    if (!user) return res.status(400).json({message:"Invalid Credentials"})

    // Check if the passwword is correct

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid) return res.status(400).json({message:"Invalid Credentials"})
    // Generate Cookie

    // res.setHeader("set-Cookie", "test=" + "myValue").json("success")

    const age = 1000 * 60 * 60 * 24 * 7

    const token = jwt.sign({
        id:user.id,
        isAdmin: true,
    }, process.env.JWT_SECRET_KEY,{expiresIn: age})

    const {password:userPassword, ...userInfo} = user

    res.cookie("token", token, {
        httpOnly:true,
        // secure:true,
        maxAge:age
    }).status(200).json(userInfo)
            
} catch (error) {
       console.log(error) 
       res.status(500).json({message:"Failed to Login"})
}
}

export const logout = (req,res) => {
    res.clearCookie("token").status(200).json({message:"LogOut Successfull"})
}