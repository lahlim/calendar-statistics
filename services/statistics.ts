import { Calendar, CalendarEventSummary } from "../types/calendar";
import { datesAreOnSameDay, time_convert } from "../utils/time";

export const initialStats = (data: Calendar[]) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const todayStats = getDayStatistics(getEventsByDate(today, data));
    const yesterdayStats = getDayStatistics(getEventsByDate(yesterday, data));
    return [todayStats, yesterdayStats];
};


const getEventsByDate = (date: Date, data: Calendar[]) => {
    const daysEvents: Calendar[] = [];
    data.forEach(event => {
        if (datesAreOnSameDay(date, event.start)) daysEvents.push(event);
    });
    return daysEvents;
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

