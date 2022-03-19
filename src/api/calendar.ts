const { google } = require('googleapis');
require('dotenv').config();
import { DateTime } from "luxon";

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
        return {
            range: {},
            items
        };
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
        // filter recurring events to prevent duplicates
        // this might cause issues on first day of recurring events
        // TODO editing recurring events is not supported yet
        console.log(response['data']['items']);
        let items = response['data']['items'].filter((item: any) => !item.recurrence);
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
