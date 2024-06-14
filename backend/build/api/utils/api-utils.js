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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleResponse = exports.handleRequest = void 0;
function handleRequest(service) {
    return (req, res) => __awaiter(this, void 0, void 0, function* () {
        const params = Object.assign(Object.assign({}, req.body), req.params);
        const result = yield service(params);
        handleResponse(res, result.status, result.message, result.data);
    });
}
exports.handleRequest = handleRequest;
function handleResponse(res_1, status_1) {
    return __awaiter(this, arguments, void 0, function* (res, status, message = '', data = {}) {
        res.status(status);
        res.json({
            status,
            message,
            data
        });
    });
}
exports.handleResponse = handleResponse;
;
