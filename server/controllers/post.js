import Post from "../models/Post.js";
import User from "../models/User.js";

// CREATE POST component CreatePostWidget.jsx
export const createPost = async (req, res) => {
  try {
    // Frontend entries for creatin a post
    const { userId, description, picturePath } = req.body;
    console.log("Inputs venant du form:", req.body);
    // Infos userAuthorId est le userId du user postant => Recherche dans User.js
    const user = await User.findById(userId);
    console.log("userAuthor infos:", user);
    // Création du new post avec les entrées du front et infos userAuthor selon le schéma Post
    const newPost = new Post({
      userAuthorId: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    // Sauvegarde du newPost dans MongoDB
    await newPost.save();
    console.log("newPost: ", newPost);
    // Recherche de tous les posts en plus du newPost pour les renvoyer au front updated feedPosts
    const allPosts = await Post.find();
    res.status(201).json({ allPosts });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// READ POSTS

// Tous les posts
export const getFeedPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.status(200).json({ allPosts });
    console.log("getFeedPosts", allPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Tous les posts d'un user
export const getUserPosts = async (req, res) => {
  try {
    const { userAuthorId } = req.params;
    const userPosts = await Post.find({ userAuthorId });
    console.log("userAuthorId", userAuthorId);
    console.log("getUserPosts", userPosts);
    res.status(200).json({ userPosts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE POST
// Update description + file
export const updatePost = async (req, res) => {
  try {
    const postID = req.params;
    const { descriptionUpdate, picturePathUpdate } = req.body;
    const postToUpdate = await Post.findByIdAndUpdate(
      postID,
      { description: descriptionUpdate, picturePath: picturePathUpdate },
      { new: true }
    );
    await postToUpdate.save();
    // Recherche de tous les posts en plus du postUpdated pour les renvoyer au front updated feedPosts
    const allPosts = await Post.find();
    res.status(201).json({ allPosts });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// update likes
export const addRemovelikePost = async (req, res) => {
  try {
    const postId = req.params;
    const { userId } = req.body;
    const post = await Post.findById({ postId });

    // on check si le userId est dans le tableau like de ce post
    const isLiked = post.likes.get(userId);
    // si userId présent dans les likes de ce post
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    //
    const updatedLike = await Post.findByIdAndUpdate(
      postId,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json({ updatedLike });
  } catch (error) {}
};

// DELETE POST
export const deletePost = async (req, res) => {
  try {
    const postId = req.params;
    const postToDelete = await Post.findByIdAndDelete({ postId });
    res.status(201).json({ postToDelete });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
