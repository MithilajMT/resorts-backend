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
const mongoose_1 = __importDefault(require("mongoose"));
const resortModel_1 = require("../models/resortModel");
exports.default = new class ResortRepository {
    createResort(resortData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newResort = new resortModel_1.Resort(resortData);
            return yield newResort.save();
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield resortModel_1.Resort.findOne({ email });
        });
    }
    findResortById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield resortModel_1.Resort.findById(id).populate('categories').populate('facilities');
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield resortModel_1.Resort.find().populate('categories').populate('facilities');
        });
    }
    findVerifiedResort(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield resortModel_1.Resort.findOne({ _id: id, isVerify: true, isBlock: false });
        });
    }
    findAllVerifiedResorts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield resortModel_1.Resort.find({ isVerify: true });
        });
    }
    accept(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield resortModel_1.Resort.findByIdAndUpdate(id, { $set: { isVerify: true } }, { new: true })
                .populate('categories').populate('facilities');
        });
    }
    reject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield resortModel_1.Resort.findByIdAndUpdate(id, { $set: { isVerify: false, isRejected: true } }, { new: true })
                .populate('categories').populate('facilities');
        });
    }
    manageResortBlock(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield resortModel_1.Resort.findByIdAndUpdate(id, { $set: { isBlock: status } }, { new: true })
                .populate('categories').populate('facilities');
        });
    }
    editResort(resortData, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield resortModel_1.Resort.findByIdAndUpdate(id, { $set: resortData }, { new: true })
                .populate('categories').populate('facilities');
        });
    }
    findResortsByQuery(_a) {
        return __awaiter(this, arguments, void 0, function* ({ place, categories, facilities, sortBy, page }) {
            const validCategories = categories ? categories.filter(id => mongoose_1.default.Types.ObjectId.isValid(id)) : [];
            const validFacilities = facilities ? facilities.filter(id => mongoose_1.default.Types.ObjectId.isValid(id)) : [];
            const query = {
                isBlock: false,
                isVerify: true,
                $or: [
                    { city: { $regex: place, $options: "i" } },
                    { resortName: { $regex: place, $options: "i" } },
                ],
            };
            if (validCategories.length > 0) {
                query.categories = { $all: validCategories };
            }
            if (validFacilities.length > 0) {
                query.facilities = { $all: validFacilities };
            }
            let sort = {};
            if (sortBy) {
                switch (sortBy) {
                    case 'priceLowToHigh':
                        sort = { price: 1 };
                        break;
                    case 'priceHighToLow':
                        sort = { price: -1 };
                        break;
                    case 'name':
                        sort = { resortName: 1 };
                        break;
                    default:
                        sort = {};
                }
            }
            const limit = 3;
            const skip = (page - 1) * limit;
            const totalResorts = yield resortModel_1.Resort.countDocuments(query);
            const resorts = yield resortModel_1.Resort.find(query).sort(sort).skip(skip).limit(limit);
            return { resorts, totalResorts };
        });
    }
};
