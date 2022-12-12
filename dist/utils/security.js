"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//JWR security functions
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokenMaxAge = 1 * 24 * 60 * 60; //24 hours
const EncriptPasword = async (password) => {
    const salt = await bcrypt_1.default.genSalt(10);
    const hashedPasword = await bcrypt_1.default.hash(password, salt);
    return hashedPasword;
};
const validatePasswaord = async (SubmitedPassword, encriptedPassword) => {
    //const Valid = await BCrypt.compare(SubmitedPassword, encriptedPassword);
    const Valid = SubmitedPassword === encriptedPassword;
    return Valid;
};
const CreateToken = async (payload) => {
    let token = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: tokenMaxAge,
    });
    return token;
};
const AUTH = async (req, res, next) => {
    try {
        const token = req.cookies.AuthToken;
        const verifyed = await jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        if (token && verifyed) {
            next();
        }
        else {
            return res.status(401).json({ message: "You are not logged in" });
        }
        //will throw error if it fails
    }
    catch (error) {
        return res.status(400).json({ message: "Invalid token" });
    }
};
const ExtractInfoFromToken = async (token) => {
    const tokenData = await jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    return tokenData;
};
const addCredentials = async (res, token) => {
    res
        .cookie("AuthToken", token, {
        maxAge: tokenMaxAge * 1000,
        httpOnly: true,
    })
        .cookie("LogToken", true, { maxAge: tokenMaxAge * 1000 });
    return;
};
//200
const removeCredentials = async (res) => {
    res.cookie("AuthToken", "", { maxAge: 1, httpOnly: true }).cookie("LogToken", "", { maxAge: 1 });
};
exports.default = {
    removeCredentials,
    addCredentials,
    ExtractInfoFromToken,
    AUTH,
    CreateToken,
    EncriptPasword,
    validatePasswaord,
};
//# sourceMappingURL=security.js.map