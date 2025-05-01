"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePass = exports.encryptPass = void 0;
const bcrypt_1 = require("bcrypt");
const SaltRounds = 5;
const encryptPass = (pass) => (0, bcrypt_1.hash)(pass, SaltRounds);
exports.encryptPass = encryptPass;
const comparePass = (hashedPass, textPass) => (0, bcrypt_1.compare)(textPass, hashedPass);
exports.comparePass = comparePass;
