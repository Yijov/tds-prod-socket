"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserById = exports.FindAllUsers = exports.FindUserByEmail = void 0;
const USERS = [
    { _id: "101", name: "yirbett", lastName: "Joseph", email: "yirbett@gmail.com", password: "admin" },
    { _id: "102", name: "Carloz", lastName: "Mendez", email: "Carlos@gmaol.com", password: "admin" },
];
const FindUserByEmail = async (email) => {
    try {
        const Account = await USERS.find((user) => user.email === email);
        return Account;
    }
    catch (error) {
        throw error;
    }
};
exports.FindUserByEmail = FindUserByEmail;
const FindAllUsers = async () => {
    return USERS;
};
exports.FindAllUsers = FindAllUsers;
const FindUserById = async (_id) => {
    try {
        const Account = await USERS.find((user) => user._id === _id);
        return Account;
    }
    catch (error) {
        throw error;
    }
};
exports.FindUserById = FindUserById;
exports.default = { FindUserByEmail: exports.FindUserByEmail, FindUserById: exports.FindUserById, FindAllUsers: exports.FindAllUsers };
//# sourceMappingURL=UserRepository.js.map