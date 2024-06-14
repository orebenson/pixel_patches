"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_utils_1 = require("../utils/api-utils");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    (0, api_utils_1.handleResponse)(res, 200, 'hello world');
    return;
});
exports.default = router;
