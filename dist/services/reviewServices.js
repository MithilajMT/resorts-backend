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
const reviewRepository_1 = __importDefault(require("../repositories/reviewRepository"));
class reviewServices {
    createReview(reviewData) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield reviewRepository_1.default.findByBookingId(String(reviewData.bookingId));
            if (exist) {
                throw new customError_1.default('You already reviewed', 409);
            }
            return yield reviewRepository_1.default.create(reviewData);
        });
    }
    findByBookingId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield reviewRepository_1.default.findByBookingId(id);
        });
    }
    findByResortId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield reviewRepository_1.default.findByResortId(id);
        });
    }
}
exports.default = new reviewServices;
