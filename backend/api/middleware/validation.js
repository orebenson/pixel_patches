import { handleResponse } from '../utils/api-utils.js';

const validateField = (fieldName, value, validationFunction) => {
    if (!validationFunction(value)) {
        return `${fieldName} is invalid`;
    }
    return null;
};

export function validate(field_validation_functions={}) {
    return (req, res, next) => {
        const errors = [];

        const data = {
            ...req.body,
            ...req.params
        };

        for (const fieldName in field_validation_functions) {
            const validationError = validateField(fieldName, data[fieldName], field_validation_functions[fieldName]);
            if (validationError) {
                errors.push(validationError);
            }
        }

        if (errors.length > 0) {
            console.log('Validation Errors: ', errors);
            handleResponse(res, 400, 'Validation failed');
            return;
        }

        next();
    };
}
