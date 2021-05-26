"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var path = require("path");
dotenv.config({
    path: path.join(process.cwd(), '.env')
});
var CONFIG = {
    ULSS: process.env.ULSS,
    CODICE_FISCALE: process.env.CODICE_FISCALE,
    LAST_NUM_TESSERA_SANITARIA: process.env.LAST_NUM_TESSERA_SANITARIA,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    CRON: process.env.CRON,
};
exports.default = CONFIG;
