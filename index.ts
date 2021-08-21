import clear from "clear";
import chalk from "chalk";
import figlet from "figlet";
// const inquirer = require('./lib/inquirer');
import getData from "./services/data";
import { initialStats } from "./services/statistics";
import { formatData } from "./utils/utils";
require('dotenv').config();

clear();

console.log(
    chalk.yellow(
        figlet.textSync('Calendar-Stats', { horizontalLayout: 'full' })
    )
);





const run = async () => {
    const calData = await getData();
    const formattedData = formatData(calData);
    initialOutput(initialStats(formattedData));
};

const initialOutput = (data: any) => {

    chalk.blue(console.log(chalk.green("today")));
    dayOutput(data[0]);
    console.log(chalk.green("yesterday"));
    dayOutput(data[1]);


    return;
};

const dayOutput = (data: any) => {
    console.log(chalk.yellow(`  ${data.total.hours}h ${data.total.minutes}min`));
    console.log(chalk.yellow(`  Total events ${data.eventCount}`));
    data.eventList.forEach((item: { summary: any; duration: { hours: any; minutes: any; }; }) => {
        console.log(chalk.grey(`    ${item.summary} ${item.duration.hours}h ${item.duration.minutes}min`));
    });

};

run();





