import { response } from "express";
import { createError } from "../error.js";
import Users from "../models/Users.js";
import Video from "../models/Video.js";

export const updateUser = async (request, response, next) => {
  //request.user.id is comming from verify token
  if (request.params.id === request.user.id) {
    try {
      const updatedUser = await Users.findByIdAndUpdate(
        request.params.id,
        {
          $set: request.body,
        },
        { new: true }
      );
      response.status(200).json(updatedUser);
    } catch (error) {
      next(createError(error.status, error.message));
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};

export const deleteUser = async (request, response, next) => {
  //request.user.id is comming from verify token
  if (request.params.id === request.user.id) {
    try {
      await Users.findByIdAndDelete(request.params.id);
      response.status(200).json("User has been deleted!");
    } catch (error) {
      next(createError(error.status, error.message));
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
};
export const getUser = async (request, response, next) => {
  try {
    const user = await Users.findById(request.params.id);
    response.status(200).json(user);
  } catch (error) {
    next(createError(error.status, error.message));
  }
};
export const subscribe = async (request, response, next) => {
  try {
    await Users.findByIdAndUpdate(request.user.id, {
      $push: { subscribeUsers: request.params.id },
    });

    await Users.findByIdAndUpdate(request.params.id, {
      $inc: { subscribeNumbers: 1 },
    });

    response.status(200).json("Subscription Successfull");
  } catch (error) {
    next(createError(error.status, error.message));
  }
};
export const unsubscribe = async (request, response, next) => {
  try {
    await Users.findByIdAndUpdate(request.user.id, {
      $pull: { subscribeUsers: request.params.id },
    });

    await Users.findByIdAndUpdate(request.params.id, {
      $inc: { subscribeNumbers: -1 },
    });

    response.status(200).json("Unsubscription Successfull");
  } catch (error) {
    next(createError(error.status, error.message));
  }
};
export const like = async (request, response, next) => {
     const  id = request.user.id;
     const videoId = request.params.videoId;

     try {
          await Video.findByIdAndUpdate(videoId, {
            $addToSet: {likes: id},
            $pull: { dislikes: id} //We are pulling from dislikes arrays should we have dislike this video before
          })
         response.status(200).json("The video has been liked!")  
     } catch (error) {
      next(createError(error.status, error.message));
     }
};
export const dislike = async (request, response, next) => {
   const id = request.user.id;
   const videoId = request.params.videoId;
    try {
         await Video.findByIdAndUpdate(videoId, {
          $addToSet: { dislikes: id},
          $pull: { likes: id} // same thing here
         })
         response.status(200).json("The video has been disliked!")  
    } catch (error) {
      next(createError(error.status, error.message));
    }
};
