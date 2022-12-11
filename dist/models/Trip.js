"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Trip {
    constructor(dto) {
        this.Position = { tripId: 0, lat: "", lon: "" };
        this.getTrackInfo = () => {
            let returnable = {
                id: this.TripId,
                route: this.RouteId,
                position: this.Position,
                to: this.To,
                from: this.From,
            };
            return returnable;
        };
        this.updatePosition = async (position) => {
            this.Position = position;
        };
        this.TripId = dto.tripId;
        this.RouteId = dto.routeId;
        this.From = dto.from;
        this.To = dto.to;
    }
    get Id() {
        return this.TripId;
    }
    get position() {
        return this.Position;
    }
}
exports.default = Trip;
//# sourceMappingURL=Trip.js.map