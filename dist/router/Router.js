"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../api/user/UserController"));
const router = (0, express_1.Router)();
//customers  api/v1/auth
//only users
router.get("/", async (req, res) => {
    return res.status(200).json({ success: true });
});
router.get("/auth", UserController_1.default.GET_SIGNOUT);
router.post("/auth", UserController_1.default.POST_SIGNIN);
exports.default = router;
//# sourceMappingURL=Router.js.map