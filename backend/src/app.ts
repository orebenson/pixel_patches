import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import addApiRoutes from './api/routes/routes';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { dropCollectionIfExists } from './api/utils/db-utils';

const DB_URL = process.env.DB_URL;
const SESSION_DB_URL = process.env.SESSION_DB_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;
const MODE = process.env.MODE;
console.log("MODE: ", MODE)

// db connection
const db_url = DB_URL;

try {
    mongoose.connect(db_url).then(() => {
        console.log(`Database connected on ${db_url}`);
        dropCollectionIfExists('users', mongoose.connection);
        dropCollectionIfExists('patches', mongoose.connection);
    });
} catch (error) {
    console.error(`Database connection error: ${error}`);
    throw error;
}


// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(helmet());
app.set('trust proxy', 1);
app.use(session({
    secret: SESSION_SECRET,
    name: 'xr',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: MODE === "prod" ? true : false,
        maxAge: 1000 * 60 * 60 * 12, // milliseconds - 12 hours
    },
    store: MongoStore.create({
        mongoUrl: SESSION_DB_URL,
        collectionName: 'sessions',
    })
}));
app.use((req, res, next) => {
    console.log(req.method, req.path);
    // console.log(req.body)
    next();
})

// routes
addApiRoutes(app);

export default app;

