import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from'../models/User.js';

// Authentification logic SIGNUP + LOGGIN

// REGISTER SIGNUP => Cryptage du password entré
export const register = async (req, res) => {
    try {
        // frontend inputs user du corps de requête en constante destructuring
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;
        
        // constante salt via bcrypt (fonction native genSalt()) pour crypter le password
        const salt = await bcrypt.genSalt();
        // hash du password envoyé par le front
        const passwordHash = await bcrypt.hash(password, salt);
        
        // Création d'un new user avec captage des inputs et utilisation du model User pour entrer les infos dans la db
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random()* 1000),  // dumy values
            impressions: Math.floor(Math.random()* 1000),   // dumy values
        })
        
        // Sauvegarde du new user créè
        const savedUser = await newUser.save();
        
        // Envoi d'un statut 201 réussite via res au front + msg
        res.status(201).json(savedUser);
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};


// LOGIN => Vérification du password + assignation du token
export const login = async(req, res ) => {
    try {
        
        // 1) destructuring email et password du client
        const { email, password } = req.body;
        
        // 2) Checking if good email + password from client
        // Recherche du user possédant le email entré
        const user = await User.findOne({ email: email });
        
        // Si email entré par user ne match pas avec info email db
        if(!user) return res.status(400).json({ msg: "Email n'existe pas dans la DB" });
        
        // Comparaison des hash des passwords (celui entré par client et celui stocké ds DB)
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        // Si password ne correspond pas
        if(!passwordMatch) return res.status(400).json({ msg: "Password invalide"});
        
        // 3) Token assigné au user avec un jeton secret
        const token = jwt.sign({id: User._id}, process.env.JWT_SECRET);
        
        // Pour que le password ne soit pas renvoyé au front
        delete user.password;
        res.status(200).json({ token, user});
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}


