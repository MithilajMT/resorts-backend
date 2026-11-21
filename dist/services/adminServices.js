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
const categoryRepository_1 = __importDefault(require("../repositories/categoryRepository"));
const facilityRepository_1 = __importDefault(require("../repositories/facilityRepository"));
const resortRepository_1 = __importDefault(require("../repositories/resortRepository"));
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const bookingRepository_1 = __importDefault(require("../repositories/bookingRepository"));
const otpServices_1 = require("./otpServices");
class AdminServices {
    // Category ---------------------------------------------------------------
    addCategory(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield categoryRepository_1.default.findByName(name);
            if (exist) {
                throw new customError_1.default('It is already exist', 409);
            }
            return yield categoryRepository_1.default.create(name);
        });
    }
    editCategory(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield categoryRepository_1.default.findByName(name);
            if (exist && id != exist._id) {
                throw new customError_1.default('It is already exist', 409);
            }
            return yield categoryRepository_1.default.edit(id, name);
        });
    }
    listCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield categoryRepository_1.default.find();
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield categoryRepository_1.default.delete(id);
        });
    }
    // Facility --------------------------------------------
    addFacility(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield facilityRepository_1.default.findByName(name);
            if (exist) {
                throw new customError_1.default('It is already exist', 409);
            }
            return yield facilityRepository_1.default.create(name);
        });
    }
    listFacilities() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield facilityRepository_1.default.find();
        });
    }
    editFacility(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield facilityRepository_1.default.findByName(name);
            if (exist && id != exist._id) {
                throw new customError_1.default('It is already exist', 409);
            }
            return yield facilityRepository_1.default.edit(id, name);
        });
    }
    deleteFacility(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield facilityRepository_1.default.delete(id);
        });
    }
    //----------------------- Resorts ---------------------------------------//
    listResorts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield resortRepository_1.default.findAll();
        });
    }
    acceptResort(resortId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield resortRepository_1.default.accept(resortId);
        });
    }
    rejectResort(resortId, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            const resort = yield resortRepository_1.default.reject(resortId);
            if (resort) {
                otpServices_1.resend.emails.send({
                    from: "Resorts <resorts@resend.dev>",
                    to: resort === null || resort === void 0 ? void 0 : resort.email,
                    subject: "Rejected your resort profile",
                    text: reason
                });
                return resort;
            }
        });
    }
    manageResortBlock(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield resortRepository_1.default.manageResortBlock(id, status);
        });
    }
    //----------------------- Users ---------------------------------------//
    manageUserBlock(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userRepository_1.default.manageUserBlock(id, status);
        });
    }
    listUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return userRepository_1.default.findAllUsers();
        });
    }
    findTrendResorts() {
        return __awaiter(this, void 0, void 0, function* () {
            const mostBookings = yield bookingRepository_1.default.findMostBookings();
            const chartDetails = [];
            for (let x of mostBookings) {
                let resort = yield resortRepository_1.default.findVerifiedResort(x._id);
                if (resort != null) {
                    chartDetails.push({ resort: resort.resortName, bookings: x.count });
                }
            }
            return chartDetails;
        });
    }
    getTailsDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield userRepository_1.default.findAllUsers();
            const resorts = yield resortRepository_1.default.findAllVerifiedResorts();
            const bookings = yield bookingRepository_1.default.findAll({ status: { $ne: 'Cancelled' } });
            let resortRevenue = 0;
            for (let x of bookings) {
                resortRevenue += x.totalPrice - 200;
            }
            return { users: users.length, resorts: resorts.length, bookings: bookings.length, revenue: bookings.length * 200, resortRevenue };
        });
    }
}
exports.default = new AdminServices();
