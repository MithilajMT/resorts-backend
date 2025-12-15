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
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const customError_1 = __importDefault(require("../errors/customError"));
const otpServices_1 = __importDefault(require("./otpServices"));
const resortRepository_1 = __importDefault(require("../repositories/resortRepository"));
const jwtHelper_1 = require("../utils/jwtHelper");
const bookingRepository_1 = __importDefault(require("../repositories/bookingRepository"));
const walletHistoryRepository_1 = __importDefault(require("../repositories/walletHistoryRepository"));
class UserServices {
    handleUserSignup(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const existEmail = yield userRepository_1.default.findByEmail(email);
            if (existEmail) {
                throw new customError_1.default('Email already exists', 400);
            }
            const otp = otpServices_1.default.generateOtp();
            yield otpServices_1.default.createOtp({ email, otp });
            otpServices_1.default.sendOtpVerificationEmail(email, otp);
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userRepository_1.default.updateUser(id, data);
        });
    }
    updatePassword(id, currPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository_1.default.findById(id);
            if (!(yield bcrypt_1.default.compare(currPassword, user === null || user === void 0 ? void 0 : user.password))) {
                throw new customError_1.default('Current password is wrong', 400);
            }
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(newPassword, salt);
            return yield userRepository_1.default.updatePassword(id, hashedPassword);
        });
    }
    verifyOtpAndCreate(otp, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedOtp = yield otpServices_1.default.findOtp(userData.email);
            if (!savedOtp) {
                throw new customError_1.default('OTP code expired', 403);
            }
            if (savedOtp.otp !== otp) {
                throw new customError_1.default('OTP is incorrect', 401);
            }
            return yield userRepository_1.default.create(userData);
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userRepository_1.default.findById(id);
        });
    }
    handleUserSignin(email, password, role, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository_1.default.findByEmail(email);
            if (!user) {
                throw new customError_1.default('Invalid Email', 401);
            }
            if ((user === null || user === void 0 ? void 0 : user.password) && (yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password))) {
                if (user.isBlock) {
                    throw new customError_1.default('Your account is blocked', 403);
                }
                else {
                    const accessToken = (0, jwtHelper_1.generateAccessToken)({ id: user._id, role: user.role });
                    const refreshToken = (0, jwtHelper_1.generateRefreshToken)(user._id);
                    if (role == 'user') {
                        if (user.role != role) {
                            throw new customError_1.default('Invalid Email', 401);
                        }
                        res.cookie('userRefreshT', refreshToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'development',
                            sameSite: 'none',
                            maxAge: 7 * 24 * 60 * 60 * 1000,
                        });
                        res.cookie('userAccessT', accessToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'development',
                            sameSite: 'none',
                            maxAge: 15 * 60 * 1000,
                        });
                    }
                    else if (role == 'admin') {
                        if (user.role != role) {
                            throw new customError_1.default('You are not an admin', 401);
                        }
                        res.cookie('adminRefreshT', refreshToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'development',
                            sameSite: 'none',
                            maxAge: 7 * 24 * 60 * 60 * 1000,
                        });
                        res.cookie('adminAccessT', accessToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'development',
                            sameSite: 'none',
                            maxAge: 15 * 60 * 1000,
                        });
                    }
                    return user;
                }
            }
            else {
                throw new customError_1.default('Invalid password', 401);
            }
        });
    }
    findTrendResorts() {
        return __awaiter(this, void 0, void 0, function* () {
            const mostBookings = yield bookingRepository_1.default.findMostBookings();
            const resorts = [];
            for (let x of mostBookings) {
                let resort = yield resortRepository_1.default.findVerifiedResort(x._id);
                if (resort != null) {
                    resorts.push(resort);
                }
            }
            return resorts;
        });
    }
    resortDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield resortRepository_1.default.findResortById(id);
        });
    }
    walletDetails(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield walletHistoryRepository_1.default.findHistories(userId);
        });
    }
}
exports.default = new UserServices();
