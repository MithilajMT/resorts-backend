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
const otp_generator_1 = __importDefault(require("otp-generator"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const otpRepository_1 = __importDefault(require("../repositories/otpRepository"));
exports.default = new class OtpServices {
    createOtp(otpDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            return otpRepository_1.default.create(otpDetails);
        });
    }
    findOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield otpRepository_1.default.findOtp(email);
        });
    }
    generateOtp() {
        const otp = otp_generator_1.default.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        return otp;
    }
    sendOtpVerificationEmail(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                service: "Gmail",
                secure: true,
                auth: {
                    user: process.env.USER_EMAIL,
                    pass: process.env.USER_EMAIL_PASSWORD
                },
            });
            transporter.sendMail({
                to: email,
                from: process.env.USER_EMAIL,
                subject: "Resorts OTP Verification",
                html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
              <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                  <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Resorts</a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Thank you for choosing Resorts. Use the following OTP to complete your Sign Up procedures.
                 OTP is valid for 60 seconds</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color:
                 #fff;border-radius: 4px;">${otp}</h2>
                <p style="font-size:0.9em;">Regards,<br />Resorts</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                  <p>Your Resorts Inc</p>
                  <p>MARTINS Building</p>
                  <p>Kerala</p>
                  <p>India</p>
                </div>
              </div>
            </div>`
            });
        });
    }
};
