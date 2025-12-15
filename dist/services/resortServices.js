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
const customError_1 = __importDefault(require("../errors/customError"));
const resortRepository_1 = __importDefault(require("../repositories/resortRepository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtHelper_1 = require("../utils/jwtHelper");
const roomRepository_1 = __importDefault(require("../repositories/roomRepository"));
const bookingRepository_1 = __importDefault(require("../repositories/bookingRepository"));
exports.default = new class ResortService {
    createResort(resortData) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield resortRepository_1.default.findByEmail(resortData.email);
            if (exist) {
                throw new customError_1.default('Eamil is already exist', 409);
            }
            return yield resortRepository_1.default.createResort(resortData);
        });
    }
    handleResortSignin(email, password, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resort = yield resortRepository_1.default.findByEmail(email);
            if (!resort) {
                throw new customError_1.default('Invalid Email', 401);
            }
            if (yield bcrypt_1.default.compare(password, resort.password)) {
                if (resort.isVerify == false) {
                    throw new customError_1.default('You are not verified, Please wait.', 403);
                }
                else if (resort.isBlock) {
                    throw new customError_1.default('Your account is blocked', 403);
                }
                else {
                    const accessToken = (0, jwtHelper_1.generateAccessToken)({ id: resort._id, role: 'resort' });
                    const refreshToken = (0, jwtHelper_1.generateRefreshToken)(resort._id);
                    res.cookie('resortAccessT', accessToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'none',
                        maxAge: 15 * 60 * 1000,
                    });
                    res.cookie('resortRefreshT', refreshToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'none',
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                    });
                    return resort;
                }
            }
            else {
                throw new customError_1.default('Invalid password', 401);
            }
        });
    }
    editResort(resortData, resortId) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield resortRepository_1.default.findByEmail(resortData.email);
            if (exist && exist.email != resortData.email) {
                throw new customError_1.default('Eamil is already exist', 409);
            }
            return yield resortRepository_1.default.editResort(resortData, resortId);
        });
    }
    searchRooms(queryData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { place, guestCount, checkIn, checkOut, sortBy, categories, facilities, minPrice, maxPrice, page } = queryData;
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            const response = yield resortRepository_1.default.findResortsByQuery({
                place: place, categories: categories === null || categories === void 0 ? void 0 : categories.split(','), facilities: facilities === null || facilities === void 0 ? void 0 : facilities.split(','), sortBy, page: page
            });
            if (!response.resorts || response.resorts.length === 0) {
                return { availableRooms: [], totalResorts: response.totalResorts };
            }
            const availableRooms = [];
            for (const resort of response.resorts) {
                const rooms = yield roomRepository_1.default.findAvailableRooms(resort._id, guestCount, checkInDate, checkOutDate);
                if (rooms && rooms.length > 0) {
                    availableRooms.push({
                        resort,
                        rooms,
                    });
                }
            }
            return { availableRooms, totalResorts: response.totalResorts };
        });
    }
    getTailsDetails(resortId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rooms = yield roomRepository_1.default.findRoomsByResortId(resortId);
            let totalBookings = 0;
            let stays = 0;
            let totalRevenue = 0;
            const bookings = yield bookingRepository_1.default.findAll({ resortId, status: { $ne: 'Cancelled' } });
            bookings.forEach((booking) => {
                if (booking.status == 'Booked') {
                    totalBookings++;
                }
                else {
                    stays++;
                    totalRevenue += booking.totalPrice;
                }
            });
            return { rooms: rooms.length, stays, bookings: totalBookings, revenue: totalRevenue };
        });
    }
};
