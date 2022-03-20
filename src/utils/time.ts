export const timeConvert = (min: number) => {
    var hours = Math.floor(min / 60);
    var minutes = min % 60;
    return { hours, minutes };
};

export const fromatDateInput = (date: string) => {
    if (date) {
        const dateParts: any[] = date.split(".");
        return new Date(dateParts[2], dateParts[1] - 1, +dateParts[0]);
    }
    return undefined;
};

export const datesAreOnSameDay = (first: Date, second: Date) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

// Gets start and end time of event and returns duration in minutes
export const getEventDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = Math.abs(startDate.valueOf() - endDate.valueOf());
    const minutes = Math.floor((diff / 1000) / 60);
    return minutes;
};
    // console.log(getEventDuration("2021-08-19T05:30:00.000Z { tz: 'Etc/UTC' }", "2021-08-19T06:00:00.000Z { tz: 'Etc/UTC' }"));
