"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./api/routes/routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_utils_1 = require("./api/utils/db-utils");
// db connection
const db_url = process.env.DB_URL;
mongoose_1.default.connect(db_url).then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Database connected on ${db_url}`);
    yield (0, db_utils_1.dropCollectionIfExists)('patches', mongoose_1.default.connection);
}), error => { console.log(`Database connection error: ${error}`); });
// express app
const app = (0, express_1.default)();
// middleware
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});
// routes
(0, routes_1.default)(app);
exports.default = app;
