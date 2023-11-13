import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";          //https://www.npmjs.com/package/mongoose
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
// 2 Node native packages to set path when configure directories
import path from "path";
import { fileURLToPath } from "url";
// import of controllers (endpoints logics)
import {register} from './controllers/authentification.js';
// import des Routes 
// authentification (construites avec les logiques de register + login du ctrler authentification.js)
import authRoutes from './routes/authentification.js';
// user routes
import userRoutes from './routes/users.js';
// post routes
import postRoutes from './routes/posts.js';


/* ------------------------------------- MIDDLEWARE CONFIGS -------------------------------------------- */

// Cf server/package.json, ajout de type:"module" préférence permettant de faire ce qui suit pour use le nom des dossiers
// Because of type: module in package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Var d'environnement
dotenv.config();

// APP EXPRESS MIDDLEWARE USAGES
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


/* -------------------------------------- FILES STORAGE AVEC MULTER upload MIDDLEWARE ---------------------------------- */


const storage = multer.diskStorage({ 
    destination: function(req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload= multer({ storage });


/* ---------------------- ROUTES ENDPOINTS ---------------------------------------- */

// ROUTES AVEC FICHIERS REGISTER + POSTS
// app.post('endpoint api url', middleware, controller)
app.post('/auth/register', upload.single('picture', register));


// Authentification when register login (check good credentials password, username)
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes)


/*----------------------------------------- MONGOOSE SETTINGS ------------------------------------- */

// PORT number defined or another one just in case the first doesn't work
const PORT = process.env.PORT || 6001;

// Connection to the MongoDB database
mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT} Connexion OK`));
}).catch((error) => console.log(`${error} Erreur de connexion`));



