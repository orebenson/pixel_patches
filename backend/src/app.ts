import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import addApiRoutes from './api/routes/routes';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { dropCollectionIfExists } from './api/utils/db-utils';

const DB_URL = process.env.DB_URL;
const SESSION_DB_URL = process.env.SESSION_DB_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;

// db connection
const db_url = DB_URL;

try {
    mongoose.connect(db_url).then(
        () => {
            console.log(`Database connected on ${db_url}`);
            dropCollectionIfExists('users', mongoose.connection);
            dropCollectionIfExists('patches', mongoose.connection);
        }
    )
} catch (error) {
    console.error(`Database connection error: ${error}`);
    throw error;
}


// express app
const app = express();

// middleware
const corsOptions = {
    origin: FRONTEND_URL,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    name: 'sid',
    cookie: {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 8, //milliseconds - 8 hours
    },
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: SESSION_DB_URL,
        collectionName: 'sessions',

    })
}));
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

// routes
addApiRoutes(app);

export default app;

