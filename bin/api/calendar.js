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
exports.getEvents = exports.searchEvents = exports.auth = exports.calendar = void 0;
const { google } = require('googleapis');
require('dotenv').config();
// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;
// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
exports.calendar = google.calendar({ version: 'v3' });
exports.auth = new google.auth.JWT(CREDENTIALS.client_email, null, CREDENTIALS.private_key, SCOPES);
// Get all the events between two dates
const searchEvents = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield exports.calendar.events.list({
            auth: exports.auth,
            calendarId: calendarId,
            q: query,
        });
        let items = response['data']['items'];
        return items;
    }
    catch (error) {
        console.log(`Error at getEvents --> ${error}`);
        return 0;
    }
});
exports.searchEvents = searchEvents;
// Get all the events between two dates
const getEvents = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield exports.calendar.events.list({
            auth: exports.auth,
            calendarId: calendarId,
            q: query,
        });
        let items = response['data']['items'];
        return items;
    }
    catch (error) {
        console.log(`Error at getEvents --> ${error}`);
        return 0;
    }
});
exports.getEvents = getEvents;
const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const yesterday = new Date();
yesterday.setDate(today.getDate() - 5);
let start = today.toISOString();
let end = yesterday.toISOString();
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
