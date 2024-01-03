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

/* 1) -- READ-- */

// GET Logged user from the database
router.get('/:id', verifyToken, getUser); 

// GET Logged user's friend list from the database
router.get('/:id/friends', verifyToken, getUserFriends);

// router.get('/:id', verifyToken, userCtler.getUser); (1)


/* 2) -- UPDATE -- https://blog.octo.com/should-i-put-or-should-i-patch/ */

// user update
router.patch('/:id', verifyToken, updateUser ); 

// user's friends update addRemove
router.patch('/:id/:friendId', verifyToken, addRemoveFriend)  


/* 3) --DELETE-- */
router.delete('/:id', verifyToken, deleteUser);

export default router;