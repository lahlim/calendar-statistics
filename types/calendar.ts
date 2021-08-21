export interface initialCalendar {
    type: string,
    params: [],
    start: Date,
    datetype: string,
    end: Date,
    dtstamp: Date,
    uid: string,
    created: Date,
    description: string,
    lastmodified: Date,
    location: string,
    sequence: string,
    status: string,
    summary: string,
    transparency: string,
}

export interface Calendar {
    type: string,
    params: [],
    start: Date,
    datetype: string,
    end: Date,
    dtstamp: Date,
    uid: string,
    created: Date,
    description: string,
    lastmodified: Date,
    location: string,
    sequence: string,
    status: string,
    summary: string,
    transparency: string,
    duration: number;
}

type time = {
    hours: number;
    minutes: number;
};

export type CalendarEventSummary = {
    duration: time;
    summary: string;
};

interface Day {
    date: Date;
    total?: number;
    events?: number;
};

export interface InitialData {
    days: Day[];
}
