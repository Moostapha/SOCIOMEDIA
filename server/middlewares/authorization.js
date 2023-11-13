import  jwt from "jsonwebtoken";

// FONCTION DONNANT AUTORISATION AU USER LOGGÉ APRES AVOIR CHECK LE TOKEN
export const verifyToken = async(req, res, next) => {
    try {
        // token venant du header de la requête client (frontend)
        let tokenClient = req.header('Authorization');
        // Vérification s'il existe ou non
        if(!tokenClient) {
            return res.status(403).send('Access denied');
        }
        // Vérification que le tokenClient commence par Bearer
        if (tokenClient.startsWith('Bearer ')) {
            // On récupère tout aprés l'espace de Bearer => ce sera le token
            tokenClient = tokenClient.slice(7, tokenClient.length).trimLeft();
        }
        // Vérification du tokenClient
        const verified = jwt.verify(tokenClient, process.env.JWT_SECRET);
        // Application de verified sur la requête user
        req.user = verified;
        // Vérif. faite, on passe à la prochaine fonction 
        next();
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};
