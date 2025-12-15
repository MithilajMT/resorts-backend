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
const bookingServices_1 = __importDefault(require("./../services/bookingServices"));
const customError_1 = __importDefault(require("../errors/customError"));
class BookingController {
    createBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const bookingData = req.body;
                const payment = yield bookingServices_1.default.createBooking(bookingData, (_a = req.user) === null || _a === void 0 ? void 0 : _a.walletBalance);
                res.status(201).json(payment);
            }
            catch (err) {
                if (err instanceof customError_1.default) {
                    res.status(err.statusCode).json({ message: err.message });
                }
                else {
                    res.status(500).json({ message: 'Error creating booking', err });
                }
            }
        });
    }
    setPaymentStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { bookingId, status } = req.body;
                yield bookingServices_1.default.setPaymentStatus(bookingId, status);
                res.status(201).json({ success: true });
            }
            catch (error) {
                res.status(500).json({ message: 'Error set payment status', error });
            }
        });
    }
    getBookingById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const booking = yield bookingServices_1.default.getBookingById(id);
                if (booking) {
                    res.status(200).json(booking);
                }
                else {
                    res.status(404).json({ message: 'Booking not found' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error retrieving booking', error });
            }
        });
    }
    getBookingsByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const bookings = yield bookingServices_1.default.getBookingsByUserId(userId);
                res.status(200).json({ bookings });
            }
            catch (error) {
                res.status(500).json({ message: 'Error retrieving bookings', error });
            }
        });
    }
    getBookingsByResortId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { resortId } = req.params;
                const bookings = yield bookingServices_1.default.getBookingsByResortId(resortId);
                res.status(200).json({ bookings });
            }
            catch (error) {
                res.status(500).json({ message: 'Error retrieving bookings', error });
            }
        });
    }
    getAllBookings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield bookingServices_1.default.getAllBookings();
                res.status(200).json(bookings);
            }
            catch (error) {
                res.status(500).json({ message: 'Error retrieving bookings', error });
            }
        });
    }
    updateBookingStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const body = req.body;
                const updatedBooking = yield bookingServices_1.default.updateBookingStatus(id, body.status);
                res.status(200).json({ booking: updatedBooking });
            }
            catch (error) {
                res.status(500).json({ message: 'Error updating booking', error });
            }
        });
    }
}
exports.default = new BookingController();
