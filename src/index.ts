#!/usr/bin/env node
import clear from "clear";
import chalk from "chalk";
import figlet from "figlet";
const inquirer = require('./services/inquirer');
import { getEventDuration, timeConvert, fromatDateInput } from "./utils/time";
import { getEvents, searchEvents } from "./api/calendar";
require('dotenv').config();
import { Command } from 'commander';
const program = new Command();
import { DateTime } from "luxon";

const run = async () => {
    clear();
    console.log(chalk.red(figlet.textSync('Calendar - Stats')));
    program.version('0.0.1')
        .description("Search from calendar events")
        .option('-s, --search <text>', 'Search with text from events')
        .option('-d, --date <date>', 'Search by date. Format dd.mm.yyyy')
        .option('-w, --week <number or date>', 'Get weeks summary. Use 0 for ongoing week. -1 for previous and 1 for next.\nSearching one day (dd.mm.yyyy) from week gives that weeks results')
        .parse(process.argv);
    const options = program.opts();
    console.log(options);
    if (options.search) {
        searchPath(options.search);
    }
    if (options.date) {
        datePath(options.date);
    }
    if (options.week) {
        weekPath(options.week);
    }
    if (!process.argv.slice(2).length) {
        weekPath();
    }
};


const weekPath = async (timing?: any) => {
    let searchDate = undefined;

    if (isNaN(timing)) searchDate = fromatDateInput(timing);
    if (!isNaN(timing)) searchDate = DateTime.now().plus({ weeks: timing }).toJSDate();

    console.log(searchDate);

    const resp = await getEvents(searchDate, "week");
    const summary = await formatSearchResults(resp);
    logResults(summary);
};


const datePath = async (date: string) => {
    var dateParts: any[] = date.split(".");
    const dateFormatted = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    const resp = await getEvents(dateFormatted);
    const summary = await formatSearchResults(resp);
    logResults(summary);
};


const searchPath = async (query: string) => {
    const data = await searchEvents(query);
    const searchResult = await formatSearchResults(data);
    logSearchResults(searchResult);
};

const logSearchResults = (searchResult: any) => {
    const events = searchResult.eventArray.length;
    console.log(chalk.bold(`\nFound ${events} events with between  \nTotal duration ${chalk.yellow(searchResult.total.hours)} h ${chalk.yellow(searchResult.total.minutes)} min\n`));


    searchResult.eventArray.forEach((event: any) => {
        console.log("Lassi Mustonen", event.summary, event.start, event.end, event.date);
    });
};

const logResults = (searchResult: any) => {
    const start = searchResult.range.start.toFormat('dd.LL.yyyy');
    const end = searchResult.range.end.toFormat('dd.LL.yyyy');
    const events = searchResult.eventArray.length;
    console.log(chalk.bold(`\nFound ${events} events with between ${start} - ${end} \nTotal duration ${chalk.yellow(searchResult.total.hours)} h ${chalk.yellow(searchResult.total.minutes)} min\n`));


    searchResult.eventArray.forEach((event: {
        summary: string; duration: {
            hours: number, minutes: number;
        }; date: Date;
    }) => {
        console.log(event.summary, event.duration, event.date);
    });
};

const formatSearchResults = async (data: any) => {
    if (!data) return;
    const eventArray: any = [];
    let total = 0;
    data.items.forEach((event: { start: any; end: any, summary: string; }) => {
        total = total + getEventDuration(event.start.dateTime, event.end.dateTime);
        const item = {
            duration: timeConvert(getEventDuration(event.start.dateTime, event.end.dateTime)),
            summary: event.summary,
            date: DateTime.fromISO(event.start.dateTime).toFormat('dd.LL.yyyy'),
            start: DateTime.fromISO(event.start.dateTime).toFormat("HH:mm"),
            end: DateTime.fromISO(event.end.dateTime).toFormat("HH:mm"),
        };
        eventArray.push(item);
    });
    const resp = {
        eventArray,
        total: timeConvert(total),
        range: data.range
    };

    return resp;
};

run();





