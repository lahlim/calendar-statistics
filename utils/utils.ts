import { initialCalendar } from "../types/calendar";

const formatData = (data: any) => {
    data = dataToArray(data);
    data = addEventDuration(data);
    return data;
};
const addEventDuration = (data: initialCalendar[]) => {
    return data.map(((event: any) => {
        event.duration = getEventDuration(event.start, event.end);
        return event;
    }));
};
const dataToArray = (data: any) => {
    return Object.entries(data).map(e => e[1]);
};

// Gets start and end time of event and returns duration in minutes
const getEventDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = Math.abs(startDate.valueOf() - endDate.valueOf());
    const minutes = Math.floor((diff / 1000) / 60);
    return minutes;
};
// console.log(getEventDuration("2021-08-19T05:30:00.000Z { tz: 'Etc/UTC' }", "2021-08-19T06:00:00.000Z { tz: 'Etc/UTC' }"));


const addDuration = () => '';

export { getEventDuration, addDuration, formatData };
