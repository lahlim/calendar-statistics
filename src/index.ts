#!/usr/bin/env node
import clear from "clear";
import chalk from "chalk";
import figlet from "figlet";
const inquirer = require('./services/inquirer');
import { getEventDuration, time_convert } from "./utils/time";
import { getEvents, searchEvents } from "./api/calendar";
require('dotenv').config();
import { Command } from 'commander';
const program = new Command();

const run = async () => {
    clear();
    console.log(chalk.red(figlet.textSync('Calendar - Stats')));
    program.version('0.0.1')
        .description("Search from calendar events")
        .option('-s, --search <item>', 'Search with text from events')
        .option('-d, --date <item>', 'Search by date. Format dd.mm.yyyy')
        .parse(process.argv);
    const options = program.opts();
    console.log(options);
    if (options.search) {
        searchPath(options.search);
    }
    if (options.date) {
        var dateParts = options.date.split(".");
        console.log(new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]));
    }
    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
    /*
    while (true) {
        const { select } = await inquirer.askOptions();
        switch (select) {
            case "search":
                searchPath();
                break;
            case "date":
                console.log("date case");
                break;
            default:
            // code block
        }
    }
    */
};


const searchPath = async (query: string) => {
    const data = await searchEvents(query);
    const searchResult = await formatSearchResults(data);
    logSearchResults(searchResult);
};

const logSearchResults = (searchResult: any) => {
    console.log(chalk.bold(`Found ${searchResult.eventArray.length} events with total duration of ${chalk.yellow(searchResult.total.hours)} h ${chalk.yellow(searchResult.total.minutes)} min`));
    searchResult.eventArray.forEach((event: { summary: any; duration: any; date: Date; }) => {
        console.log(event.summary, event.duration, event.date);
    });
};

const formatSearchResults = async (data: any) => {
    if (!data) return;
    const eventArray: any = [];
    let total = 0;
    data.forEach((event: { start: { dateTime: string; }; end: { dateTime: string; }; summary: string; }) => {
        total = total + getEventDuration(event.start.dateTime, event.end.dateTime);
        const item = {
            duration: time_convert(getEventDuration(event.start.dateTime, event.end.dateTime)),
            summary: event.summary,
            date: new Date(event.start.dateTime).toLocaleDateString(),
        };
        eventArray.push(item);
    });
    const resp = {
        eventArray,
        total: time_convert(total),
    };
    return resp;
};

run();





