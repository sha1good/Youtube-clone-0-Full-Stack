import express from "express";
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, updateUser }  from "../controllers/user.js"
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//update a user

router.put("/:id",verifyToken ,updateUser)
 
//get a user

router.get("/find/:id",getUser)

//delete a user
router.delete("/:id",verifyToken, deleteUser)

//subscribe a user

router.put("/sub/:id", verifyToken, subscribe)

//unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribe)

//like a video
router.put("/like/:videoId",verifyToken, like)

//dislike a video

router.put("/dislike/:videoId", verifyToken, dislike)




export default router;