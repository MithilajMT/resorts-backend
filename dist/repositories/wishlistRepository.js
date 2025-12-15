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
const wishlistModel_1 = __importDefault(require("../models/wishlistModel"));
class WishlistRepository {
    create(userId, resortId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingItem = yield wishlistModel_1.default.findOne({ userId, resortId });
            if (existingItem) {
                return null;
            }
            const wishlistItem = new wishlistModel_1.default({ userId, resortId });
            return (yield wishlistItem.save()).populate('resortId');
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield wishlistModel_1.default.deleteOne({ _id: id });
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield wishlistModel_1.default.find({ userId }).populate('resortId');
        });
    }
}
exports.default = new WishlistRepository();
