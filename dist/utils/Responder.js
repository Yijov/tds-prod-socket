"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//200 ok
const Ok = async (res) => {
    return res.status(200).send();
};
const Success = async (res, payload) => {
    return res.status(200).json({ success: true, payload });
};
//200 deleted
const Deleted = async (res) => {
    return res.status(200).send();
};
//204 No Content
const NoContent = async (res, message) => {
    return res.status(204).json({ success: false, message: message });
};
//201 Created include a Location header identifying the location of the newly created resource.
const Created = async (res, payload, _id, location) => {
    res.location(location + _id);
    return res.status(201).json({ success: true, payload: payload });
};
// updated
const Updated = async (res, payload) => {
    return res.status(204).json({ success: true, payload });
};
exports.default = { Updated, Created, NoContent, Deleted, Success, Ok };
//# sourceMappingURL=Responder.js.map