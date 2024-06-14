"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patch_router_1 = __importDefault(require("./patch-router"));
const hello_router_1 = __importDefault(require("./hello-router"));
const user_router_1 = __importDefault(require("./user-router"));
const apiRoutes = [
    ['/', hello_router_1.default],
    ['/patch', patch_router_1.default],
    ['/user', user_router_1.default]
];
function addApiRoutes(app) {
    apiRoutes.forEach(([path, router]) => {
        app.use(path, router);
    });
}
exports.default = addApiRoutes;
