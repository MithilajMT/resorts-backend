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
const bannerServices_1 = __importDefault(require("../services/bannerServices"));
class BannerController {
    createBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const banner = yield bannerServices_1.default.createBanner(req.body);
                return res.status(201).json(banner);
            }
            catch (error) {
                return res.status(500).json({ message: 'Error creating banner', error });
            }
        });
    }
    getAllBanners(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const banners = yield bannerServices_1.default.getAllBanners();
                return res.status(200).json(banners);
            }
            catch (error) {
                return res.status(500).json({ message: 'Error in banners', error });
            }
        });
    }
    getBannerById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const banner = yield bannerServices_1.default.getBannerById(id);
                if (banner) {
                    return res.status(200).json(banner);
                }
                else {
                    return res.status(404).json({ message: 'Banner not found' });
                }
            }
            catch (error) {
                return res.status(500).json({ message: 'Error retrieving banner', error });
            }
        });
    }
    editBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const banner = yield bannerServices_1.default.editBanner(id, req.body);
                if (banner) {
                    return res.status(200).json(banner);
                }
                else {
                    return res.status(404).json({ message: 'Banner not found' });
                }
            }
            catch (error) {
                return res.status(500).json({ message: 'Error Editing banner', error });
            }
        });
    }
    deleteBannerById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const banner = yield bannerServices_1.default.deleteBannerById(id);
                if (banner) {
                    return res.status(200).json({ message: 'Banner deleted successfully' });
                }
                else {
                    return res.status(404).json({ message: 'Banner not found' });
                }
            }
            catch (error) {
                return res.status(500).json({ message: 'Error deleting banner', error });
            }
        });
    }
}
exports.default = new BannerController();
