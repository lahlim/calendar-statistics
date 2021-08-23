const { google } = require('googleapis');
require('dotenv').config();
import { DateTime, DurationObject } from "luxon";

// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS!);
const calendarId = process.env.CALENDAR_ID;

// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
export const calendar = google.calendar({ version: 'v3' });

export const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

// Get all the events between two dates
export const searchEvents = async (query: string) => {
    try {
        let response = await calendar.events.list({
            auth,
            calendarId: calendarId,
            q: query,
        });
        let items = response['data']['items'];
        return items;
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`);
        return 0;
    }
};


// Get all the events between two dates
export const getEvents = async (date?: Date, range?: any) => {
    if (!date) date = new Date();
    if (!range) range = "day";
    try {
        let response = await calendar.events.list({
            auth,
            calendarId: calendarId,
            timeMin: DateTime.fromISO(date.toISOString()).startOf(range).toISO(),
            timeMax: DateTime.fromISO(date.toISOString()).endOf(range).toISO(),
        });
        let items = response['data']['items'];
        return {
            range: {
                start: DateTime.fromISO(date.toISOString()).startOf(range),
                end: DateTime.fromISO(date.toISOString()).endOf(range),
            },
            items
        };
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`);
        return 0;
    }
};

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
