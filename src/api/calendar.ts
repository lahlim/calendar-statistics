/* eslint-disable unicorn/prefer-array-some */
import process from 'node:process';
import chalk from 'chalk';
import {DateTime} from 'luxon';
import {google} from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

// Provide the required configuration
const credentials = JSON.parse(process.env.CREDENTIALS!) as {client_email: string; private_key: string};
const calendarId = process.env.CALENDAR_ID;

// Google calendar API settings
const scopes = 'https://www.googleapis.com/auth/calendar.readonly';
export const calendar = google.calendar({version: 'v3'});

export const auth = new google.auth.JWT(
	credentials.client_email,
	'null',
	credentials.private_key,
	scopes,
);

// Get all the events between two dates
export const searchEvents = async (query: string) => {
	try {
		const response = await calendar.events.list({
			auth,
			calendarId,
			q: query,
		});
		const items = response.data.items;
		return {
			range: {},
			items,
		};
	} catch (error: any) {
		console.error(`Error at getEvents --> ${error}`);
		return 0;
	}
};

// Get all the events between two dates
export const getEvents = async (date?: Date, range?: 'day' | 'week') => {
	date ||= new Date();
	range ||= 'day';
	try {
		const response = await calendar.events.list({
			auth,
			calendarId,
			timeMin: DateTime.fromISO(date.toISOString()).startOf(range).toISO(),
			timeMax: DateTime.fromISO(date.toISOString()).endOf(range).toISO(),
		});
		const allItems = response?.data?.items;
		if (!allItems) {
			console.log(chalk.red('No events found'));
			throw new Error('No events found');
		}

		if (allItems.find((x: any) => x.recurrence !== undefined)) {
			console.error(chalk.red('Recurring event found. App does not support recurrence so check for duplicates!'));
		}

		const items = allItems.filter((item: any) => !item.recurrence);
		return {
			range: {
				start: DateTime.fromISO(date.toISOString()).startOf(range),
				end: DateTime.fromISO(date.toISOString()).endOf(range),
			},
			items,
		};
	} catch (error: any) {
		console.error(`Error at getEvents --> ${error}`);
		return 0;
	}
};

const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const yesterday = new Date();
yesterday.setDate(today.getDate() - 5);
