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
const wishlistServices_1 = __importDefault(require("../services/wishlistServices"));
const customError_1 = __importDefault(require("../errors/customError"));
class WishlistController {
    createWishlist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, resortId } = req.body;
                const wishlistItem = yield wishlistServices_1.default.addWishlistItem(userId, resortId);
                res.status(201).json(wishlistItem);
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
    deleteWishlist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const result = yield wishlistServices_1.default.removeWishlistItem(id);
                if (result.deletedCount) {
                    res.status(200).json({ message: 'Wishlist item deleted', success: true });
                }
                else {
                    res.status(404).json({ message: 'Wishlist item not found', success: false });
                }
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
    getUserWishlist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const wishlist = yield wishlistServices_1.default.getWishlistByUser(userId);
                res.status(200).json({ wishlist });
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
}
exports.default = new WishlistController();
