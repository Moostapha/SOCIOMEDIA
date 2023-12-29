import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";          
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
// injection manuelle de données dans la database mongoDB décommenter si besoin pour introduire les dummy datas de server/database/indexDb.js
// import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from './database/indexDb.js';


/* ---- EXPRESS CONFIGS ---- */
// Because of type: module in package.json Cf server/package.json, ajout de type:"module" préférence permettant de faire ce qui suit pour use le nom des dossiers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();               
const app = express();          // https://github.com/senchalabs/connect#middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


/* --------- ROUTES --------- */
app.use('/auth', authRoutes);    // Authentification => Logics create user + multer | login user
app.use('/users', userRoutes);   // CRUD users logics
app.use('/posts', postRoutes);   // CRUD posts logics


/* ---- MONGOOSE SETTINGS ---- */
const PORT = process.env.PORT || 6001;
// Connection to the MongoDB database
mongoose.connect(
    process.env.MONGODB_CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT} Connexion OK`));
    
    // insertion manuelle de données dans notre mongoDB (refresh terminal once), ensuite commenter sinon duplication de data à chaque activation de nodemon
    // AJOUT DE DONNEES 
    // User.insertMany(users);
     //Post.insertMany(posts);

}).catch((error) => console.log(`${error} Erreur de connexion`));



