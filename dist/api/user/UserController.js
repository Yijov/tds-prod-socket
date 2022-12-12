"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Responder_1 = __importDefault(require("../../utils/Responder"));
const UserValidator_1 = __importDefault(require("./UserValidator"));
const UserService_1 = __importDefault(require("./UserService"));
//  [POST] /api/v1/account/signin
const POST_SIGNIN = async (req, res, next) => {
    try {
        //vañlidate data is complete and in the right format
        const credentials = req.body;
        await (0, UserValidator_1.default)(credentials);
        //sign in the customer
        await UserService_1.default.SIGN_IN(credentials, res);
        //send response
        return Responder_1.default.Success(res);
    }
    catch (error) {
        //proceed to error handleling midleware
        next(error);
    }
};
// [GET] /api/v1/account/signout
const GET_SIGNOUT = async (req, res, next) => {
    try {
        //sign out the customer
        await UserService_1.default.SIGN_OUT(res);
        //send response
        Responder_1.default.Success(res);
    }
    catch (error) {
        //proceed to error handleling midleware
        next(error);
    }
};
exports.default = { GET_SIGNOUT, POST_SIGNIN };
//# sourceMappingURL=UserController.js.map