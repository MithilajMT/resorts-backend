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
const adminServices_1 = __importDefault(require("../services/adminServices"));
class AdminController {
    signout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.cookie('adminAccessT', '', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'none',
                    expires: new Date(0),
                });
                res.cookie('adminRefreshT', '', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'none',
                    expires: new Date(0),
                });
                res.status(200).json({ message: "You are signed out", success: true });
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
    addCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category } = req.body;
                const categoryDetails = yield adminServices_1.default.addCategory(category);
                res.status(200).json({ category: categoryDetails, success: true });
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
    listCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield adminServices_1.default.listCategories();
                res.status(200).json(categories);
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
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield adminServices_1.default.deleteCategory(id);
                if (result.acknowledged) {
                    res.status(200).json({ success: true });
                }
                else {
                    res.status(400).json({ success: false });
                }
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
    editCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { category } = req.body;
                const categoryData = yield adminServices_1.default.editCategory(id, category);
                if (categoryData) {
                    res.status(200).json({ success: true, category: categoryData });
                }
                else {
                    res.status(400).json({ success: false });
                }
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
    //---------------------- facility Management -----------------------------------//
    addFacility(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { facilityName } = req.body;
                const facilityDetails = yield adminServices_1.default.addFacility(facilityName);
                res.status(200).json({ facility: facilityDetails, success: true });
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
    listFacilities(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const facilities = yield adminServices_1.default.listFacilities();
                res.status(200).json(facilities);
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
    deleteFacility(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield adminServices_1.default.deleteFacility(id);
                if (result.acknowledged) {
                    res.status(200).json({ success: true });
                }
                else {
                    res.status(400).json({ success: false });
                }
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
    editFacility(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { facilityName } = req.body;
                const facility = yield adminServices_1.default.editFacility(id, facilityName);
                if (facility) {
                    res.status(200).json({ success: true, facility });
                }
                else {
                    res.status(400).json({ success: false });
                }
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
    //---------------------- Resort Management -----------------------------------//
    listResorts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resorts = yield adminServices_1.default.listResorts();
                res.status(200).json(resorts);
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
    acceptResort(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const resort = yield adminServices_1.default.acceptResort(id);
                res.status(200).json({ success: true, resort });
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
    rejectResort(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { reason } = req.body;
                const resort = yield adminServices_1.default.rejectResort(id, reason);
                res.status(200).json({ success: true, resort });
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
    manageResortBlock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { status } = req.body;
                const resort = yield adminServices_1.default.manageResortBlock(id, status);
                res.status(200).json({ success: true, resort });
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to get Resort', error });
            }
        });
    }
    //---------------------- User Management -----------------------------------//
    manageUserBlock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { status } = req.body;
                yield adminServices_1.default.manageUserBlock(id, status);
                res.status(200).json({ success: true });
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to get user', error });
            }
        });
    }
    listUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield adminServices_1.default.listUsers();
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to get users', error });
            }
        });
    }
    getChartDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chartDetails = yield adminServices_1.default.findTrendResorts();
                res.status(200).json(chartDetails);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to get details', error });
            }
        });
    }
    getTailsDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tailsDetails = yield adminServices_1.default.getTailsDetails();
                res.status(200).json(tailsDetails);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to get details', error });
            }
        });
    }
}
exports.default = new AdminController;
