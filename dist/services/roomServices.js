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
const roomRepository_1 = __importDefault(require("../repositories/roomRepository"));
exports.default = new class ResortService {
    createRoom(roomData) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield roomRepository_1.default.findByname(roomData.name, roomData.resortId);
            if (exist) {
                throw new customError_1.default('Room is already exist', 409);
            }
            roomData.offerPrice = roomData.normalPrice - Math.floor((roomData.normalPrice * roomData.offerPercentage) / 100);
            return yield roomRepository_1.default.createRoom(roomData);
        });
    }
    editRoom(id, roomData) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield roomRepository_1.default.findByname(roomData.name, roomData.resortId);
            if (exist && exist.name != roomData.name) {
                throw new customError_1.default('Room is already exist', 409);
            }
            if ((exist === null || exist === void 0 ? void 0 : exist.offerPercentage) != roomData.offerPercentage || (exist === null || exist === void 0 ? void 0 : exist.normalPrice) != roomData.normalPrice) {
                roomData.offerPrice = roomData.normalPrice - Math.floor((roomData.normalPrice * roomData.offerPercentage) / 100);
            }
            return yield roomRepository_1.default.editRoom(id, roomData);
        });
    }
    deleteRoom(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomRepository_1.default.deleteRoom(roomId);
        });
    }
    getRoomsByResortId(resortId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomRepository_1.default.findRoomsByResortId(resortId);
        });
    }
    getRoomsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomRepository_1.default.findRoomById(id);
        });
    }
};
