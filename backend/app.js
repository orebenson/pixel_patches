import 'dotenv/config';
import express from 'express';
import addApiRoutes from './api/routes/routes.js';
import mongoose from 'mongoose';
import { dropCollectionIfExists } from './api/utils/dbUtils.js'

// db connection
const db_url = process.env.DB_URL;
await mongoose.connect(db_url).then(
    async () => { 
        console.log(`Database connected on ${db_url}`);
        await dropCollectionIfExists('patches', mongoose.connection);
    },
    error => { console.log(`Database connection error: ${error}`) }
)

// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

// routes
addApiRoutes(app);

export default app;

