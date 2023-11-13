import express from 'express';
import authentification from '../controllers/authentification.js';
import multerStorage from '../middlewares/multerFileStorage.js';

// Mise en place du router pour la route authentification pur le user => signup + login
const router = express.Router();

// Routes d'authentification avec les logiques du controllers (register + login)

// ROUTE WITH FILE register => Stockage user infos + cryptage password
router.post('/authentification/register', multerStorage, authentification.register);

// login => Check le password et assigne un token
router.post('/authentification/login', authentification.login);

// Exportation
export default router;

// router.post('endpoint api url', middleware, controller)