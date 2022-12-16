"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Trip_1 = __importDefault(require("./Trip"));
class Tracker {
    constructor() {
        this.trips = [];
        this.StartTrip = async (trip) => {
            let creted = new Trip_1.default(trip);
            this.trips.push(creted);
        };
        this.updateTripPosition = (position) => {
            var _a;
            let indexToDelete = this.trips.findIndex((x) => x.Id == position.tripId);
            (_a = this.trips[indexToDelete]) === null || _a === void 0 ? void 0 : _a.updatePosition(position);
        };
        this.Track = async () => {
            return await this.trips.map((t) => t.getTrackInfo());
        };
    }
    EndTrip(tripId) {
        let indexToDelete = this.trips.findIndex((x) => x.Id == tripId);
        this.trips.splice(indexToDelete, 1);
    }
}
exports.default = Tracker;
//# sourceMappingURL=Tracker.js.map