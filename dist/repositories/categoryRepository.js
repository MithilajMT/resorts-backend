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
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
class CategoryRepository {
    create(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = new categoryModel_1.default({ name });
            return yield category.save();
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield categoryModel_1.default.find({ isDelete: false });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield categoryModel_1.default.findById(id);
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield categoryModel_1.default.findOne({ name: { $regex: '^' + name + '$', $options: 'i' }, isDelete: false });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield categoryModel_1.default.updateOne({ _id: id }, { $set: { isDelete: true } });
        });
    }
    edit(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield categoryModel_1.default.findByIdAndUpdate(id, { $set: { name } }, { new: true });
        });
    }
}
exports.default = new CategoryRepository;
