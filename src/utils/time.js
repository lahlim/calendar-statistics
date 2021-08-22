"use strict";
exports.__esModule = true;
exports.getEventDuration = exports.datesAreOnSameDay = exports.time_convert = void 0;
var time_convert = function (min) {
    var hours = Math.floor(min / 60);
    var minutes = min % 60;
    return { hours: hours, minutes: minutes };
};
exports.time_convert = time_convert;
var datesAreOnSameDay = function (first, second) {
    return first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate();
};
exports.datesAreOnSameDay = datesAreOnSameDay;
// Gets start and end time of event and returns duration in minutes
var getEventDuration = function (start, end) {
    var startDate = new Date(start);
    var endDate = new Date(end);
    var diff = Math.abs(startDate.valueOf() - endDate.valueOf());
    var minutes = Math.floor((diff / 1000) / 60);
    return minutes;
};
exports.getEventDuration = getEventDuration;
// console.log(getEventDuration("2021-08-19T05:30:00.000Z { tz: 'Etc/UTC' }", "2021-08-19T06:00:00.000Z { tz: 'Etc/UTC' }"));
