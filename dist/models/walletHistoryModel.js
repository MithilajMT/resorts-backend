"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const walletSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['Deposit', 'Purchase', 'Refund'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const WalletHistory = (0, mongoose_1.model)('WalletHistory', walletSchema);
exports.default = WalletHistory;
