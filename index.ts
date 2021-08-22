import clear from "clear";
import chalk from "chalk";
import figlet from "figlet";
const inquirer = require('./lib/inquirer');
import { getEventDuration, time_convert } from "./utils/time";
import { getEvents, searchEvents } from "./api/calendar";
require('dotenv').config();

const run = async () => {
    clear();
    console.log(chalk.red(figlet.textSync('Calendar - Stats')));
    while (true) {
        const { query } = await inquirer.askGithubCredentials();
        const data = await searchEvents(query);
        const searchResult = await formatSearchResults(data);
        logSearchResults(searchResult);
        console.log();
    }
};

const logSearchResults = (searchResult: any) => {
    console.log(chalk.bold(`Found ${searchResult.eventArray.length} events with total duration of ${chalk.yellow(searchResult.total.hours)} h ${chalk.yellow(searchResult.total.minutes)} min`));
    searchResult.eventArray.forEach((event: { summary: string; duration: any; }) => {
        console.log(event.summary, event.duration);
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





