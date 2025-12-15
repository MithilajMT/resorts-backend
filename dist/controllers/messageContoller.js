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
const messageServices_1 = __importDefault(require("../services/messageServices"));
class MessageController {
    sendMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messageData = req.body;
                const message = yield messageServices_1.default.sendMessage(messageData);
                res.status(200).json(message);
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
    getMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                let senderId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) ? req.user._id : (_b = req.resort) === null || _b === void 0 ? void 0 : _b._id;
                const conversation = yield messageServices_1.default.getMessages(String(senderId), req.params.id);
                res.status(200).json(conversation);
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
    getConversationById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversation = yield messageServices_1.default.getConversationById(req.params.id);
                res.status(200).json(conversation);
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
    getReceivers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                let senderId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) ? req.user._id : (_b = req.resort) === null || _b === void 0 ? void 0 : _b._id;
                const conversation = yield messageServices_1.default.getReceivers(String(senderId));
                res.status(200).json(conversation);
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
exports.default = new MessageController;
