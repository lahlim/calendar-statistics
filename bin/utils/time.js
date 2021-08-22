"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventDuration = exports.datesAreOnSameDay = exports.time_convert = void 0;
const time_convert = (min) => {
    var hours = Math.floor(min / 60);
    var minutes = min % 60;
    return { hours, minutes };
};
exports.time_convert = time_convert;
const datesAreOnSameDay = (first, second) => first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();
exports.datesAreOnSameDay = datesAreOnSameDay;
// Gets start and end time of event and returns duration in minutes
const getEventDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = Math.abs(startDate.valueOf() - endDate.valueOf());
    const minutes = Math.floor((diff / 1000) / 60);
    return minutes;
};
exports.getEventDuration = getEventDuration;
// console.log(getEventDuration("2021-08-19T05:30:00.000Z { tz: 'Etc/UTC' }", "2021-08-19T06:00:00.000Z { tz: 'Etc/UTC' }"));
