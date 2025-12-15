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
const conversationRepositroy_1 = __importDefault(require("../repositories/conversationRepositroy"));
const messageRepository_1 = __importDefault(require("../repositories/messageRepository"));
exports.default = new class MessageServices {
    sendMessage(messageData) {
        return __awaiter(this, void 0, void 0, function* () {
            let conversation = yield conversationRepositroy_1.default.getConversationByParticipants(String(messageData.senderId), String(messageData.receiverId));
            if (!conversation) {
                conversation = yield conversationRepositroy_1.default.createConversation([
                    { participantId: messageData.senderId, participantType: messageData.senderType },
                    { participantId: messageData.receiverId, participantType: messageData.receiverType }
                ]);
            }
            const newMessage = yield messageRepository_1.default.createMessage(messageData);
            yield conversationRepositroy_1.default.addMessageToConversation(conversation._id, newMessage._id);
            return newMessage;
        });
    }
    getMessages(senderId, receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            let conversation = yield conversationRepositroy_1.default.getConversationByParticipants(senderId, receiverId);
            return conversation;
        });
    }
    getConversationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let conversation = yield conversationRepositroy_1.default.getConversationById(id);
            return conversation;
        });
    }
    getReceivers(participantId) {
        return __awaiter(this, void 0, void 0, function* () {
            let conversation = yield conversationRepositroy_1.default.getConversationsByParticipantId(participantId);
            return conversation;
        });
    }
};
