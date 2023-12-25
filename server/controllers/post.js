import Post from '../models/Post.js';
import User from '../models/User.js';


// CREATE POST
export const createPost = async (req, res) => {
    try {
        // Frontend entries for creatin a post
        const { userID, description, picturePath } = req.body;
        // Infos userAuthor
        const user = await User.findById({userID});
        // Création du new post avec les entrées du front et infos userAuthor selon le schéma Post
        const newPost = new Post({
            userID,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        // Sauvegarde du newPost dans MongoDB
        await newPost.save();
        // Recherche de tous les posts en plus du newPost pour les renvoyer au front updated feedPosts
        const allPosts = await Post.find();
        res.status(201).json({allPosts})
    
    } catch (error) {
        res.status(409).json({ message : error.message })
    }
};


// READ POSTS

// Tous les posts
export const getFeedPosts = async (req, res) => {
    try {
        const allPosts = await Post.find();
        res.status(200).json({allPosts});
    } catch (error) {
        res.status(404).json({ message : error.message })
    }
};

// Tous les posts d'un user
export const getUserPosts = async (req, res) => {
    try {
        const {userID} = req.params;
        const userPosts = await Post.find({ userID });
        res.status(200).json({ userPosts });
    } catch (error) {
        res.status(404).json({ message : error.message })
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
            {  description: descriptionUpdate, picturePath: picturePathUpdate },
            {new: true}
        );
        await postToUpdate.save();
        // Recherche de tous les posts en plus du postUpdated pour les renvoyer au front updated feedPosts
        const allPosts = await Post.find();
        res.status(201).json({allPosts})
    
    } catch (error) {
        res.status(409).json({ message : error.message })
    }
};

// update likes
export const addRemovelikePost = async (req, res) => {
    try {
        const postID = req.params;
        const {userID} = req.body;
        const post =  await Post.findById({postID});
        
        // on check si le userID est dans le tableau like de ce post
        const isLiked = post.likes.get(userID);
        // si userID présent dans les likes de ce post
        if(isLiked) {
            post.likes.delete(userID);
        } else {
            post.likes.set(userID, true);
        }
        
        //
        const updatedLike = await Post.findByIdAndUpdate(
            postID,
            { likes: post.likes },
            { new: true }
        )
        res.status(200).json({updatedLike});
    } catch (error) {
        
    }
}


// DELETE POST
export const deletePost = async (req, res) => {
    try { 
        const postID = req.params;
        const postToDelete = await Post.findByIdAndDelete({postID});
        res.status(201).json({postToDelete});
    } catch (error) {
        res.status(409).json({ message : error.message })
    }
};