import express from "express";
import { register, login } from "../controllers/authentification.js";
import uploadFile from "../middlewares/multerFileStorage.js";

// Mise en place du router pour la route authentification pour le user => signup + login
const router = express.Router();

// Routes d'authentification avec les logiques du controllers (register + login)

// ROUTE WITH FILE : multer storage upload fichier avatar | register => Stockage user infos + cryptage password
router.post("/register", uploadFile, register);

// login => Check le password et assigne un token
router.post("/login", login);

// Exportation
export default router;

// router.post('endpoint api url', middleware, controller)
