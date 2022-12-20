import { createError } from "../error.js";
import Users from "../models/Users.js";
import Video from "../models/Video.js";

export const addVideo = async (request, response, next) => {
  const newVideo = new Video({ userId: request.user.id, ...request.body });

  try {
    const savedVideo = await newVideo.save();
    response.status(200).json(savedVideo);
  } catch (error) {
    next(createError(error.status, error.message));
  }
};
export const updateVideo = async (request, response, next) => {
  try {
    const video = await Video.findById(request.params.id);
    if (!video) return next(createError(404, "Video not found!"));

    if (request.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        request.params.id,
        { $set: request.body },
        { new: true }
      );
      response.status(200).json(updatedVideo);
    } else {
      return next(createError(403, "You allowed to update only your video"));
    }
  } catch (error) {
    next(createError(error.status, error.message));
  }
};
export const deleteVideo = async (request, response, next) => {
  try {
    const video = await Video.findById(request.params.id);
    if (!video) return next(createError(404, "Video not found!"));

    if (request.user.id === video.userId) {
      await Video.findByIdAndDelete(request.params.id);
      response.status(200).json("The Video has been deleted!");
    } else {
      return next(createError(403, "You allowed to delete only your video"));
    }
  } catch (error) {
    next(createError(error.status, error.message));
  }
};
export const getVideo = async (request, response, next) => {
  try {
    const video = await Video.findById(request.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    response.status(200).json(video);
  } catch (error) {
    next(createError(error.status, error.message));
  }
};

export const addView = async (request, response, next) => {
  try {
    await Video.findByIdAndUpdate(request.params.id, {
      $inc: { views: 1 },
    });
    response.status(200).json("The video view has been updated!");
  } catch (error) {
    next(createError(error.status, error.message));
  }
};

export const getRandomVideo = async (request, response, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    response.status(200).json(videos);
  } catch (error) {
    next(createError(error.status, error.message));
  }
};

export const getTrendVideo = async (request, response, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });

    response.status(200).json(videos);
  } catch (error) {
    next(createError(error.status, error.message));
  }
};

export const getSubscribedVideo = async (request, response, next) => {
  try {
    const user = await Users.findById(request.user.id);
    const subscribedChannels = user.subscribeUsers;

    //Now we need t loop through all the subscribedChannels/subscribedUser and get the list of users/channel that user subscribed to
    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    response
      .status(200)
      .json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(createError(error.status, error.message));
  }
};

export const getVideoByTags = async (request, response, next) => {
  // const { tags} = request.query; or use the below code
  const tags = request.query.tags.split(",");
  //console.log(tags)

  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);

    response.status(200).json(videos);
  } catch (error) {
    next(createError(error.status, error.message));
  }
};

export const getVideoBySearch = async (request, response, next) => {
     const query = request.query.q;
  try {
    const videos = await Video.find({ title: { $regex: query, $options: "i"}}).limit(20);

    response.status(200).json(videos);
  } catch (error) {
    next(createError(error.status, error.message));
  }
};
