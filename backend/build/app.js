"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("./api/routes/routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const db_utils_1 = require("./api/utils/db-utils");
const log_utils_1 = require("./api/utils/log-utils");
const log = log_utils_1.Logger.getInstance();
const DB_URL = process.env.DB_URL;
const SESSION_DB_URL = process.env.SESSION_DB_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;
const MODE = process.env.MODE;
log.logMessage(`MODE: ${MODE}`);
// db connection
const db_url = DB_URL;
try {
    mongoose_1.default.connect(db_url).then(() => {
        log.logMessage(`Database connected on ${db_url}`);
        (0, db_utils_1.dropCollectionIfExists)('users', mongoose_1.default.connection);
        (0, db_utils_1.dropCollectionIfExists)('patches', mongoose_1.default.connection);
    });
}
catch (error) {
    log.logError("Database connection error: ", error);
    throw error;
}
// express app
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use((0, helmet_1.default)());
app.set('trust proxy', 1);
app.use((0, express_session_1.default)({
    secret: SESSION_SECRET,
    name: 'xr',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: MODE === "prod" ? true : false,
        maxAge: 1000 * 60 * 60 * 12, // milliseconds - 12 hours
    },
    store: connect_mongo_1.default.create({
        mongoUrl: SESSION_DB_URL,
        collectionName: 'sessions',
    })
}));
app.use((req, res, next) => {
    log.logMessage(`${req.method} ${req.path}`);
    // Logger.logMessage(`${req.body}`);
    next();
});
// routes
(0, routes_1.default)(app);
exports.default = app;
