"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const facilitySchema = new mongoose_1.Schema({
    facilityName: { type: String, required: true },
    isDelete: { type: Boolean, default: false }
});
const Facility = (0, mongoose_1.model)('Facility', facilitySchema);
exports.default = Facility;
