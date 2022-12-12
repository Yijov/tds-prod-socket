"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customErrors_1 = require("../api/custom_errors/customErrors");
const NotFoundRouteHandler = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
// eslint-disable-next-line no-unused-vars
const ExeptionHandler = (error, req, res, next) => {
    let statusCode;
    const ErrorStack = process.env.NODE_ENV === "production" ? "FAIL :(" : error.stack;
    if (error instanceof customErrors_1.CustomValidationError) {
        statusCode = 400;
    }
    else if (error instanceof customErrors_1.CustomAuthError) {
        statusCode = 401;
    }
    else if (error instanceof customErrors_1.CustomBadRequestError) {
        statusCode = 400;
    }
    else if (error instanceof customErrors_1.CustomNotFoundError) {
        statusCode = 404;
    }
    else if (error instanceof customErrors_1.CustomConflictError) {
        statusCode = 409;
    }
    else {
        statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    }
    res.status(statusCode);
    res.json({
        success: false,
        message: error.message,
        stack: ErrorStack,
    });
};
exports.default = { ExeptionHandler, NotFoundRouteHandler };
//# sourceMappingURL=ErrorHandler.js.map