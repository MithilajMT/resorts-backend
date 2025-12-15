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
const wishlistRepository_1 = __importDefault(require("../repositories/wishlistRepository"));
const customError_1 = __importDefault(require("../errors/customError"));
class WishlistService {
    addWishlistItem(userId, resortId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield wishlistRepository_1.default.create(userId, resortId);
            if (!result) {
                throw new customError_1.default('Wishlist item already exists', 409);
            }
            return result;
        });
    }
    removeWishlistItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield wishlistRepository_1.default.delete(id);
        });
    }
    getWishlistByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield wishlistRepository_1.default.findByUserId(userId);
        });
    }
}
exports.default = new WishlistService();
