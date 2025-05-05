"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const refreshToken_1 = require("../controllers/func/refreshToken");
const jwt_1 = require("../lib/jwt");
const authorize = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            // Valid Token
            (0, jwt_1.JwtValidate)(req.headers['authorization'].split(' ')[1]);
            next();
        }
        catch (error) {
            // Token is not valid
            res.json({
                message: "Access Token is not valid"
            });
        }
    }
    else {
        // expires
        const userId = req.headers['id'];
        if (userId && typeof (userId) === 'string') {
            res.cookie('auth', (0, refreshToken_1.RenewToken)(userId), {
                httpOnly: true
            });
        }
    }
    next();
};
exports.authorize = authorize;
