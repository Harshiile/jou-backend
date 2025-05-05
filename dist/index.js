"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("./socket");
const port = process.env.PORT;
port ? socket_1.server.listen(port, () => { console.log(`Server Runs on ${port}`); }) : console.log('Can\'t find any entry point');
