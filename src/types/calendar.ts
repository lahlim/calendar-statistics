export interface Calendar {
    kind: string,
    etag: string,
    id: string,
    status: string,
    htmlLink: string,
    created: Date,
    updated: Date,
    summary: string,
    creator: { email: string; },
    organizer: {
        email: string,
        displayName: string,
        self: boolean;
    },
    start: { dateTime: Date; },
    end: { dateTime: Date; },
    iCalUID: string,
    sequence: number,
    reminders: { useDefault: boolean; },
    eventType: string;
}


type time = {
    hours: number;
    minutes: number;
};


