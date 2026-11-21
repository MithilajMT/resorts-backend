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
const bookingRepository_1 = __importDefault(require("./../repositories/bookingRepository"));
const razorpay_1 = __importDefault(require("razorpay"));
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const walletHistoryRepository_1 = __importDefault(require("../repositories/walletHistoryRepository"));
const customError_1 = __importDefault(require("../errors/customError"));
class BookingService {
    createBooking(bookingData, walletBalance) {
        return __awaiter(this, void 0, void 0, function* () {
            if (bookingData.paymentMethod == 'wallet' && walletBalance < bookingData.totalPrice) {
                throw new customError_1.default('Insufficient wallet balance', 400);
            }
            const booking = yield bookingRepository_1.default.createBooking(bookingData);
            if (bookingData.paymentMethod == 'upi') {
                const razorpay = new razorpay_1.default({
                    key_id: process.env.RAZORPAY_KEY_ID,
                    key_secret: process.env.RAZORPAY_SECRET
                });
                const response = yield razorpay.orders.create({
                    amount: booking.totalPrice * 100,
                    currency: 'INR',
                    receipt: booking._id.toString(),
                    payment_capture: true
                });
                return { orderId: response.id, amount: response.amount, bookingId: booking._id.toString() };
            }
            userRepository_1.default.updateUser(String(booking.userId), { walletBalance: walletBalance - booking.totalPrice });
            return { bookingId: booking._id.toString() };
        });
    }
    setPaymentStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bookingRepository_1.default.setPaymentStatus(id, status);
        });
    }
    getBookingById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bookingRepository_1.default.findBookingById(id);
        });
    }
    getBookingsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bookingRepository_1.default.findByUserId(userId);
        });
    }
    getBookingsByResortId(resortId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bookingRepository_1.default.findByResortId(resortId);
        });
    }
    getAllBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bookingRepository_1.default.findAll();
        });
    }
    updateBookingStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield bookingRepository_1.default.editBookingStatus(id, status);
            if (status == 'Cancelled') {
                yield Promise.all([
                    userRepository_1.default.updateUserWallet(String(booking === null || booking === void 0 ? void 0 : booking.userId), booking === null || booking === void 0 ? void 0 : booking.totalPrice),
                    walletHistoryRepository_1.default.create({
                        userId: booking === null || booking === void 0 ? void 0 : booking.userId,
                        amount: booking === null || booking === void 0 ? void 0 : booking.totalPrice,
                        type: 'Refund',
                    }),
                ]);
            }
            return booking;
        });
    }
}
exports.default = new BookingService();
