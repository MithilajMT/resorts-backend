"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const roomModel_1 = __importDefault(require("../models/roomModel"));
const bookingModel_1 = __importDefault(require("../models/bookingModel"));
exports.default = new class RoomRepository {
    createRoom(roomData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newRoom = new roomModel_1.default(roomData);
            return yield newRoom.save();
        });
    }
    findRoomsByResortId(resortId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomModel_1.default.find({ resortId, isDeleted: false });
        });
    }
    findRoomById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomModel_1.default.findById(id);
        });
    }
    findRooms(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomModel_1.default.find({ resortId: id, isDeleted: false });
        });
    }
    editRoom(id, roomData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomModel_1.default.findByIdAndUpdate(id, { $set: roomData }, { new: true });
        });
    }
    deleteRoom(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomModel_1.default.updateOne({ _id: id }, { $set: { isDeleted: true } });
        });
    }
    findByname(name, resortId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomModel_1.default.findOne({ name: { $regex: '^' + name + '$', $options: 'i' }, resortId, isDeleted: false });
        });
    }
    findAvailableRooms(resortId, guestCount, checkIn, checkOut) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomBookings = yield bookingModel_1.default.find({
                resortId,
                $or: [
                    { checkInDate: { $lte: checkOut }, checkOutDate: { $gte: checkIn } }
                ],
                paymentStatus: true,
            });
            const bookedRoomIds = roomBookings.map((booking) => booking.roomId);
            return roomModel_1.default.find({
                resortId,
                numberOfGuests: { $gte: guestCount },
                isDeleted: false,
                _id: { $nin: bookedRoomIds },
            });
        });
    }
};
