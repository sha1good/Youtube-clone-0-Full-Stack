import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const addComment = async (request, response, next) => {
  const newComment = new Comment({ userId: request.user.id, ...request.body });
  try {
    const savedComment = await newComment.save();
    response.status(200).json(savedComment);
  } catch (error) {
    next(createError(error.status, error.message));
  }
};

export const deleteComment = async (request, response, next) => {
  try {
    const comment = await Comment.findById(request.params.id);
    const video = await Video.findById(request.params.id);
    console.log(comment)
    if (
      request.user.id === comment.userId ||
      request.user.id === video.userId
    ) {
      await Comment.findByIdAndDelete(request.params.id);
      response.status(200).json("The comment has been deleted!");
    } else {
      return next(
        createError(403, "You are only allowed to delete your comment")
      );
    }
  } catch (error) {
    next(createError(error.status, error.message));
  }
};

export const getComments = async (request, response, next) => {
  try {
    const comments = await Comment.find({ videoId: request.params.videoId });
    response.status(200).json(comments);
  } catch (error) {
    next(createError(error.status, error.message));
  }
};
