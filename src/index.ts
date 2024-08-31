#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable unicorn/no-array-for-each */
import process from 'node:process';
import clear from 'clear';
import chalk from 'chalk';
import figlet from 'figlet';
import {Command} from 'commander';
import {DateTime} from 'luxon';
import dotenv from 'dotenv';
import {getEventDuration, timeConvert, formatDateInput} from './utils/time';
import {getEvents, searchEvents} from './api/calendar';
import {addRows} from './services/excel';
import {type SearResultResponse, type FormattedEvent} from './types/calendar';

dotenv.config();

const program = new Command();

const run = async () => {
	clear();
	console.log(chalk.red(figlet.textSync('Calendar - Stats')));
	program.version('0.0.1')
		.description('Search from calendar events')
		.option('-s, --search <text>', 'Search with text from events')
		.option('-d, --date <date>', 'Search by date. Format dd.mm.yyyy')
		.option('-w, --week <number or date>', 'Get weeks summary. Use 0 for ongoing week. -1 for previous and 1 for next.\nSearching one day (dd.mm.yyyy) from week gives that weeks results')
		.parse(process.argv);
	const options = program.opts();
	if (options.search && typeof options.search === 'string') {
		void searchPath(options.search);
	}

	if (options.date && typeof options.date === 'string') {
		void datePath(options.date);
	}

	if (options.week && (typeof options.week === 'string' || typeof options.week === 'number')) {
		void weekPath(options.week);
	}

	if (process.argv.slice(2).length === 0) {
		void weekPath();
	}
};

const weekPath = async (timing?: string | number) => {
	let searchDate;
	switch (typeof timing) {
		case 'string': {
			searchDate = formatDateInput(timing);
			break;
		}

		case 'number': {
			searchDate = DateTime.now().plus({weeks: timing}).toJSDate();
			break;
		}

		default: {
			searchDate = DateTime.now().toJSDate();
			break;
		}
	}

	const resp = await getEvents(searchDate, 'week');
	const summary = await formatSearchResults(resp);
	addRows(summary?.eventArray ?? []);
	logResults(summary);
};

const datePath = async (date: string) => {
	const dateParts: any[] = date.split('.');
	const dateFormatted = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
	const resp = await getEvents(dateFormatted);
	const summary = await formatSearchResults(resp);
	addRows(summary?.eventArray ?? []);
	logResults(summary);
};

const searchPath = async (query: string) => {
	const data = await searchEvents(query);
	const searchResult = await formatSearchResults(data);
	if (!searchResult) {
		throw new Error('No search results');
	}

	logSearchResults(searchResult);
};

const logSearchResults = (searchResult: SearResultResponse) => {
	const events = searchResult.eventArray.length;
	console.log(chalk.bold(`\nFound ${events} events with between  \nTotal duration ${chalk.yellow(searchResult.total.hours)} h ${chalk.yellow(searchResult.total.minutes)} min\n`));

	searchResult.eventArray.forEach((event: any) => {
		console.log(`Lassi Mustonen${event.summary.split('-')[1]},${event.start},${event.end},${event.date}`);
	});
};

const logResults = (searchResult: SearResultResponse) => {
	const start = searchResult.range.start.toFormat('dd.LL.yyyy');
	const end = searchResult.range.end.toFormat('dd.LL.yyyy');
	const events = searchResult.eventArray.length;
	console.log(chalk.bold(`\nFound ${events} events with between ${start} - ${end} \nTotal duration ${chalk.yellow(searchResult.total.hours)} h ${chalk.yellow(searchResult.total.minutes)} min\n`));

	const sorted = searchResult.eventArray.sort((a: FormattedEvent, b: FormattedEvent) => (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0));

	const reordered = sorted.map(event => {
		const workItem = Number(event.workItem);
		const workItemToDisplay = Number.isNaN(workItem) ? null : workItem;
		return ({
			workItem: workItemToDisplay,
			date: event.date,
			start: event.start,
			end: event.end,
			summary: event.workItem ? event.summary : event.summary,
			comment: event.workItem ? event.comment : event.comment,
		});
	});
	console.table(reordered);

	const noWorkItem = searchResult.eventArray.filter((event: FormattedEvent) => !event.workItem || Number.isNaN(Number(event.workItem)));
	if (noWorkItem.length > 0) {
		console.log(chalk.red(`\nFound ${noWorkItem.length} events without work item number\n`));
	}
};

const formatSearchResults = async (data: any): Promise<SearResultResponse> => {
	if (!data) {
		throw new Error('No data found');
	}

	const eventArray: FormattedEvent[] = [];
	let total = 0;
	data.items.forEach((event: {start: any; end: any; summary: string; description: string}) => {
		total += getEventDuration(event.start.dateTime as string, event.end.dateTime as string);
		const item: FormattedEvent = {
			duration: timeConvert(getEventDuration(event.start.dateTime as string, event.end.dateTime as string)),
			summary: event.summary,
			comment: event.description,
			timestamp: event.start.dateTime,
			date: DateTime.fromISO(event.start.dateTime as string).toFormat('dd.LL.yyyy'),
			start: DateTime.fromISO(event.start.dateTime as string).toFormat('HH:mm'),
			end: DateTime.fromISO(event.end.dateTime as string).toFormat('HH:mm'),
			person: 'Lassi Mustonen',
			workItem: event.summary.split('-')[1],
		};
		eventArray.push(item);
	});
	const resp = {
		eventArray,
		total: timeConvert(total),
		range: data.range,
	};

	return resp;
};

void run();

