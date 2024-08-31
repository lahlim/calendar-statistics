import {type TotalTime} from '../types/calendar';

export const timeConvert = (min: number): TotalTime => {
	const hours = Math.floor(min / 60);
	const minutes = min % 60;
	return {hours, minutes};
};

export const formatDateInput = (date: string) => {
	if (!date) {
		return undefined;
	}

	const dateParts: string[] = date.split('.');
	return new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
};

export const datesAreOnSameDay = (first: Date, second: Date) =>
	first.getFullYear() === second.getFullYear()
    && first.getMonth() === second.getMonth()
    && first.getDate() === second.getDate();

// Gets start and end time of event and returns duration in minutes
export const getEventDuration = (start: string, end: string) => {
	const startDate = new Date(start);
	const endDate = new Date(end);
	const diff = Math.abs(startDate.valueOf() - endDate.valueOf());
	const minutes = Math.floor((diff / 1000) / 60);
	return minutes;
};
// Console.log(getEventDuration("2021-08-19T05:30:00.000Z { tz: 'Etc/UTC' }", "2021-08-19T06:00:00.000Z { tz: 'Etc/UTC' }"));
