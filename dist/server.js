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
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv/config");
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const resortAdminRoute_1 = __importDefault(require("./routes/resortAdminRoute"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const userRepository_1 = __importDefault(require("./repositories/userRepository"));
const jwtHelper_1 = require("./utils/jwtHelper");
const socket_1 = require("./socket/socket");
(0, db_1.default)();
const port = process.env.PORT || 5000;
socket_1.app.use((0, cors_1.default)({
    origin: `${process.env.FRONTEND_URL}`,
    methods: "GET, POST, PUT, DELETE, PATCH",
    credentials: true
}));
socket_1.app.use(express_1.default.json());
socket_1.app.use(express_1.default.urlencoded({ extended: true }));
socket_1.app.use((0, cookie_parser_1.default)());
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, function (accessToken, refreshToken, profile, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield userRepository_1.default.findByEmail(profile.emails[0].value);
            if (!user) {
                user = yield userRepository_1.default.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    avatar: profile.photos[0].value,
                    role: 'user',
                });
            }
            const accessToken = (0, jwtHelper_1.generateAccessToken)({ id: user._id.toString(), role: user.role });
            const refreshToken = (0, jwtHelper_1.generateRefreshToken)(user._id.toString());
            cb(null, { accessToken, refreshToken });
        }
        catch (error) {
            cb(error, false);
        }
    });
}));
socket_1.app.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
socket_1.app.get('/auth/google/callback', passport_1.default.authenticate('google', { session: false, failureRedirect: '/signin' }), (req, res) => {
    res.cookie('userAccessT', req.user.accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000, sameSite: 'none', secure: process.env.NODE_ENV !== 'development' });
    res.cookie('userRefreshT', req.user.refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: process.env.NODE_ENV !== 'development' });
    res.redirect(`${process.env.FRONTEND_URL}`);
});
socket_1.app.use('/api/user', userRoute_1.default);
socket_1.app.use('/api/resort', resortAdminRoute_1.default);
socket_1.app.use('/api/admin', adminRoutes_1.default);
socket_1.server.listen(port, () => {
    console.log(`Server started at : ${port}`);
});
