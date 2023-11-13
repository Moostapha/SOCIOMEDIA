import User from '../models/User';

// CREATE USER CF AUTHENTIFICATION CTLERS

// READ

// GET USER CONTROLLER LOGICS
export const getUser = async (req, res) => {
    try {
        //1) Captage de l'id dans les params de la requête
        const {id} = req.params;
        const user = await User.findById(id);
        //2) Renvoi infos user au front
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

// GET USERS FRIENDS LIST CONTROLLER LOGICS
export const getUserFriends = async (req, res) => {
    try {
        
        // Recherche dans la db du id user
        const {id} = req.params;
        const user = await User.findById(id);
        // Recherche de friends qui match avec id user avec fonction map()
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        ); 
        // Récup du tableau friends datas formatté pour usage au frontend
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        );
        // réponse data usable par le front, modification du Schema avant envoi au front
        res.status(200).json({formattedFriends});
        
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};


// UPDATE USER CONTROLLER LOGICS
export const updateUser = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};


// DELETE USER CONTROLLER LOGICS
export const deleteUser = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};


// ADD REMOVE USER'S FRIENDS CONTROLLER LOGICS
export const addRemoveFriend = async (req, res) => {
    try {
        
        // Récupération des ids dynamiques
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        
        // si le friendId fait partie de la liste d'ami de user on le remove avec filter()
        if(user.friends.includes(friendId)) {
            // on renvoie le tableau de friends avec le friend supprimé
            user.friends = user.friends.filter((id) => id!== friendId);
            friend.friends = friend.friends.filter((id) => id!== id)
        } else {
            // sinon on le rajoute à la liste d'amis
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        
        // Sauvegarde dans mongoDB
        await user.save();
        await friend.save();
        
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        
        // Récup du tableau friends datas formatté pour usage au frontend
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        );
        res.status(200).json({formattedFriends});
        
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};
