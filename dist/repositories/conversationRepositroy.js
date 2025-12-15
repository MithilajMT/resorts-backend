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
const conversationModel_1 = __importDefault(require("../models/conversationModel"));
exports.default = new class ConversationRepository {
    createConversation(participants) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversation = new conversationModel_1.default({ participants });
            return conversation.save();
        });
    }
    getConversationByParticipants(id1, id2) {
        return __awaiter(this, void 0, void 0, function* () {
            return conversationModel_1.default.findOne({
                participants: { $all: [
                        { $elemMatch: { participantId: id1 } },
                        { $elemMatch: { participantId: id2 } }
                    ] }
            }).populate('messages');
        });
    }
    getConversationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return conversationModel_1.default.findOne({ _id: id }).populate('messages');
        });
    }
    addMessageToConversation(conversationId, messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return conversationModel_1.default.findByIdAndUpdate(conversationId, { $push: { messages: messageId } }, { new: true });
        });
    }
    getConversationsByParticipantId(participantId) {
        return __awaiter(this, void 0, void 0, function* () {
            return conversationModel_1.default.find({
                participants: { $elemMatch: { participantId } },
            }).populate('participants.participantId');
        });
    }
};
