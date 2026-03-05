import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY || "default_secret_key";

// Encrypts a string using AES
const encrypt = (text: string): string => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

// Decrypts an AES encrypted string
const decrypt = (ciphertext: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Token decryption failed:", error);
    return "";
  }
};

// Sets an encrypted token in cookies
export const setEncryptedToken = (
  name: string,
  token: string,
  expires: number = 7,
) => {
  const encryptedToken = encrypt(token);
  Cookies.set(name, encryptedToken, {
    expires,
    secure: window.location.protocol === "https:",
    sameSite: "strict",
  });
};

// Gets and decrypts a token from cookies
export const getDecryptedToken = (name: string): string | null => {
  const encryptedToken = Cookies.get(name);
  if (!encryptedToken) return null;
  return decrypt(encryptedToken);
};

// Removes a token from cookies
export const removeToken = (name: string) => {
  Cookies.remove(name);
};
