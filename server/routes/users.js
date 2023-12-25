import express  from "express";
import { verifyToken } from '../middlewares/authorization.js';
import {
    getUser, 
    getUserFriends, 
    updateUser, 
    deleteUser, 
    addRemoveFriend,
} from '../controllers/user.js';
// import userCtler from '../controllers/user.js'; (1)

const router = express.Router();

/* --CRUD-- */

/* --READ-- */
// router.get('/:id', verifyToken, userCtler.getUser); (1)
router.get('/:id', verifyToken, getUser);                 // GET Logged user from the database
router.get('/:id/friends',verifyToken, getUserFriends);  // GET Logged user's friend list from the database

/* --UPDATE-- */
// => https://blog.octo.com/should-i-put-or-should-i-patch/
router.patch('/:id', verifyToken, updateUser );               // user
router.patch('/:id/:friendID', verifyToken, addRemoveFriend)  // user's friends

/* --DELETE-- */
router.delete('/:id', verifyToken, deleteUser);

export default router;