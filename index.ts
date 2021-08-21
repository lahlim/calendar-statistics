import { getEventDuration } from './utils';
require('dotenv').config();
const ical = require('node-ical');


const getData = async () => {
    const data = await ical.async.fromURL(process.env.CAL_ADDRESS);
    console.log(data);
};
getData();

console.log(getEventDuration("2021-08-19T05:30:00.000Z { tz: 'Etc/UTC' }", "2021-08-19T06:00:00.000Z { tz: 'Etc/UTC' }"));
