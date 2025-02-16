import crypto from 'crypto'

const generateOTP = (length = 6) => {
    return crypto.randomInt(100000, 999999).toString();  // Generates a 6-digit OTP
};

export {generateOTP}