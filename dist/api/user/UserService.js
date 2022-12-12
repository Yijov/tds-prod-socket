"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = __importDefault(require("./UserRepository"));
const security_1 = __importDefault(require("../../utils/security"));
const customErrors_1 = require("../custom_errors/customErrors");
const SIGN_IN = async (credentials, res) => {
    //verify account existence
    const accountExists = await UserRepository_1.default.FindUserByEmail(credentials.email);
    if (accountExists) {
        //validate password is coorect
        const authenticatedAccount = await security_1.default.validatePasswaord(credentials.password, accountExists.password);
        if (authenticatedAccount) {
            //add authentication cookeis to the response
            const token = await security_1.default.CreateToken({
                id: accountExists._id,
            });
            await security_1.default.addCredentials(res, token);
            return;
        }
        else {
            throw new customErrors_1.CustomBadRequestError("user or password is incorrect");
        }
    }
    else {
        throw new customErrors_1.CustomBadRequestError("user or password is incorrect");
    }
};
const SIGN_OUT = async (res) => {
    await security_1.default.removeCredentials(res);
    return true;
};
exports.default = { SIGN_OUT, SIGN_IN };
//# sourceMappingURL=UserService.js.map