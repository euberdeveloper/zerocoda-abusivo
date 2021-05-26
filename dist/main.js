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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var FormData = require("form-data");
var bullmq_1 = require("bullmq");
var euberlog_1 = require("euberlog");
var config_1 = require("./config");
var logger = new euberlog_1.Logger();
function askCodiceFiscale(ulss, codiceFiscale, lastNumTesseraSanitaria) {
    return __awaiter(this, void 0, void 0, function () {
        var formData, regexp, response, data, matches, sede, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger.info('Check codice fiscale', { ulss: ulss, codiceFiscale: codiceFiscale, lastNumTesseraSanitaria: lastNumTesseraSanitaria });
                    formData = new FormData();
                    formData.append('cod_fiscale', codiceFiscale);
                    formData.append('num_tessera', lastNumTesseraSanitaria);
                    regexp = /scegliserv\((?<sede>\d+)\)/;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.post("https://vaccinicovid.regione.veneto.it/" + ulss + "/azione/controllocf", formData, {
                            headers: formData.getHeaders()
                        })];
                case 2:
                    response = _a.sent();
                    data = response.data;
                    matches = data.match(regexp);
                    if (matches && matches.groups) {
                        sede = matches.groups.sede;
                        logger.success('Wow, your codice fiscale is OK!!!', { sede: sede });
                        // DO WHAT YOU WANTTTTTTTTTTTTTTTTTT!!!!!!!!!!!!!!!!!!!!!
                    }
                    else {
                        logger.warning('Your codice fiscale is not accepted');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    logger.error('Error in the request');
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var queue, _worker, _queueScheduler, cron;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queue = new bullmq_1.Queue('jobs', {
                        connection: {
                            host: config_1.default.REDIS_HOST,
                            port: +config_1.default.REDIS_PORT
                        }
                    });
                    _worker = new bullmq_1.Worker('jobs', function (job) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, askCodiceFiscale(config_1.default.ULSS, config_1.default.CODICE_FISCALE, config_1.default.LAST_NUM_TESSERA_SANITARIA)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    _queueScheduler = new bullmq_1.QueueScheduler('jobs');
                    cron = config_1.default.CRON;
                    return [4 /*yield*/, queue.add('codiceFiscale', null, { repeat: { cron: cron } })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main();
