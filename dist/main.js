"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const events_1 = __importDefault(require("./events"));
const Tracker_1 = __importDefault(require("./models/Tracker"));
const Router_1 = __importDefault(require("./router/Router"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const ErrorHandler_1 = __importDefault(require("./utils/ErrorHandler"));
const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketIO = require("socket.io");
const TrackingCache = new Tracker_1.default();
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
app.use(cors("*"));
app.use((0, helmet_1.default)());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/api/v1", Router_1.default);
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
app.use("*", ErrorHandler_1.default.NotFoundRouteHandler);
app.use(ErrorHandler_1.default.ExeptionHandler);
server.listen(PORT, () => {
    NODE_ENV === "development" ? console.log("Now listening on port " + PORT) : console.log("Now listening");
});
//# sourceMappingURL=main.js.map