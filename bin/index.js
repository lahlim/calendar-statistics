#!/usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clear_1 = __importDefault(require("clear"));
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
const inquirer = require('./services/inquirer');
const time_1 = require("./utils/time");
const calendar_1 = require("./api/calendar");
require('dotenv').config();
const program = require('commander');
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    clear_1.default();
    console.log(chalk_1.default.red(figlet_1.default.textSync('Calendar - Stats')));
    program.version('0.0.1')
        .description("Search from calendar events")
        .option('-s, --search', 'Search with text from events')
        .option('-d, --date', 'Search by date')
        .parse(process.argv);
    const options = program.opts();
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
});
const searchPath = () => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = yield inquirer.askGithubCredentials();
    const data = yield calendar_1.searchEvents(query);
    const searchResult = yield formatSearchResults(data);
    logSearchResults(searchResult);
});
const logSearchResults = (searchResult) => {
    console.log(chalk_1.default.bold(`Found ${searchResult.eventArray.length} events with total duration of ${chalk_1.default.yellow(searchResult.total.hours)} h ${chalk_1.default.yellow(searchResult.total.minutes)} min`));
    searchResult.eventArray.forEach((event) => {
        console.log(event.summary, event.duration, event.date);
    });
};
const formatSearchResults = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data)
        return;
    const eventArray = [];
    let total = 0;
    data.forEach((event) => {
        total = total + time_1.getEventDuration(event.start.dateTime, event.end.dateTime);
        const item = {
            duration: time_1.time_convert(time_1.getEventDuration(event.start.dateTime, event.end.dateTime)),
            summary: event.summary,
            date: new Date(event.start.dateTime).toLocaleDateString(),
        };
        eventArray.push(item);
    });
    const resp = {
        eventArray,
        total: time_1.time_convert(total),
    };
    return resp;
});
run();
