"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi_1.default.extend(joiPasswordExtendCore);
const SigninSchema = joi_1.default.object({
    email: joi_1.default.string().required(),
    password: joiPassword.string().required(),
});
const Validate = async (schema, DTO) => {
    var _a, _b;
    const validation = await schema.validate(DTO);
    ((_a = validation.error) === null || _a === void 0 ? void 0 : _a.message)
        ? { valid: false, message: (_b = validation.error) === null || _b === void 0 ? void 0 : _b.message }
        : { valid: true, message: "success" };
};
const ValidateSignInData = async (DTO) => {
    await Validate(SigninSchema, DTO);
};
exports.default = ValidateSignInData;
//# sourceMappingURL=UserValidator.js.map