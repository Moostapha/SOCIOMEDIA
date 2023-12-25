import express from 'express';
import { 
    createPost,
    getFeedPosts,
    getUserPosts,
    updatePost,
    addRemovelikePost,
    deletePost,
} from '../controllers/post.js';
import { verifyToken } from '../middlewares/authorization.js';
import  upload  from "../middlewares/multerFileStorage.js";
// NOTES https://bobbyhadz.com/blog/javascript-requested-module-not-provide-export-named

const router = express.Router();

// CRUD

// CREATE POST ROUTE WITH FILE UPLOAD
router.post("/createPost", verifyToken, upload, createPost);

// READ
router.get('/', verifyToken, getFeedPosts);
router.get('/:userID/posts', verifyToken, getUserPosts)

// UPDATE
// update file + description for a post
router.put("/:id/update", verifyToken, upload, updatePost);
router.patch(':id/like', verifyToken, addRemovelikePost);

// DELETE
router.delete('/:id/delete', verifyToken, deletePost);

// exportation
export default router;