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
const couponRepository_1 = __importDefault(require("../repositories/couponRepository"));
const customError_1 = __importDefault(require("../errors/customError"));
const couponUsageRepository_1 = __importDefault(require("../repositories/couponUsageRepository"));
class CouponService {
    createCoupon(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingCoupon = yield couponRepository_1.default.findOne({ code: data.code });
            if (existingCoupon) {
                throw new customError_1.default('Coupon code already exists', 409);
            }
            return yield couponRepository_1.default.create(data);
        });
    }
    getCouponById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const coupon = yield couponRepository_1.default.findById(id);
            if (!coupon) {
                throw new customError_1.default('Coupon not found', 404);
            }
            return coupon;
        });
    }
    getAllCoupons() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield couponRepository_1.default.findAll({ isDeleted: false });
        });
    }
    updateCoupon(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingCoupon = yield couponRepository_1.default.findOne({ code: updateData.code });
            if (existingCoupon && id != existingCoupon._id) {
                throw new customError_1.default('Coupon code already exists', 409);
            }
            return yield couponRepository_1.default.update(id, updateData);
        });
    }
    deleteCoupon(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield couponRepository_1.default.delete(id);
        });
    }
    getAvailableCoupons(price) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield couponRepository_1.default.findAll({ minBooking: { $lte: price } });
        });
    }
    applyCoupon(userId, couponId) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield couponUsageRepository_1.default.findUsageByUserAndCoupon(userId, couponId);
            if (exist) {
                throw new customError_1.default('Coupon is already used', 400);
            }
            return couponUsageRepository_1.default.createCouponUsage(userId, couponId);
        });
    }
}
exports.default = new CouponService();
