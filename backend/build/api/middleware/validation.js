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
exports.validateFields = void 0;
const api_utils_1 = require("../utils/api-utils");
const validateField = (fieldName, value, validationFunction) => {
    if (!validationFunction(value)) {
        return `${fieldName} is invalid`;
    }
    return null;
};
function validateFields(field_validation_functions = {}) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const errors = [];
        const data = Object.assign(Object.assign({}, req.body), req.params);
        for (const fieldName in field_validation_functions) {
            const validationError = validateField(fieldName, data[fieldName], field_validation_functions[fieldName]);
            if (validationError) {
                errors.push(validationError);
            }
        }
        if (errors.length > 0) {
            console.error('Validation Errors: ', errors);
            yield (0, api_utils_1.handleResponse)(res, 400, 'Validation failed');
            return;
        }
        next();
    });
}
exports.validateFields = validateFields;
