import express from "express"
import { deleteUser, getUser, getUsers, profilePosts, savedPost, updateUser } from "../controllers/userController.js"
import {verifyToken} from "../middleware/verifyToken.js"

const router = express.Router()

router.get("/", getUsers)
router.get("/:id", verifyToken, getUser)
router.put("/:id", verifyToken, updateUser)
router.delete("/:id", verifyToken, deleteUser)
router.post("/save", verifyToken, savedPost)
router.get("/profileposts", verifyToken, profilePosts)

export default router