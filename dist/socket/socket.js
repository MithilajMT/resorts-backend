"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.server = (0, http_1.createServer)(exports.app);
exports.io = new socket_io_1.Server(exports.server, {
    cors: {
        origin: [`${process.env.FRONTEND_URL}`],
        methods: ["GET", "POST",],
    }
});
exports.io.on("connection", (socket) => {
    console.log('socket connected : ' + socket.id);
    socket.on('joinRoom', (userId) => {
        socket.join(userId);
    });
    socket.on('sendMessage', (message) => {
        socket.to(String(message.receiverId)).emit('receiveMessage', message);
    });
    socket.on("disconnect", () => {
        console.log('socket disconnected : ' + socket.id);
    });
});
