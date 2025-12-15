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
const bookingModel_1 = __importDefault(require("./../models/bookingModel"));
exports.default = new class BookingRepository {
    createBooking(BookingData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBooking = new bookingModel_1.default(BookingData);
            return yield newBooking.save();
        });
    }
    findBookingById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bookingModel_1.default.findById(id).populate('userId').populate('resortId').populate('roomId');
        });
    }
    findByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bookingModel_1.default.find({ userId: id }).populate('resortId').populate('roomId');
        });
    }
    findMostBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bookingModel_1.default.aggregate([
                {
                    $group: {
                        _id: "$resortId",
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: {
                        count: -1
                    }
                },
                {
                    $limit: 5
                }
            ]);
        });
    }
    findByResortId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bookingModel_1.default.find({ resortId: id }).populate('userId').populate('roomId').populate('resortId');
        });
    }
    findAll() {
        return __awaiter(this, arguments, void 0, function* (filter = {}) {
            return yield bookingModel_1.default.find(filter);
        });
    }
    editBookingStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bookingModel_1.default.findByIdAndUpdate(id, { $set: { status } }, { new: true }).populate('resortId').populate('roomId');
        });
    }
    setPaymentStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bookingModel_1.default.findByIdAndUpdate(id, { $set: { paymentStatus: status } }, { new: true });
        });
    }
};
