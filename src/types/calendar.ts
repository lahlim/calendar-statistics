import {type DateTime} from 'luxon';

export type CalendarEvent = {
	kind: string;
	etag: string;
	id: string;
	status: string;
	htmlLink: string;
	created: Date;
	updated: Date;
	summary: string;
	creator: {email: string};
	organizer: {
		email: string;
		displayName: string;
		self: boolean;
	};
	start: {dateTime: Date};
	end: {dateTime: Date};
	iCalUID: string;
	sequence: number;
	reminders: {useDefault: boolean};
	eventType: string;
};

export type FormattedEvent = {
	timestamp: string;
	workItem: string;
	date: string;
	summary: string;
	duration: {hours: number; minutes: number};
	comment: string;
	start: string;
	end: string;
	person: string;
};

export type Range = {
	start: DateTime;
	end: DateTime;
};

export type TotalTime = {
	hours: number; minutes: number;
};

export type SearResultResponse = {
	eventArray: FormattedEvent[];
	total: TotalTime;
	range: Range;
};

