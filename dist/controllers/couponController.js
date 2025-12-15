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
const couponServices_1 = __importDefault(require("../services/couponServices"));
const customError_1 = __importDefault(require("../errors/customError"));
class CouponController {
    createCoupon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCoupon = yield couponServices_1.default.createCoupon(req.body);
                res.status(201).json({ success: true, data: newCoupon });
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
    getCoupon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coupon = yield couponServices_1.default.getCouponById(req.params.id);
                res.status(200).json({ success: true, data: coupon });
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
    getAllCoupons(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coupons = yield couponServices_1.default.getAllCoupons();
                res.status(200).json({ success: true, data: coupons });
            }
            catch (err) {
                if (err instanceof customError_1.default) {
                    res.status(err.statusCode).json({ message: err.message });
                }
                else {
                    console.log(err.message);
                    res.status(500).json({ message: 'Internal Server Error' });
                }
            }
        });
    }
    updateCoupon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCoupon = yield couponServices_1.default.updateCoupon(req.params.id, req.body);
                res.status(200).json({ success: true, data: updatedCoupon });
            }
            catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
        });
    }
    deleteCoupon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield couponServices_1.default.deleteCoupon(req.params.id);
                res.status(200).json({ success: true, message: 'Coupon deleted successfully' });
            }
            catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
        });
    }
    getAvailableCoupons(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coupons = yield couponServices_1.default.getAvailableCoupons(Number(req.query.price));
                res.status(200).json({ success: true, data: coupons });
            }
            catch (err) {
                if (err instanceof customError_1.default) {
                    res.status(err.statusCode).json({ message: err.message });
                }
                else {
                    res.status(500).json({ message: 'Internal Server Error' });
                }
            }
        });
    }
    applyCoupon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, couponId } = req.body;
                yield couponServices_1.default.applyCoupon(userId, couponId);
                res.status(200).json({ success: true });
            }
            catch (err) {
                if (err instanceof customError_1.default) {
                    res.status(err.statusCode).json({ message: err.message });
                }
                else {
                    res.status(500).json({ message: 'Internal Server Error' });
                }
            }
        });
    }
}
exports.default = new CouponController();
