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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TMP = void 0;
const jwt_1 = require("../../lib/jwt");
const TMP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pass = req.query['pass'];
    res.json({
        message: "TMP Message",
        data: {
            z: Date.now(),
            y: Date.now() + 30 * 1000,
            x: (0, jwt_1.JwtGenerate)({
                workspaceId: "2f868511-5242-45a9-b305-d0ca1b28b106",
                expiry: Date.now() + 60 * 60 * 1000
            })
        }
    });
    // const exp = req.query['exp']
    // res.json({
    //     message: "TMP Message",
    //     data: { exp }
    // })
});
exports.TMP = TMP;
