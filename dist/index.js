"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app/app"));
const port = process.env.PORT;
port ? app_1.default.listen(port, () => { console.log(`Server Runs on ${port}`); }) : console.log('Can\'t find any entry point');
