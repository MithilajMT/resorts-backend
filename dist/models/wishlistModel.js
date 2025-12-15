"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const wishlistSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    resortId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Resort' },
    createdAt: { type: Date, default: Date.now }
});
const Wishlist = (0, mongoose_1.model)('Wishlist', wishlistSchema);
exports.default = Wishlist;
