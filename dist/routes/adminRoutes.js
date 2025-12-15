"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = __importDefault(require("../controllers/adminController"));
const auth_1 = require("../middleware/auth");
const bannerController_1 = __importDefault(require("../controllers/bannerController"));
const couponController_1 = __importDefault(require("../controllers/couponController"));
const resortAdminController_1 = __importDefault(require("../controllers/resortAdminController"));
const userController_1 = __importDefault(require("../controllers/userController"));
const adminRouter = (0, express_1.Router)();
adminRouter.post('/signin', userController_1.default.signin);
adminRouter.post('/signout', auth_1.adminProtect, adminController_1.default.signout);
//---------------------- Category Management -----------------------------------//
adminRouter.get('/categories', auth_1.adminProtect, adminController_1.default.listCategories);
adminRouter.post('/categories', auth_1.adminProtect, adminController_1.default.addCategory);
adminRouter.put('/categories/:id', auth_1.adminProtect, adminController_1.default.editCategory);
adminRouter.patch('/categories/:id/soft-delete', auth_1.adminProtect, adminController_1.default.deleteCategory);
//---------------------- Facility Management -----------------------------------//
adminRouter.get('/facilities', auth_1.adminProtect, adminController_1.default.listFacilities);
adminRouter.post('/facilities', auth_1.adminProtect, adminController_1.default.addFacility);
adminRouter.put('/facilities/:id', auth_1.adminProtect, adminController_1.default.editFacility);
adminRouter.patch('/facilities/:id/soft-delete', auth_1.adminProtect, adminController_1.default.deleteFacility);
//---------------------- Resort Management -----------------------------------//
adminRouter.get('/resorts', auth_1.adminProtect, adminController_1.default.listResorts);
adminRouter.get('/resortdetails/:id', auth_1.adminProtect, resortAdminController_1.default.getMyResort);
adminRouter.patch('/resorts/:id/accept', auth_1.adminProtect, adminController_1.default.acceptResort);
adminRouter.patch('/resorts/:id/reject', auth_1.adminProtect, adminController_1.default.rejectResort);
adminRouter.patch('/resorts/:id/manage-block', auth_1.adminProtect, adminController_1.default.manageResortBlock);
//---------------------- User Management -----------------------------------//
adminRouter.get('/users', auth_1.adminProtect, adminController_1.default.listUsers);
adminRouter.patch('/users/:id/manage-block', auth_1.adminProtect, adminController_1.default.manageUserBlock);
//---------------------- Banner Management -----------------------------------//
adminRouter.get('/banners', auth_1.adminProtect, bannerController_1.default.getAllBanners);
adminRouter.post('/banners', auth_1.adminProtect, bannerController_1.default.createBanner);
adminRouter.put('/banners/:id', auth_1.adminProtect, bannerController_1.default.editBanner);
adminRouter.delete('/banners/:id', auth_1.adminProtect, bannerController_1.default.deleteBannerById);
//------------------------- Coupon Management --------------------------------//
adminRouter.get('/coupons', auth_1.adminProtect, couponController_1.default.getAllCoupons);
adminRouter.post('/coupons', auth_1.adminProtect, couponController_1.default.createCoupon);
adminRouter.put('/coupons/:id', auth_1.adminProtect, couponController_1.default.updateCoupon);
adminRouter.patch('/coupons/:id', auth_1.adminProtect, couponController_1.default.deleteCoupon);
adminRouter.get('/dashboard', auth_1.adminProtect, adminController_1.default.getChartDetails);
adminRouter.get('/dashboard/tails', auth_1.adminProtect, adminController_1.default.getTailsDetails);
exports.default = adminRouter;
