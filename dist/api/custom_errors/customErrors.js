"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomValidationError = exports.CustomNotFoundError = exports.CustomConflictError = exports.CustomBadRequestError = exports.CustomAuthError = void 0;
class CustomAuthError extends Error {
    constructor(message) {
        super(message);
        this.name = "Auth Error";
    }
}
exports.CustomAuthError = CustomAuthError;
class CustomBadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "Bad request";
    }
}
exports.CustomBadRequestError = CustomBadRequestError;
class CustomConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = "conflict";
    }
}
exports.CustomConflictError = CustomConflictError;
class CustomNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "Not Found";
    }
}
exports.CustomNotFoundError = CustomNotFoundError;
class CustomValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "Validation Error";
    }
}
exports.CustomValidationError = CustomValidationError;
//# sourceMappingURL=customErrors.js.map