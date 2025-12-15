"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = verifyRefreshToken;
exports.verifyAccessToken = verifyAccessToken;
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyRefreshToken(token) {
    return jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET);
}
function verifyAccessToken(token) {
    return jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
}
function generateAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}
function generateRefreshToken(id) {
    return jsonwebtoken_1.default.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}
