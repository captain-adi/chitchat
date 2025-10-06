import twilio from "twilio";
import ApiError from "../utils/ApiError.js";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);
const sendOtpToPhoneNumber = async (to) => {
  try {
    console.log("sending otp to this number : ", to);
    if (!to) {
      throw new ApiError("Phone number is required", 400);
    }
    const sms = await client.verify.v2
      .services(process.env.TWILIO_SERVICES_SID)
      .verifications.create({
        to: to,
        channel: "sms",
      });
    return sms;
  } catch (error) {
    throw new ApiError("Fail to send OTP", 500);
  }
};
const verifyOTP = async (to, otp) => {
  try {
    console.log("verifying otp for this number : ", to);
    if (!to) {
      throw new ApiError("Phone number is required", 400);
    }
    const sms = await client.verify.v2
      .services(process.env.TWILIO_SERVICES_SID)
      .verificationChecks.create({
        to: to,
        code: otp,
      });
    console.log("this is the sms : ", sms);
    return sms;
  } catch (error) {
    console.log(error);
    throw new ApiError("OTP verification failed", 500);
  }
};

export { sendOtpToPhoneNumber, verifyOTP };
