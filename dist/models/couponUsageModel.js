"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CouponUsageSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    couponId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Coupon', required: true },
    usedAt: { type: Date, default: Date.now },
});
const CouponUsage = (0, mongoose_1.model)('CouponUsage', CouponUsageSchema);
exports.default = CouponUsage;
