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
exports.loginUser = void 0;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const x = req.headers.cookie;
    res.json({
        message: "...",
        data: { x }
    });
    // const { email, password } = req.body
    // const data: Record<string, any> = await db.select().from(UserTable).where(eq(UserTable.email, email)).catch(() => ServerError(res, "Error while fetch user from database"))
    // if (data.length > 0) {
    //     if (await comparePass(data[0].password, password)) {
    //         res
    //             .status(200)
    //             .cookie('auth', JwtGenerate({ refreshToken: data[0].refreshToken }), {
    //                 httpOnly: true,
    //                 maxAge: 15 * 60 * 1000
    //             })
    //             .json({
    //                 message: "User Logged In"
    //             })
    //     }
    //     else ServerError(res, "Password Incorrect", 401)
    // }
    // else ServerError(res, "User not Found", 404)
});
exports.loginUser = loginUser;
