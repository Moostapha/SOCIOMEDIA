import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";          //https://www.npmjs.com/package/mongoose
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
// 2 Node native packages to set path when configure directories path + fileUrlToPath
import path from "path";               
import { fileURLToPath } from "url";
// routes
import authRoutes from './routes/authentification.js'; 
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';

// CODES SI ROUTES AVEC FICHIERS DANS INDEX.JS, ALTERNATIVE MIDDLEWARE
// import { register } from "./controllers/authentification.js";
// import { createPost } from "./controllers/post.js";
// import { verifyToken } from "./middlewares/authorization.js";

// injection manuelle de données dans la database mongoDB décommenter si besoin pour introduire les dummy datas de server/database/indexDb.js
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { users, posts } from './database/indexDb.js';


/* ---- EXPRESS CONFIGS ---- */

// Cf server/package.json, ajout de type:"module" préférence permettant de faire ce qui suit pour use le nom des dossiers
// Because of type: module in package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Var d'environnement
dotenv.config();

/* APP EXPRESS MIDDLEWARE USAGES */

// https://github.com/senchalabs/connect#middleware
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));  // Lieu de stockage en local de nos images

/* ---- FILE STORAGE ---- */

// Stockage des fichiers venant du client dans dossier public/assets du server
// const fileStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "public/assets");
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     },
// });
// const upload = multer({ fileStorage });

/* ---- ROUTES ENDPOINTS ---- */

/* ROUTES AVEC FICHIERS  */
// app.post('/auth/register', upload.single('picture'), register);          // upload user picture
// app.post('/posts', verifyToken, upload.single('picture'), createPost);  // upload post picture

/* ROUTES */
app.use('/auth', authRoutes);    // Authentification 
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

/* ---- MONGOOSE SETTINGS ---- */

// PORT number defined or another one just in case the first doesn't work
const PORT = process.env.PORT || 6001;

// Connection to the MongoDB database
mongoose.connect(
    process.env.MONGODB_CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT} Connexion OK`));
    
    // insertion manuelle de données dans notre mongoDB à faire une fois (refresh terminal once), ensuite commenter
    // Sinon duplication de data à chaque activation de nodemon
    // User.insertMany(users);
    // Post.insertMany(posts);

}).catch((error) => console.log(`${error} Erreur de connexion`));



