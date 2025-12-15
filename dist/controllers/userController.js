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
const userServices_1 = __importDefault(require("../services/userServices"));
const customError_1 = __importDefault(require("../errors/customError"));
const resortServices_1 = __importDefault(require("../services/resortServices"));
class UserController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                yield userServices_1.default.handleUserSignup(email);
                res.status(200).json({ message: "OTP sent to your email", success: true });
            }
            catch (err) {
                if (err instanceof customError_1.default) {
                    res.status(err.statusCode).json({ message: err.message });
                }
                else {
                    console.error(err);
                    res.status(500).json({ message: 'Internal Server Error' });
                }
            }
        });
    }
    verifyOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp, name, email, password } = req.body;
                const user = yield userServices_1.default.verifyOtpAndCreate(otp, { name, email, password });
                res.status(201).json({ user, success: true });
            }
            catch (err) {
                if (err instanceof customError_1.default) {
                    res.status(err.statusCode).json({ message: err.message });
                }
                else {
                    console.error(err);
                    res.status(500).json({ message: 'Internal Server Error' });
                }
            }
        });
    }
    resendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                yield userServices_1.default.handleUserSignup(email);
                res.status(200).json({ message: "OTP resent to your email", success: true });
            }
            catch (err) {
                if (err instanceof customError_1.default) {
                    res.status(err.statusCode).json({ message: err.message });
                }
                else {
                    console.error(err);
                    res.status(500).json({ message: 'Internal Server Error' });
                }
            }
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, role } = req.body;
                const user = yield userServices_1.default.handleUserSignin(email, password, role, res);
                res.status(200).json({
                    _id: user === null || user === void 0 ? void 0 : user._id,
                    name: user === null || user === void 0 ? void 0 : user.name,
                    email: user === null || user === void 0 ? void 0 : user.email,
                    phone: user === null || user === void 0 ? void 0 : user.phone,
                    avatar: user === null || user === void 0 ? void 0 : user.avatar,
                });
            }
            catch (err) {
                if (err instanceof customError_1.default) {
                    res.status(err.statusCode).json({ message: err.message });
                }
                else {
                    console.error(err);
                    res.status(500).json({ message: 'Internal Server Error' });
                }
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, phone, avatar } = req.body;
            try {
                const updatedUser = yield userServices_1.default.updateUser(id, { name, phone, avatar });
                res.status(200).json({
                    id: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser._id,
                    name: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.name,
                    email: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.email,
                    phone: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.phone,
                    avatar: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.avatar
                });
            }
            catch (err) {
                if (err instanceof customError_1.default) {
                    res.status(err.statusCode).json({ message: err.message });
                }
                else {
                    console.error(err);
                    res.status(500).json({ message: 'Internal Server Error' });
                }
            }
        });
    }
    updateUserPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { currPassword, newPassword } = req.body;
            try {
                yield userServices_1.default.updatePassword(id, currPassword, newPassword);
                res.status(200).json({ success: true });
            }
            catch (err) {
                if (err instanceof customError_1.default) {
                    res.status(err.statusCode).json({ message: err.message });
                }
                else {
                    console.error(err);
                    res.status(500).json({ message: 'Internal Server Error' });
                }
            }
        });
    }
    verifyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, name, email, avatar, phone, isBlock } = req.user;
                res.status(200).json({
                    _id,
                    name,
                    email,
                    avatar,
                    phone,
                    isBlock,
                });
            }
            catch (err) {
                if (err instanceof customError_1.default) {
                    res.status(err.statusCode).json({ message: err.message });
                }
                else {
                    console.error(err);
                    res.status(500).json({ message: 'Internal Server Error' });
                }
            }
        });
    }
    signout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.cookie('userAccessT', '', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'none',
                    expires: new Date(0),
                });
                res.cookie('userRefreshT', '', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'none',
                    expires: new Date(0),
                });
                res.status(200).json({ message: "You are signed out", success: true });
            }
            catch (err) {
                if (err instanceof customError_1.default) {
                    res.status(err.statusCode).json({ message: err.message });
                }
                else {
                    console.error(err);
                    res.status(500).json({ message: 'Internal Server Error' });
                }
            }
        });
    }
    trendResorts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resorts = yield userServices_1.default.findTrendResorts();
                res.status(200).json(resorts);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to get resorts', error });
            }
        });
    }
    resortDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const resort = yield userServices_1.default.resortDetails(id);
                res.status(200).json(resort);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to get resort Details', error });
            }
        });
    }
    searchRooms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { place, guestCount, checkIn, checkOut, sortBy, maxPrice, minPrice, categories, facilities, page } = req.query;
                if (!place || !guestCount || !checkIn || !checkOut) {
                    throw new customError_1.default("Missing required search parameters", 400);
                }
                const response = yield resortServices_1.default.searchRooms({
                    place,
                    guestCount: guestCount,
                    checkIn,
                    checkOut,
                    sortBy,
                    categories,
                    facilities,
                    minPrice,
                    maxPrice,
                    page
                });
                if (!response.availableRooms.length) {
                    throw new customError_1.default("No available rooms found", 404);
                }
                return res.status(200).json({ availableRooms: response.availableRooms, totalResorts: response.totalResorts });
            }
            catch (err) {
                if (err instanceof customError_1.default) {
                    res.status(err.statusCode).json({ message: err.message });
                }
                else {
                    console.error(err);
                    res.status(500).json({ message: 'Internal Server Error' });
                }
            }
        });
    }
    walletDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const histories = yield userServices_1.default.walletDetails((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
                res.status(200).json({ balance: (_b = req.user) === null || _b === void 0 ? void 0 : _b.walletBalance, histories });
            }
            catch (err) {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
}
exports.default = new UserController;
