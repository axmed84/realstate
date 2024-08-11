import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import postRouter from "./routes/post.route.js";
import authRouter from "./routes/auth.route.js";
import testRouter from "./routes/test.route.js";
import userRouter from "./routes/user.route.js";


const app = express();

app.use(cors())
app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/test", testRouter)
app.use("/api/posts", postRouter)

app.listen(8800, ()=>{
   console.log("Server is running"); 
})