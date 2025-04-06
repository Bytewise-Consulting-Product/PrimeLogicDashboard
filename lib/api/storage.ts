// storage.ts - Store user details in cookies instead of localStorage
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const SECRET_KEY = "TEST"; // 🔐 Keep this secret and secure

// Encrypt data before storing in cookies
export const encryptData = (data: object): string => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt data when retrieving from cookies
export const decryptData = (encryptedData: string): object | null => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
        console.error("Decryption failed:", error);
        return null;
    }
};

// Store user details securely in cookies
export const setUserDetails = (user: object) => {
    const encryptedUser = encryptData(user);
    Cookies.set("userDetails", encryptedUser, { expires: 7, secure: true, sameSite: "Strict" });
};

// Retrieve user details from cookies
export const getUserDetails = (): any | null => {
    const encryptedData = Cookies.get("userDetails");
    return encryptedData ? decryptData(encryptedData) : null;
};

// Remove user details from cookies (logout)
export const removeUserDetails = () => {
    Cookies.remove("userDetails");
};
