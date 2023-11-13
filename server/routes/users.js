import express  from "express";
import { verifyToken } from '../middlewares/authorization.js';
// import userCtler from '../controllers/user.js'; (1)
// ou import de chaque fonction du controller user this way
import {
    getUser, 
    getUserFriends, 
    updateUser, 
    deleteUser, 
    addRemoveFriend,
} from '../controllers/user.js';

const router = express.Router();

// CRUD 

// READ 
// router.get('/:id', verifyToken, userCtler.getUser); (1)
// GET LOGGED USER INFORMATION FROM THE DATABASE
router.get('/:id', verifyToken, getUser);
// GET USER FRIENDS
router.get('/:id/friends',verifyToken, getUserFriends);

// UPDATE => https://blog.octo.com/should-i-put-or-should-i-patch/
// user
router.patch('/:id', verifyToken, updateUser );
// user's friends
router.patch('/:id/:friendID', verifyToken, addRemoveFriend)

// DELETE
router.delete('/:id', verifyToken, deleteUser);

export default router;