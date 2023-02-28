import CryptoJS from "crypto-js";

export const sha256Encryption = (password: string) => {
  return CryptoJS.SHA3(password).toString();
};
