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
exports.resortProtect = exports.userUnProtect = exports.userProtect = exports.adminProtect = void 0;
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const resortRepository_1 = __importDefault(require("../repositories/resortRepository"));
const jwtHelper_1 = require("../utils/jwtHelper");
const adminProtect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let accessToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.adminAccessT;
    const refreshToken = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.adminRefreshT;
    if (accessToken) {
        try {
            const decoded = (0, jwtHelper_1.verifyAccessToken)(accessToken);
            const user = yield userRepository_1.default.findById(decoded.id);
            if ((user === null || user === void 0 ? void 0 : user.role) !== 'admin') {
                return res.status(401).json({ message: 'Not authorized, invalid token' });
            }
            req.user = user;
            next();
        }
        catch (error) {
            return res.status(401).json({ message: 'Not authorized, invalid token' });
        }
    }
    else if (refreshToken) {
        try {
            const decodedRefresh = (0, jwtHelper_1.verifyRefreshToken)(refreshToken);
            const user = yield userRepository_1.default.findById(decodedRefresh.id);
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            const newAccessToken = (0, jwtHelper_1.generateAccessToken)({ id: user._id.toString(), role: user.role });
            res.cookie('adminAccessT', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'none',
                maxAge: 15 * 60 * 1000,
            });
            req.user = user;
            next();
        }
        catch (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
    }
    else {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
});
exports.adminProtect = adminProtect;
const userProtect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let accessToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.userAccessT;
    let refreshToken = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.userRefreshT;
    if (accessToken) {
        try {
            const decoded = (0, jwtHelper_1.verifyAccessToken)(accessToken);
            const user = yield userRepository_1.default.findById(decoded.id);
            if ((user === null || user === void 0 ? void 0 : user.role) !== 'user') {
                return res.status(401).json({ message: 'Not authorized, invalid token' });
            }
            else if (user.isBlock) {
                return res.status(401).json({ messsage: 'Your account is blocked', isBlocked: user.isBlock });
            }
            req.user = user;
            next();
        }
        catch (error) {
            res.status(401).json({ message: 'Not authorized, invalid token' });
        }
    }
    else if (refreshToken) {
        try {
            const decodedRefresh = (0, jwtHelper_1.verifyRefreshToken)(refreshToken);
            const user = yield userRepository_1.default.findById(decodedRefresh.id);
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            const newAccessToken = (0, jwtHelper_1.generateAccessToken)({ id: user._id.toString(), role: user.role });
            res.cookie('userAccessT', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'none',
                maxAge: 15 * 60 * 1000,
            });
            req.user = user;
            next();
        }
        catch (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
    }
    else {
        res.status(401);
        return res.json({ message: 'Not authorized, no token' });
    }
});
exports.userProtect = userProtect;
const userUnProtect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let accessToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.userAccessT;
    let refreshToken = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.userRefreshT;
    if (accessToken) {
        try {
            const decoded = (0, jwtHelper_1.verifyAccessToken)(accessToken);
            const user = yield userRepository_1.default.findById(decoded.id);
            if ((user === null || user === void 0 ? void 0 : user.role) !== 'user') {
                return res.status(401).json({ message: 'Not authorized, invalid token' });
            }
            else if (user.isBlock) {
                return res.status(401).json({ messsage: 'Your account is blocked', isBlocked: user.isBlock });
            }
            req.user = user;
            next();
        }
        catch (error) {
            res.status(401);
            return res.json({ message: 'Not authorized, invalid token' });
        }
    }
    else if (refreshToken) {
        try {
            const decodedRefresh = (0, jwtHelper_1.verifyRefreshToken)(refreshToken);
            const user = yield userRepository_1.default.findById(decodedRefresh.id);
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            const newAccessToken = (0, jwtHelper_1.generateAccessToken)({ id: user._id.toString(), role: user.role });
            res.cookie('userAccessT', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'none',
                maxAge: 15 * 60 * 1000,
            });
            req.user = user;
            next();
        }
        catch (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
    }
    else {
        next();
    }
});
exports.userUnProtect = userUnProtect;
const resortProtect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let accessToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.resortAccessT;
    let refreshToken = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.resortRefreshT;
    if (accessToken) {
        try {
            const decoded = (0, jwtHelper_1.verifyAccessToken)(accessToken);
            const resort = yield resortRepository_1.default.findResortById(decoded.id);
            if (!resort) {
                return res.status(401).json({ message: 'Not authorized, invalid token' });
            }
            else if (resort.isBlock) {
                res.cookie('resortAccessT', '', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'none',
                    expires: new Date(0),
                });
                res.cookie('resortAccessT', '', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'none',
                    expires: new Date(0),
                });
                return res.status(401).json({ messsage: 'Your account is blocked', isBlocked: resort.isBlock });
            }
            req.resort = resort;
            next();
        }
        catch (error) {
            res.status(401);
            return res.json({ message: 'Not authorized, invalid token' });
        }
    }
    else if (refreshToken) {
        try {
            const decodedRefresh = (0, jwtHelper_1.verifyRefreshToken)(refreshToken);
            const resort = yield resortRepository_1.default.findResortById(decodedRefresh.id);
            if (!resort) {
                return res.status(401).json({ message: 'User not found' });
            }
            const newAccessToken = (0, jwtHelper_1.generateAccessToken)({ id: resort._id.toString() });
            res.cookie('resortAccessT', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'none',
                maxAge: 15 * 60 * 1000,
            });
            req.resort = resort;
            next();
        }
        catch (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
    }
    else {
        res.status(401);
        return res.json({ message: 'Not authorized, no token' });
    }
});
exports.resortProtect = resortProtect;
