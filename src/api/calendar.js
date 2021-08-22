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
exports.__esModule = true;
exports.getEvents = exports.searchEvents = exports.auth = exports.calendar = void 0;
var google = require('googleapis').google;
require('dotenv').config();
// Provide the required configuration
var CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
var calendarId = process.env.CALENDAR_ID;
// Google calendar API settings
var SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
exports.calendar = google.calendar({ version: 'v3' });
exports.auth = new google.auth.JWT(CREDENTIALS.client_email, null, CREDENTIALS.private_key, SCOPES);
// Get all the events between two dates
var searchEvents = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var response, items, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, exports.calendar.events.list({
                        auth: exports.auth,
                        calendarId: calendarId,
                        q: query
                    })];
            case 1:
                response = _a.sent();
                items = response['data']['items'];
                return [2 /*return*/, items];
            case 2:
                error_1 = _a.sent();
                console.log("Error at getEvents --> " + error_1);
                return [2 /*return*/, 0];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.searchEvents = searchEvents;
// Get all the events between two dates
var getEvents = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var response, items, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, exports.calendar.events.list({
                        auth: exports.auth,
                        calendarId: calendarId,
                        q: query
                    })];
            case 1:
                response = _a.sent();
                items = response['data']['items'];
                return [2 /*return*/, items];
            case 2:
                error_2 = _a.sent();
                console.log("Error at getEvents --> " + error_2);
                return [2 /*return*/, 0];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getEvents = getEvents;
var timeElapsed = Date.now();
var today = new Date(timeElapsed);
var yesterday = new Date();
yesterday.setDate(today.getDate() - 5);
var start = today.toISOString();
var end = yesterday.toISOString();
console.log(start);
console.log(end);
// Get date-time string for calender
/*
const dateTimeForCalander = () => {
    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

    let event = new Date(Date.parse(newDateTime));

    let startDate = event;
    // Delay in end time is 1
    let endDate = new Date(
        new Date(startDate).setHours(startDate.getHours() + 1)
    );

    return {
        start: startDate,
        end: endDate,
    };
};
*/
// let dateTime = dateTimeForCalander();
// // Event for Google Calendar
// let event = {
//     'summary': `This is the summary.`,
//     'description': `This is the description.`,
//     'start': {
//         'dateTime': dateTime['start'],
//         'timeZone': 'Asia/Kolkata'
//     },
//     'end': {
//         'dateTime': dateTime['end'],
//         'timeZone': 'Asia/Kolkata'
//     }
// };
// insertEvent(event)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
