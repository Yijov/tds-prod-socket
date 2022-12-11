"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("./events"));
const Tracker_1 = __importDefault(require("./models/Tracker"));
const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketIO = require("socket.io");
const TrackingCache = new Tracker_1.default();
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
app.use(cors("*"));
app.get("/", (req, res) => {
    res.status(200).json({ success: true });
});
io.on(events_1.default.CONNECTION, (socket) => {
    socket.on(events_1.default.PING, (data) => io.to(socket.id).emit(events_1.default.PONG, data));
    socket.on(events_1.default.TRIP_START, (tripDto) => {
        //add  tripp dto in memory
        try {
            TrackingCache.StartTrip(tripDto);
            io.to(socket.id).emit(events_1.default.TRIP_START_SUCCESS);
        }
        catch (error) {
            io.to(socket.id).emit(events_1.default.TRIP_START_FAILED);
        }
    });
    socket.on(events_1.default.TRIP_END, (tripId) => {
        // remove the trip from memory
        try {
            TrackingCache.EndTrip(tripId);
            io.to(socket.id).emit(events_1.default.TRIP_END_SUCCESS);
        }
        catch (error) {
            io.to(socket.id).emit(events_1.default.TRIP_END_FAIL);
        }
    });
    socket.on(events_1.default.UPDATE_POSITION, async (positionDto) => {
        //updaste position of the trip while cleaning cache
        try {
            TrackingCache.updateTripPosition(positionDto);
            let response = await TrackingCache.Track();
            socket.broadcast.emit(events_1.default.UPDATE, response);
        }
        catch (error) {
            io.to(socket.id).emit(events_1.default.UPDATE_POSITION_FAILED);
        }
    });
    socket.on(events_1.default.DISCONNECT, () => {
        console.log("user disconnected");
    });
});
server.listen(process.env.PORT || 3011, () => {
    console.log("Now listening");
});
//# sourceMappingURL=main.js.map