import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY || "default_secret_key";

// Obfuscated cookie names
const COOKIE_NAMES: Record<string, string> = {
  accessToken: "aw_at_v1",
  refreshToken: "aw_rt_v1",
};

/**
 * Encrypts a string using AES
 */
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
  const obfuscatedName = COOKIE_NAMES[name] || name;
  const encryptedToken = encrypt(token);
  Cookies.set(obfuscatedName, encryptedToken, {
    expires,
    secure: window.location.protocol === "https:",
    sameSite: "strict",
  });
};

/**
 * Gets and decrypts a token from cookies
 */
export const getDecryptedToken = (name: string): string | null => {
  const obfuscatedName = COOKIE_NAMES[name] || name;
  const encryptedToken = Cookies.get(obfuscatedName);
  if (!encryptedToken) return null;
  return decrypt(encryptedToken);
};

/**
 * Removes a token from cookies
 */
export const removeToken = (name: string) => {
  const obfuscatedName = COOKIE_NAMES[name] || name;
  Cookies.remove(obfuscatedName);
};
