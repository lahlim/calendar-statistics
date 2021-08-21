import { Calendar, CalendarEventSummary } from "../types/calendar";

export const initialStats = (data: Calendar[]) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const todaysEvents: Calendar[] = [];
    const yesterdaysEvents: Calendar[] = [];
    data.forEach(event => {
        if (datesAreOnSameDay(today, event.start)) yesterdaysEvents.push(event);
        if (datesAreOnSameDay(yesterday, event.start)) yesterdaysEvents.push(event);
    });
    const todayStats = getDayStatistics(todaysEvents);
    const yesterdayStats = getDayStatistics(yesterdaysEvents);
    return [todayStats, yesterdayStats];
};

const getDayStatistics = (events: Calendar[]) => {
    const resp = {};
    let total = 0;
    const eventList: CalendarEventSummary[] = [];
    events.forEach((event) => {
        total = event.duration + total;
        eventList.push({
            duration: time_convert(event.duration),
            summary: event.summary
        });
    });
    return { total: time_convert(total), eventCount: events.length, eventList };
};

const time_convert = (min: number) => {
    var hours = Math.floor(min / 60);
    var minutes = min % 60;
    return { hours, minutes };
};

const datesAreOnSameDay = (first: Date, second: Date) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();
