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
const bannerModel_1 = __importDefault(require("../models/bannerModel"));
class BannerRepository {
    createBanner(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const banner = new bannerModel_1.default(data);
            return banner.save();
        });
    }
    getAllBanners() {
        return __awaiter(this, void 0, void 0, function* () {
            return bannerModel_1.default.find();
        });
    }
    getBannerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return bannerModel_1.default.findById(id);
        });
    }
    editBanner(id, BannerData) {
        return __awaiter(this, void 0, void 0, function* () {
            return bannerModel_1.default.findByIdAndUpdate(id, {
                title: BannerData.title,
                description: BannerData.description,
                imageUrl: BannerData.imageUrl
            }, { new: true });
        });
    }
    deleteBannerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return bannerModel_1.default.findByIdAndDelete(id);
        });
    }
}
exports.default = new BannerRepository();
