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
const bannerRepository_1 = __importDefault(require("../repositories/bannerRepository"));
class BannerService {
    createBanner(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return bannerRepository_1.default.createBanner(data);
        });
    }
    getAllBanners() {
        return __awaiter(this, void 0, void 0, function* () {
            return bannerRepository_1.default.getAllBanners();
        });
    }
    getBannerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return bannerRepository_1.default.getBannerById(id);
        });
    }
    editBanner(id, BannerData) {
        return __awaiter(this, void 0, void 0, function* () {
            return bannerRepository_1.default.editBanner(id, BannerData);
        });
    }
    deleteBannerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return bannerRepository_1.default.deleteBannerById(id);
        });
    }
}
exports.default = new BannerService();
