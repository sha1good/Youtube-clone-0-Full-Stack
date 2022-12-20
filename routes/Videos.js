import express from "express";
import {
  addVideo,
  addView,
  deleteVideo,
  getRandomVideo,
  getSubscribedVideo,
  getTrendVideo,
  getVideo,
  getVideoBySearch,
  getVideoByTags,
  updateVideo,
} from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addVideo);

router.put("/:id", verifyToken, updateVideo);

router.get("/find/:id", getVideo);

router.delete("/:id", verifyToken, deleteVideo);

router.put("/view/:id", addView);
router.get("/trend", getTrendVideo);
router.get("/random", getRandomVideo);
router.get("/sub",verifyToken, getSubscribedVideo);
router.get("/tags", getVideoByTags);
router.get("/search", getVideoBySearch)

export default router;
