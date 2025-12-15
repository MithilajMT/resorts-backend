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
const resortServices_1 = __importDefault(require("../services/resortServices"));
const userServices_1 = __importDefault(require("../services/userServices"));
const roomServices_1 = __importDefault(require("../services/roomServices"));
const bookingModel_1 = __importDefault(require("../models/bookingModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Types;
class ResortAdminController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resortData = req.body;
                const newResort = yield resortServices_1.default.createResort(resortData);
                return res.status(201).json({ success: true, data: newResort });
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
                const resort = yield resortServices_1.default.handleResortSignin(email, password, res);
                res.status(201).json({
                    success: true,
                    resortAdmin: {
                        _id: resort === null || resort === void 0 ? void 0 : resort._id,
                        name: resort === null || resort === void 0 ? void 0 : resort.resortName,
                        email: resort === null || resort === void 0 ? void 0 : resort.email,
                    }
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
                res.cookie('resortAccessT', '', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'none',
                    expires: new Date(0),
                });
                res.cookie('resortRefreshT', '', {
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
    getMyResort(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const resort = yield userServices_1.default.resortDetails(id);
                res.status(200).json(resort);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to get resort', error });
            }
        });
    }
    editResort(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const resortData = req.body;
                const resort = yield resortServices_1.default.editResort(resortData, id);
                return res.status(201).json({ success: true, data: resort });
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
    getRoomsByResortId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { resortId } = req.params;
                const rooms = yield roomServices_1.default.getRoomsByResortId(resortId);
                res.status(200).json(rooms);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to get rooms', error });
            }
        });
    }
    getRoomsById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const rooms = yield roomServices_1.default.getRoomsById(id);
                res.status(200).json(rooms);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to get rooms', error });
            }
        });
    }
    addRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roomData = req.body;
                const rooms = yield roomServices_1.default.createRoom(roomData);
                res.status(200).json(rooms);
            }
            catch (err) {
                if (err instanceof customError_1.default) {
                    res.status(err.statusCode).json({ message: err.message });
                }
                else {
                    console.error(err);
                    res.status(500).json({ message: 'Failed to get rooms', err });
                }
            }
        });
    }
    editRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const roomData = req.body;
                const room = yield roomServices_1.default.editRoom(id, roomData);
                res.status(200).json({ room, success: true });
            }
            catch (err) {
                if (err instanceof customError_1.default) {
                    res.status(err.statusCode).json({ message: err.message });
                }
                else {
                    console.error(err);
                    res.status(500).json({ message: 'Failed to delete room', err });
                }
            }
        });
    }
    deleteRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield roomServices_1.default.deleteRoom(id);
                res.status(200).json({ success: true });
            }
            catch (err) {
                if (err instanceof customError_1.default) {
                    res.status(err.statusCode).json({ message: err.message });
                }
                else {
                    console.error(err);
                    res.status(500).json({ message: 'Failed to delete room', err });
                }
            }
        });
    }
    getChartDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const now = new Date();
                const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
                const bookings = yield bookingModel_1.default.aggregate([
                    {
                        $match: {
                            resortId: new ObjectId(req.params.id),
                            createdAt: { $gte: startDate, $lt: endDate },
                        },
                    },
                    {
                        $group: {
                            _id: "$createdAt",
                            count: { $sum: 1 },
                        },
                    },
                    {
                        $sort: { _id: 1 },
                    },
                ]);
                const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
                const chartData = Array.from({ length: daysInMonth }, (_, i) => ({
                    day: i + 1,
                    count: 0,
                }));
                bookings.forEach((booking) => {
                    const bookingDay = new Date(booking._id).getDate();
                    chartData[bookingDay - 1].count += booking.count;
                });
                res.json(chartData);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Failed to fetch booking trends." });
            }
        });
    }
    getTailsDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tailsDetails = yield resortServices_1.default.getTailsDetails(req.params.id);
                res.status(200).json(tailsDetails);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to get details', error });
            }
        });
    }
}
exports.default = new ResortAdminController;
