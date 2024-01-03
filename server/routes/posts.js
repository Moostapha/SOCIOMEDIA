import express from "express";
import {
  createPost,
  getFeedPosts,
  getUserPosts,
  updatePost,
  addRemovelikePost,
  deletePost,
} from "../controllers/post.js";
import { verifyToken } from "../middlewares/authorization.js";
import uploadFile from "../middlewares/multerFileStorage.js";
// NOTES https://bobbyhadz.com/blog/javascript-requested-module-not-provide-export-named

const router = express.Router();

// CRUD LOGICS

// CREATE POST ROUTE WITH FILE UPLOAD => Component CreatePostWidget.jsx
router.post("/createPost", verifyToken, uploadFile, createPost);

/* --- READ --- */
// 2 calls to this route in PostsWidget.jsx

// Get all posts from the db => Component PostsWidget.jsx
router.get("/", verifyToken, getFeedPosts);

// Get loggedIn user's posts => Component PostsWidget.jsx
router.get("/:userAuthorId/userposts", verifyToken, getUserPosts);

/* --- UPDATE --- */

// update likes => Component PostWidget.jsx
router.patch(":id/like", verifyToken, addRemovelikePost);

// update file + description for a post
router.put("/:id/update", verifyToken, uploadFile, updatePost);

/* --- DELETE --- */
router.delete("/:id/delete", verifyToken, deletePost);

// exportation
export default router;
