import mongoose from "mongoose";

// Data structure for post (Schema)
const PostSchema = new mongoose.Schema(
    {
        userAuthorId: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        
        location: String,
        description: String,
        userPicturePath: String,
        picturePath: String,
        
        likes: {
            type: Map,
            of: Boolean,
        },
        comments: {
            type: Array,
            default: [],
        },
        
    },
    {timestamps: true}
);

// Set model Post with PostSchema
const Post = mongoose.model( 'Post', PostSchema );

// Export Model
export default Post;